// Unified API Client matching ARCHITECTURE.md endpoints with fallback to local intelligence engine

import { storageService } from './storageService';
import { detectLanguage, normalizeAndTranslate, classifyRequest, extractUrgency, extractEntities, findSimilarRequests } from './aiService';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const api = {
  // Requests API
  getRequests: async (filters = {}) => {
    if (API_BASE) {
      try {
        const query = new URLSearchParams(filters).toString();
        const res = await fetch(`${API_BASE}/api/requests?${query}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, using local data:', err);
      }
    }
    let reqs = storageService.getRequests();
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
        const res = await fetch(`${API_BASE}/api/requests/${id}`);
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

    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/requests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord)
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error, storing locally:', err);
      }
    }

    return storageService.addRequest(newRecord);
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
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/dashboard/summary`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error:', err);
      }
    }
    const requests = storageService.getRequests();
    const hotspots = storageService.getHotspots();
    const projects = storageService.getProjects();
    const insights = storageService.getInsights();

    const totalPop = hotspots.reduce((acc, h) => acc + (h.affectedPopulation || 0), 0);
    const criticalHotspots = hotspots.filter(h => h.severity === 'critical').length;
    const avgConfidence = (requests.reduce((acc, r) => acc + (r.confidenceScore || 0.9), 0) / (requests.length || 1)).toFixed(2);

    return {
      totalRequests: requests.length,
      activeHotspots: hotspots.length,
      criticalHotspots: criticalHotspots,
      infrastructureGapsIdentified: insights.length * 3 + 2,
      projectsTracked: projects.length,
      populationImpacted: totalPop,
      averageConfidence: avgConfidence
    };
  },

  getHotspots: async () => {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/dashboard/hotspots`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('API error:', err);
      }
    }
    return storageService.getHotspots();
  },

  getRecommendations: async () => {
    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/recommendations`);
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
