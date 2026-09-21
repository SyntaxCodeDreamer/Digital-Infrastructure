// AI Processing and Decision-Support Service

import { CATEGORIES } from './mockData';

// Keyword dictionaries for multilingual classification & language detection
const LANGUAGE_PATTERNS = [
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', regex: /[\u0A80-\u0AFF]/ },
  { code: 'hi', name: 'हिन्दी (Hindi)', regex: /[\u0900-\u097F]/ },
  { code: 'zh', name: '中文 (Chinese)', regex: /[\u4E00-\u9FFF]/ },
  { code: 'ru', name: 'Русский (Russian)', regex: /[\u0400-\u04FF]/ },
  { code: 'pt', name: 'Português (Portuguese)', regex: /\b(posto|saúde|água|rua|escola|falta|enchente|estrada|ponte)\b/i },
];

const CATEGORY_KEYWORDS = {
  roads: ['road', 'highway', 'culvert', 'pothole', 'bridge', 'transit', 'tarapur', 'asphalt', 'રસ્તો', 'નાળું', 'ડામર', 'सड़क', 'पुल', 'дорога', 'асфальт', 'rua', 'estrada', 'ponte', '公路', '桥梁'],
  water: ['water', 'drinking', 'tap', 'canal', 'drainage', 'sanitation', 'sewage', 'flood', 'salinity', 'પાણી', 'ગટર', 'પાણીનો નિકાલ', 'पानी', 'नल', 'जल', 'вода', 'канализация', 'água', 'saneamento', '自来水', '供水', '排水'],
  healthcare: ['hospital', 'clinic', 'health', 'chc', 'phc', 'doctor', 'ambulance', 'patient', 'medicine', 'આરોગ્ય', 'હોસ્પિટલ', 'એમ્બ્યુલન્સ', 'દર્દીઓ', 'अस्पताल', 'स्वास्थ्य', 'एम्बुलेंस', 'больница', 'скорая помощь', 'saúde', 'posto de saúde', '医院', '诊所'],
  education: ['school', 'college', 'classroom', 'student', 'teacher', 'desk', 'education', 'શાળા', 'શિક્ષણ', 'વિદ્યાર્થી', 'स्कूल', 'शिक्षा', 'छात्र', 'школа', 'учитель', 'escola', 'professora', '学校', '学生'],
  electricity: ['electricity', 'power', 'grid', 'transformer', 'blackout', 'surge', 'voltage', 'feeder', 'વીજળી', 'પાવર', 'લાઈટ', 'बिजली', 'पावर', 'электричество', 'свет', 'energia', 'luz', '电力', '电网'],
  digital: ['internet', 'broadband', 'wifi', 'telecom', 'signal', 'fiber', 'optical', 'નેટવર્ક', 'ઈન્ટરનેટ', 'इंटरनेट', 'वाईफाई', 'интернет', 'связь', 'fibra ótica', '宽带', '光纤', '信号'],
  housing: ['housing', 'slum', 'roof', 'shelter', 'rehousing', 'મકાન', 'આવાસ', 'आवास', 'मकान', 'жилье', 'moradia', '住房'],
  safety: ['safety', 'police', 'lighting', 'street light', 'crime', 'danger', 'સલામતી', 'લાઈટ', 'सुरक्षा', 'безопасность', 'segurança', '安全'],
  environment: ['waste', 'garbage', 'pollution', 'smoke', 'trash', 'recyle', 'કચરો', 'પ્રદૂષણ', 'कचरा', 'प्रदूषण', 'мусор', 'lixo', 'poluição', '垃圾', '环境']
};

export const detectLanguage = (text) => {
  if (!text) return { code: 'en', name: 'English' };
  for (const lang of LANGUAGE_PATTERNS) {
    if (lang.regex.test(text)) {
      return { code: lang.code, name: lang.name };
    }
  }
  return { code: 'en', name: 'English' };
};

export const normalizeAndTranslate = (text, detectedLangCode) => {
  // If already English
  if (detectedLangCode === 'en') return text;

  // Domain-specific smart normalization for demo requests
  if (detectedLangCode === 'gu') {
    if (text.includes('તારાપુર') || text.includes('આરોગ્ય') || text.includes('હોસ્પિટલ')) {
      return 'The road from our Tarapur village to the Community Health Centre is broken since the monsoon, patients and ambulances cannot reach the hospital in time.';
    }
    if (text.includes('નાળું') || text.includes('સંપર્ક')) {
      return 'A major culvert collapsed near Tarapur, cutting off connectivity for surrounding villages.';
    }
    return `[Translated from Gujarati]: ${text}`;
  }

  if (detectedLangCode === 'hi') {
    if (text.includes('अस्पताल') || text.includes('स्वास्थ्य') || text.includes('पानी')) {
      return 'Tap water has been shut off for two weeks at our Community Health Centre; patients must carry water from outside.';
    }
    return `[Translated from Hindi]: ${text}`;
  }

  if (detectedLangCode === 'pt') {
    if (text.includes('saúde') || text.includes('água')) {
      return 'The community health post has had no running tap water for 3 weeks; mothers and the elderly suffer in line.';
    }
    return `[Translated from Portuguese]: ${text}`;
  }

  if (detectedLangCode === 'ru') {
    return 'The unpaved gravel road is washed out by rains; ambulances cannot reach remote villages.';
  }

  if (detectedLangCode === 'zh') {
    return 'The mountainous primary school has no optical fiber connection and only intermittent 2G signal; students cannot access remote classes.';
  }

  return text;
};

