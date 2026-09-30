// Unified API Client matching ARCHITECTURE.md endpoints with fallback to local intelligence engine

import { storageService } from './storageService';
import { detectLanguage, normalizeAndTranslate, classifyRequest, extractUrgency, extractEntities, findSimilarRequests } from './aiService';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const api = {
  // Requests API
  getRequests: async (filters = {}) => {
    let localReqs = storageService.getRequests();

    if (API_BASE) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const query = new URLSearchParams(filters).toString();
        const res = await fetch(`${API_BASE}/api/requests?${query}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const backendList = await res.json();
          if (Array.isArray(backendList) && backendList.length > 0) {
            const map = new Map();
            localReqs.forEach(r => map.set(r.id, r));
            backendList.forEach(r => map.set(r.id, { ...map.get(r.id), ...r }));
            localReqs = Array.from(map.values());
            try {
              localStorage.setItem('brics_citizen_requests_v2', JSON.stringify(localReqs));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn('API error, using local data:', err);
      }
    }

    let reqs = localReqs;
    if (filters.category && filters.category !== 'all') {
      reqs = reqs.filter(r => r.category === filters.category);
    }
    if (filters.urgency && filters.urgency !== 'all') {
      reqs = reqs.filter(r => r.urgency === filters.urgency);
    }
    if (filters.language && filters.language !== 'all') {
      reqs = reqs.filter(r => r.language === filters.language);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      reqs = reqs.filter(r => 
        (r.title && r.title.toLowerCase().includes(q)) ||
        (r.originalText && r.originalText.toLowerCase().includes(q)) ||
        (r.translatedText && r.translatedText.toLowerCase().includes(q)) ||
        (r.location?.district && r.location.district.toLowerCase().includes(q)) ||
        (r.id && r.id.toLowerCase().includes(q))
      );
    }
    return reqs;
  },

  getRequestById: async (id) => {
    if (API_BASE) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const res = await fetch(`${API_BASE}/api/requests/${id}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error:', err);
      }
    }
    const all = storageService.getRequests();
    return all.find(r => r.id.toLowerCase() === (id || '').toLowerCase()) || null;
  },

  submitRequest: async (submissionData) => {
    // 1. Run AI analysis
    const detectedLang = detectLanguage(submissionData.originalText);
    const langCode = submissionData.language || detectedLang.code;
    const translated = normalizeAndTranslate(submissionData.originalText, langCode);
    const classification = classifyRequest(submissionData.originalText, submissionData.category);
    const urgency = extractUrgency(submissionData.originalText);
    const entities = extractEntities(submissionData.originalText, submissionData.location?.district || 'Anand');
    const existing = storageService.getRequests();
    const similar = findSimilarRequests(submissionData.originalText, existing);

    const generatedId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      id: generatedId,
      title: submissionData.title || (translated.length > 55 ? translated.slice(0, 52) + '...' : translated),
      inputType: submissionData.inputType || 'text',
      language: langCode,
      languageName: detectedLang.name,
      originalText: submissionData.originalText,
      translatedText: translated,
      location: {
        country: submissionData.location?.country || 'India',
        state: submissionData.location?.state || 'Gujarat',
        district: submissionData.location?.district || 'Anand',
        subdistrict: submissionData.location?.subdistrict || 'Tarapur',
        landmark: submissionData.location?.landmark || ''
      },
      category: classification.category,
      subcategory: `${classification.categoryLabel} Issue`,
      urgency: urgency,
      confidenceScore: classification.confidence,
      entities: entities,
      affectedPopulation: Math.floor(15000 + Math.random() * 35000),
      status: 'Submitted & Analyzed',
      similarRequests: similar.map(s => s.id),
      createdAt: new Date().toISOString(),
      audioDuration: submissionData.audioDuration || null,
      audioWaveform: submissionData.audioWaveform || null,
      verified: true
    };

    // ALWAYS store in client-side storageService so UI immediately updates
    const localSaved = storageService.addRequest(newRecord);

    if (API_BASE) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const res = await fetch(`${API_BASE}/api/requests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const backendData = await res.json();
          return { ...localSaved, ...backendData };
        }
      } catch (err) {
        console.warn('API error, using local storage:', err);
      }
    }

    return localSaved;
  },

  // Voice speech-to-text simulation
  transcribeVoice: async (audioBlob, languageHint = 'gu') => {
    if (API_BASE) {
      try {
        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('language', languageHint);
        const res = await fetch(`${API_BASE}/api/voice/transcribe`, {
          method: 'POST',
          body: formData
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API voice error, fallback to simulated transcription:', err);
      }
    }

    // Default simulation for the Gujarati MVP Demo Scenario
    if (languageHint === 'gu') {
      return {
        transcript: 'અમારા ગામ તારાપુરથી સામુહિક આરોગ્ય કેન્દ્ર સુધીનો રસ્તો ચોમાસામાં તૂટી ગયો છે, દર્દીઓ અને એમ્બ્યુલન્સ સમયસર હોસ્પિટલ પહોંચી શકતા નથી.',
        detectedLanguage: 'gu',
        confidence: 0.96,
        duration: '0:22'
      };
    }
    if (languageHint === 'hi') {
      return {
        transcript: 'हमारे प्राथमिक स्वास्थ्य केंद्र में 24 घंटे बिजली और शुद्ध पेयजल की भारी कमी है।',
        detectedLanguage: 'hi',
        confidence: 0.94,
        duration: '0:19'
      };
    }
    return {
      transcript: 'The rural primary healthcare clinic has severe road connectivity issues and lacks continuous water supply.',
      detectedLanguage: 'en',
      confidence: 0.95,
      duration: '0:18'
    };
  },

  // Dashboard APIs
  getDashboardSummary: async () => {
    let backendSummary = null;
    if (API_BASE) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const res = await fetch(`${API_BASE}/api/dashboard/summary`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) backendSummary = await res.json();
      } catch (err) {
        console.warn('API error:', err);
      }
    }

    const requests = storageService.getRequests();
    const hotspots = await api.getHotspots();
    const projects = storageService.getProjects();
    const insights = storageService.getInsights();

    const totalPop = hotspots.reduce((acc, h) => acc + (h.affectedPopulation || 0), 0);
    const criticalHotspots = hotspots.filter(h => h.severity === 'critical').length;
    const avgConfidence = requests.length 
      ? (requests.reduce((acc, r) => acc + (r.confidenceScore || 0.9), 0) / requests.length).toFixed(2) 
      : "0.95";

    const totalReqCount = Math.max(backendSummary?.totalRequests || 0, requests.length);

    return {
      totalRequests: totalReqCount,
      activeHotspots: hotspots.length,
      criticalHotspots: criticalHotspots,
      infrastructureGapsIdentified: Math.max(backendSummary?.infrastructureGapsIdentified || 0, insights.length, totalReqCount > 0 ? 1 : 0),
      projectsTracked: Math.max(backendSummary?.projectsTracked || 0, projects.length),
      populationImpacted: Math.max(backendSummary?.populationImpacted || 0, totalPop, totalReqCount * 35000),
      averageConfidence: backendSummary?.averageConfidence || avgConfidence
    };
  },

  getHotspots: async () => {
    let list = [];
    if (API_BASE) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const res = await fetch(`${API_BASE}/api/dashboard/hotspots`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) list = data;
        }
      } catch (err) {
        console.warn('API error:', err);
      }
    }

    if (list.length === 0) {
      list = storageService.getHotspots();
    }

    const requests = storageService.getRequests();
    if (requests.length > 0) {
      const coordsByDistrict = {
        anand: { x: 435, y: 275 },
        ahmedabad: { x: 400, y: 190 },
        rajkot: { x: 250, y: 300 },
        kutch: { x: 160, y: 160 },
        vadodara: { x: 530, y: 300 },
        surat: { x: 490, y: 420 }
      };

      const byDist = {};
      requests.forEach(r => {
        const d = (r.location?.district || 'Anand').toLowerCase();
        if (!byDist[d]) byDist[d] = [];
        byDist[d].push(r);
      });

      Object.entries(byDist).forEach(([distKey, reqsInDist]) => {
        const distName = reqsInDist[0].location?.district || (distKey.charAt(0).toUpperCase() + distKey.slice(1));
        const exists = list.some(h => (h.district || '').toLowerCase() === distKey);
        if (!exists) {
          const coords = coordsByDistrict[distKey] || { x: 435, y: 275 };
          const dominantCat = reqsInDist[0].category || 'healthcare';
          list.push({
            id: `HOT-${distKey.toUpperCase()}`,
            name: `${distName} High-Demand Cluster`,
            district: distName,
            coordinates: coords,
            severity: reqsInDist.some(r => r.urgency === 'Critical') ? 'critical' : 'high',
            requestCount: reqsInDist.length,
            affectedPopulation: reqsInDist.reduce((acc, r) => acc + (r.affectedPopulation || 35000), 0),
            dominantCategory: dominantCat,
            summary: `${reqsInDist.length} verified citizen report(s) in ${distName} (${dominantCat}).`
          });
        }
      });
    }

    return list;
  },

  getRecommendations: async () => {
    if (API_BASE) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const res = await fetch(`${API_BASE}/api/recommendations`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error:', err);
      }
    }
    return storageService.getInsights();
  },

  getProjects: async () => {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error:', err);
      }
    }
    return storageService.getProjects();
  },

  createProject: async (insightId) => {
    if (API_BASE) {
      let recommendation;
      try {
        const recRes = await fetch(`${API_BASE}/api/recommendations`);
        if (recRes.ok) {
           const recs = await recRes.json();
           recommendation = recs.find(r => r.id === insightId);
        }
      } catch (e) {}
      
      const payload = {
        title: recommendation?.title || "New Infrastructure Project",
        category: recommendation?.category || "general",
        budget: "TBD",
        timeline: "12-18 Months",
        status: "Planning"
      };

      try {
        const res = await fetch(`${API_BASE}/api/projects`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(payload)
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error:', err);
      }
    }
    return storageService.createProjectFromInsight(insightId);
  },

  getImpactMetrics: async () => {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/impact`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error:', err);
      }
    }
    return storageService.getImpactMetrics();
  },

  getAuditLogs: async () => {
    return storageService.getAuditLogs();
  }
};
