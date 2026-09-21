// Storage and State Management Service with Reactive Event Bus

import {
  INITIAL_CITIZEN_REQUESTS,
  DEMAND_HOTSPOTS,
  PRIORITY_INSIGHTS,
  TRACKED_PROJECTS,
  IMPACT_METRICS,
  AUDIT_LOGS,
  DEFAULT_PRIORITY_WEIGHTS,
  DISTRICTS_DATA
} from './mockData';
import { calculatePriorityScore } from './aiService';

const STORAGE_KEYS = {
  REQUESTS: 'brics_citizen_requests_v1',
  HOTSPOTS: 'brics_demand_hotspots_v1',
  INSIGHTS: 'brics_priority_insights_v1',
  PROJECTS: 'brics_tracked_projects_v1',
  IMPACT: 'brics_impact_metrics_v1',
  WEIGHTS: 'brics_priority_weights_v1',
  AUDIT: 'brics_audit_logs_v1',
  DISTRICTS: 'brics_districts_data_v1',
};

const listeners = new Set();

const notifyListeners = (eventType, payload) => {
  listeners.forEach(fn => fn(eventType, payload));
};

export const storageService = {
  subscribe: (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  initStorage: () => {
    if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_CITIZEN_REQUESTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.HOTSPOTS)) {
      localStorage.setItem(STORAGE_KEYS.HOTSPOTS, JSON.stringify(DEMAND_HOTSPOTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INSIGHTS)) {
      localStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(PRIORITY_INSIGHTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(TRACKED_PROJECTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.IMPACT)) {
      localStorage.setItem(STORAGE_KEYS.IMPACT, JSON.stringify(IMPACT_METRICS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.WEIGHTS)) {
      localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(DEFAULT_PRIORITY_WEIGHTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT)) {
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(AUDIT_LOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DISTRICTS)) {
      localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(DISTRICTS_DATA));
    }
  },

  getRequests: () => {
    storageService.initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS)) || [];
    } catch {
      return INITIAL_CITIZEN_REQUESTS;
    }
  },

  addRequest: (newReq) => {
    const requests = storageService.getRequests();
    const updated = [newReq, ...requests];
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));

    // Also record audit log
    storageService.addAuditLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor: 'AI Ingestion Pipeline',
      action: `Processed citizen request ${newReq.id} (${newReq.inputType.toUpperCase()}, Lang: ${newReq.language}, Category: ${newReq.category})`
    });

    // Automatically update district activeRequests count and hotspot demand
    storageService.incrementDistrictDemand(newReq.location?.district, newReq.category);

    notifyListeners('REQUEST_ADDED', newReq);
    return newReq;
  },

  getHotspots: () => {
    storageService.initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.HOTSPOTS)) || [];
    } catch {
      return DEMAND_HOTSPOTS;
    }
  },

  getDistricts: () => {
    storageService.initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DISTRICTS)) || [];
    } catch {
      return DISTRICTS_DATA;
    }
  },

  incrementDistrictDemand: (districtName = 'Anand', category = 'healthcare') => {
    const districts = storageService.getDistricts();
    const dIdx = districts.findIndex(d => d.name.toLowerCase() === (districtName || '').toLowerCase());
    if (dIdx !== -1) {
      districts[dIdx].activeRequests = (districts[dIdx].activeRequests || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(districts));
    }

    const hotspots = storageService.getHotspots();
    const hIdx = hotspots.findIndex(h => h.district.toLowerCase() === (districtName || '').toLowerCase());
    if (hIdx !== -1) {
      hotspots[hIdx].requestCount += 1;
      if (hotspots[hIdx].categoryBreakdown[category]) {
        hotspots[hIdx].categoryBreakdown[category] += 1;
      }
      localStorage.setItem(STORAGE_KEYS.HOTSPOTS, JSON.stringify(hotspots));
    }
  },

  getInsights: () => {
    storageService.initStorage();
    try {
      const insights = JSON.parse(localStorage.getItem(STORAGE_KEYS.INSIGHTS)) || [];
      const weights = storageService.getWeights();
      // Recalculate dynamic scores based on active weights
      return insights.map(ins => {
        const score = calculatePriorityScore({
          citizenRequests: ins.metrics.citizenRequests,
          urgency: ins.decisionScore > 85 ? 'Critical' : 'High',
          affectedPopulation: ins.metrics.affectedPopulation,
          infrastructureGapPct: ins.metrics.infrastructureGapPct,
          existingInvestment: ins.metrics.existingInvestment
        }, weights);
        return { ...ins, decisionScore: score };
      });
    } catch {
      return PRIORITY_INSIGHTS;
    }
  },

  getProjects: () => {
    storageService.initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || [];
    } catch {
      return TRACKED_PROJECTS;
    }
  },

  createProjectFromInsight: (insightId) => {
    const insights = storageService.getInsights();
    const targetInsight = insights.find(i => i.id === insightId);
    if (!targetInsight) return null;

    const newProject = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      title: targetInsight.title,
      district: targetInsight.district,
      state: targetInsight.state,
      status: 'Approved',
      budget: targetInsight.proposedBudget || '$1,500,000',
      spent: '$0',
      progressPct: 0,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: '2027-03-31',
      linkedInsight: targetInsight.id,
      linkedRequestsCount: targetInsight.metrics.citizenRequests,
      contractor: 'Government Infrastructure Tender Board',
      impactTarget: targetInsight.expectedImpact
    };

    const projects = storageService.getProjects();
    const updated = [newProject, ...projects];
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    storageService.addAuditLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor: 'Policy Analyst (Dashboard)',
      action: `Approved AI Insight ${targetInsight.id} and created Project ${newProject.id}`
    });

    notifyListeners('PROJECT_CREATED', newProject);
    return newProject;
  },

  updateProjectStatus: (projectId, newStatus) => {
    const projects = storageService.getProjects();
    const idx = projects.findIndex(p => p.id === projectId);
    if (idx !== -1) {
      projects[idx].status = newStatus;
      if (newStatus === 'Completed') {
        projects[idx].progressPct = 100;
      }
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      notifyListeners('PROJECT_UPDATED', projects[idx]);
    }
  },

  getImpactMetrics: () => {
    storageService.initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.IMPACT)) || [];
    } catch {
      return IMPACT_METRICS;
    }
  },

  getWeights: () => {
    storageService.initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.WEIGHTS)) || DEFAULT_PRIORITY_WEIGHTS;
    } catch {
      return DEFAULT_PRIORITY_WEIGHTS;
    }
  },

  setWeights: (newWeights) => {
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(newWeights));
    storageService.addAuditLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor: 'Administrator',
      action: `Recalibrated decision weights: Demand(${newWeights.demandVolume}%), Urgency(${newWeights.urgencySeverity}%), Pop(${newWeights.populationAffected}%), Gap(${newWeights.infrastructureGap}%), Investment(${newWeights.lackOfInvestment}%)`
    });
    notifyListeners('WEIGHTS_UPDATED', newWeights);
  },

  getAuditLogs: () => {
    storageService.initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT)) || [];
    } catch {
      return AUDIT_LOGS;
    }
  },

  addAuditLog: (entry) => {
    const logs = storageService.getAuditLogs();
    const updated = [entry, ...logs].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(updated));
    notifyListeners('AUDIT_LOG_ADDED', entry);
  },

  resetToDefaults: () => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_CITIZEN_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.HOTSPOTS, JSON.stringify(DEMAND_HOTSPOTS));
    localStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(PRIORITY_INSIGHTS));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(TRACKED_PROJECTS));
    localStorage.setItem(STORAGE_KEYS.IMPACT, JSON.stringify(IMPACT_METRICS));
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(DEFAULT_PRIORITY_WEIGHTS));
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(AUDIT_LOGS));
    localStorage.setItem(STORAGE_KEYS.DISTRICTS, JSON.stringify(DISTRICTS_DATA));
    notifyListeners('STORAGE_RESET', null);
  }
};