export const classifyRequest = (text, preferredCategory = null) => {
  if (preferredCategory && preferredCategory !== 'auto') {
    const cat = CATEGORIES.find(c => c.id === preferredCategory);
    return {
      category: preferredCategory,
      categoryLabel: cat ? cat.label : preferredCategory,
      confidence: 0.94
    };
  }

  const lower = (text || '').toLowerCase();
  let bestCat = 'other';
  let maxMatches = 0;

  for (const [catKey, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let matches = 0;
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) {
        matches++;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCat = catKey;
    }
  }

  const confidence = maxMatches > 0 ? Math.min(0.98, 0.85 + maxMatches * 0.04) : 0.72;
  const catObj = CATEGORIES.find(c => c.id === bestCat) || CATEGORIES[CATEGORIES.length - 1];

  return {
    category: bestCat,
    categoryLabel: catObj.label,
    confidence: Number(confidence.toFixed(2))
  };
};

export const extractUrgency = (text) => {
  const lower = (text || '').toLowerCase();
  const criticalKeywords = ['ambulance', 'emergency', 'collapsed', 'danger', 'death', 'patients', 'hospital', 'burst', 'એમ્બ્યુલન્સ', 'હોસ્પિટલ', 'તૂટી', 'તત્કાલ', 'জরুরি', 'अस्पताल', 'गंभीर', 'urgente', 'perigo'];
  const highKeywords = ['cutoff', 'severe', 'shortage', 'flooding', 'damage', 'weeks', 'खराब', 'समस्या', 'choked', 'fluctuation'];

  for (const kw of criticalKeywords) {
    if (lower.includes(kw)) return 'Critical';
  }
  for (const kw of highKeywords) {
    if (lower.includes(kw)) return 'High';
  }
  return 'Medium';
};

export const extractEntities = (text, districtName = 'Anand') => {
  const entities = [];
  const lower = (text || '').toLowerCase();

  if (lower.includes('hospital') || lower.includes('chc') || lower.includes('phc') || lower.includes('આરોગ્ય')) {
    entities.push('Community Health Centre');
  }
  if (lower.includes('ambulance') || lower.includes('૧૦૮') || lower.includes('108')) {
    entities.push('Emergency Ambulance Route');
  }
  if (lower.includes('road') || lower.includes('highway') || lower.includes('રસ્તો') || lower.includes('pothole')) {
    entities.push('Paved Transport Corridor');
  }
  if (lower.includes('water') || lower.includes('tap') || lower.includes('પાણી')) {
    entities.push('Potable Water Grid');
  }
  if (lower.includes('school') || lower.includes('શાળા') || lower.includes('broadband')) {
    entities.push('Rural Education Facility');
  }

  entities.push(`${districtName} Administrative Zone`);
  return Array.from(new Set(entities));
};

export const findSimilarRequests = (currentText, existingRequests) => {
  const words = (currentText || '').toLowerCase().split(/\s+/).filter(w => w.length > 3);
  if (words.length === 0) return [];

  const matched = [];
  for (const req of existingRequests) {
    const targetText = `${req.originalText} ${req.translatedText}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (targetText.includes(w)) score++;
    }
    if (score >= 2) {
      matched.push({ id: req.id, title: req.title, similarity: Math.min(0.95, 0.6 + score * 0.08) });
    }
  }

  return matched.slice(0, 3);
};

// Calculate Decision-Support Priority Score based on weights formula
export const calculatePriorityScore = (metrics, weights) => {
  // Normalize each component out of 100
  // Demand (up to 2000 requests = 100)
  const demandScore = Math.min(100, (metrics.citizenRequests / 2000) * 100);
  
  // Urgency
  const urgencyScore = metrics.urgency === 'Critical' ? 100 : metrics.urgency === 'High' ? 75 : 45;
  
  // Population (up to 100,000 = 100)
  const popScore = Math.min(100, (metrics.affectedPopulation / 100000) * 100);
  
  // Infrastructure gap % (direct 0-100)
  const gapScore = metrics.infrastructureGapPct || 70;
  
  // Lack of investment (Low = 95, Medium = 60, High = 25)
  const investScore = metrics.existingInvestment === 'Low' ? 95 : metrics.existingInvestment === 'Medium' ? 60 : 25;

  const totalWeight = (weights.demandVolume + weights.urgencySeverity + weights.populationAffected + weights.infrastructureGap + weights.lackOfInvestment) || 100;

  const weightedSum = 
    (demandScore * weights.demandVolume) +
    (urgencyScore * weights.urgencySeverity) +
    (popScore * weights.populationAffected) +
    (gapScore * weights.infrastructureGap) +
    (investScore * weights.lackOfInvestment);

  return Math.round(weightedSum / totalWeight);
};
