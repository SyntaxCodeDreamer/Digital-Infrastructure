// Mock Data & Seed Datasets for BRICS Citizen Infrastructure Intelligence Platform

export const CATEGORIES = [
  { id: 'roads', label: 'Roads & Transport', icon: 'Car', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
  { id: 'water', label: 'Water & Sanitation', icon: 'Droplets', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)' },
  { id: 'healthcare', label: 'Healthcare & Clinics', icon: 'HeartPulse', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
  { id: 'education', label: 'Education & Schools', icon: 'GraduationCap', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
  { id: 'electricity', label: 'Electricity & Energy', icon: 'Zap', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  { id: 'digital', label: 'Digital & Telecom', icon: 'Wifi', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  { id: 'housing', label: 'Housing & Shelter', icon: 'Home', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
  { id: 'safety', label: 'Public Safety', icon: 'Shield', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' },
  { id: 'environment', label: 'Environment & Waste', icon: 'Leaf', color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.15)' },
  { id: 'other', label: 'Other Civic Infrastructure', icon: 'Layers', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)' },
];

export const BRICS_LANGUAGES = [
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'en', name: 'English (BRICS Common)', flag: '🌐' },
  { code: 'pt', name: 'Português (Brazil)', flag: '🇧🇷' },
  { code: 'ru', name: 'Русский (Russia)', flag: '🇷🇺' },
  { code: 'zh', name: '中文 (China)', flag: '🇨🇳' },
  { code: 'zu', name: 'isiZulu / EN (South Africa)', flag: '🇿🇦' },
];

export const DISTRICTS_DATA = [
  {
    id: 'anand',
    name: 'Anand',
    state: 'Gujarat',
    country: 'India',
    population: 2090000,
    ruralPopPct: 71,
    povertyRate: 18.4,
    roadCoveragePct: 62,
    hospitalBedsPer10k: 7.2,
    waterAccessPct: 68,
    broadbandPct: 41,
    activeRequests: 184,
    coordinates: { lat: 22.5645, lng: 72.9289, mapX: 430, mapY: 270 },
    dominantGap: 'Healthcare & Rural Road Access',
    severity: 'critical'
  },
  {
    id: 'vadodara',
    name: 'Vadodara',
    state: 'Gujarat',
    country: 'India',
    population: 4165000,
    ruralPopPct: 49,
    povertyRate: 14.1,
    roadCoveragePct: 78,
    hospitalBedsPer10k: 14.5,
    waterAccessPct: 74,
    broadbandPct: 65,
    activeRequests: 142,
    coordinates: { lat: 22.3072, lng: 73.1812, mapX: 520, mapY: 310 },
    dominantGap: 'Industrial Periphery Sanitation & Water',
    severity: 'high'
  },
  {
    id: 'surat',
    name: 'Surat',
    state: 'Gujarat',
    country: 'India',
    population: 6081000,
    ruralPopPct: 20,
    povertyRate: 11.2,
    roadCoveragePct: 84,
    hospitalBedsPer10k: 18.2,
    waterAccessPct: 82,
    broadbandPct: 79,
    activeRequests: 119,
    coordinates: { lat: 21.1702, lng: 72.8311, mapX: 490, mapY: 430 },
    dominantGap: 'Flood Drainage & Peri-Urban Transit',
    severity: 'high'
  },
  {
    id: 'rajkot',
    name: 'Rajkot',
    state: 'Gujarat',
    country: 'India',
    population: 3804000,
    ruralPopPct: 42,
    povertyRate: 15.6,
    roadCoveragePct: 72,
    hospitalBedsPer10k: 11.8,
    waterAccessPct: 61,
    broadbandPct: 53,
    activeRequests: 78,
    coordinates: { lat: 22.3039, lng: 70.8022, mapX: 270, mapY: 290 },
    dominantGap: 'Agricultural Feeder Electricity & Irrigation',
    severity: 'medium'
  },
  {
    id: 'kutch',
    name: 'Kutch',
    state: 'Gujarat',
    country: 'India',
    population: 2092000,
    ruralPopPct: 65,
    povertyRate: 24.8,
    roadCoveragePct: 51,
    hospitalBedsPer10k: 5.4,
    waterAccessPct: 48,
    broadbandPct: 32,
    activeRequests: 64,
    coordinates: { lat: 23.7337, lng: 69.8597, mapX: 190, mapY: 160 },
    dominantGap: 'Remote Telecom & Potable Desalination',
    severity: 'medium'
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    population: 8450000,
    ruralPopPct: 16,
    povertyRate: 9.8,
    roadCoveragePct: 89,
    hospitalBedsPer10k: 22.0,
    waterAccessPct: 88,
    broadbandPct: 85,
    activeRequests: 95,
    coordinates: { lat: 23.0225, lng: 72.5714, mapX: 410, mapY: 200 },
    dominantGap: 'Suburban Bus Rapid Transit & Solid Waste',
    severity: 'low'
  }
];

export const INITIAL_CITIZEN_REQUESTS = [
  // Primary Demo Scenario (PRD Section 12)
  {
    id: 'REQ-8492',
    title: 'Rural Healthcare & Tarapur CHC Emergency Road Connectivity',
    inputType: 'voice',
    language: 'gu',
    languageName: 'ગુજરાતી (Gujarati)',
    originalText: 'અમારા ગામ તારાપુરથી સામુહિક આરોગ્ય કેન્દ્ર સુધીનો રસ્તો ચોમાસામાં તૂટી ગયો છે, દર્દીઓ અને એમ્બ્યુલન્સ સમયસર હોસ્પિટલ પહોંચી શકતા નથી.',
    translatedText: 'The road from our Tarapur village to the Community Health Centre is broken since the monsoon, patients and ambulances cannot reach the hospital in time.',
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Anand',
      subdistrict: 'Tarapur',
      landmark: 'Near Tarapur CHC Junction'
    },
    category: 'healthcare',
    subcategory: 'Emergency Access & Road Infrastructure',
    urgency: 'Critical',
    confidenceScore: 0.96,
    entities: ['Tarapur CHC', 'Ambulance road access', 'Monsoon erosion', 'Patient transit'],
    affectedPopulation: 42000,
    status: 'Prioritized in Hotspot',
    similarRequests: ['REQ-8104', 'REQ-8319'],
    createdAt: '2026-09-20T08:14:00Z',
    audioDuration: '0:22',
    verified: true,
    audioWaveform: [25, 40, 65, 80, 45, 90, 75, 60, 85, 95, 70, 50, 65, 40, 20]
  },
  {
    id: 'REQ-8104',
    title: 'Tarapur East Approach Culvert Collapsed',
    inputType: 'text',
    language: 'gu',
    languageName: 'ગુજરાતી (Gujarati)',
    originalText: 'તારાપુર નજીક મોટું નાળું તૂટી જવાથી ત્રણ ગામોનો સંપર્ક કપાઈ ગયો છે.',
    translatedText: 'A major culvert collapsed near Tarapur, cutting off connectivity for three surrounding villages.',
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Anand',
      subdistrict: 'Tarapur',
      landmark: 'East Approach Culvert'
    },
    category: 'roads',
    subcategory: 'Bridge / Culvert Failure',
    urgency: 'Critical',
    confidenceScore: 0.94,
    entities: ['Tarapur', 'Bridge Culvert', 'Village isolation'],
    affectedPopulation: 18000,
    status: 'Clustered in Hotspot',
    similarRequests: ['REQ-8492', 'REQ-8319'],
    createdAt: '2026-09-18T14:22:00Z',
    verified: true
  },
  {
    id: 'REQ-8319',
    title: 'Ambulance Breakdown on Tarapur-Vataman Highway Link',
    inputType: 'voice',
    language: 'gu',
    languageName: 'ગુજરાતી (Gujarati)',
    originalText: 'હોસ્પિટલ જતી ૧૦૮ એમ્બ્યુલન્સ ખાડાઓમાં ફસાઈ ગઈ, તાત્કાલિક ડામર રોડની જરૂર છે.',
    translatedText: '108 Emergency Ambulance got stuck in deep potholes on way to clinic, urgent asphalt repaving required.',
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Anand',
      subdistrict: 'Tarapur',
      landmark: 'Tarapur-Vataman Stretch'
    },
    category: 'healthcare',
    subcategory: 'Emergency Access',
    urgency: 'Critical',
    confidenceScore: 0.95,
    entities: ['108 Ambulance', 'Tarapur Clinic', 'Potholes'],
    affectedPopulation: 26000,
    status: 'Clustered in Hotspot',
    similarRequests: ['REQ-8492', 'REQ-8104'],
    createdAt: '2026-09-19T17:05:00Z',
    audioDuration: '0:18',
    verified: true,
    audioWaveform: [30, 50, 70, 85, 90, 60, 45, 80, 95, 85, 60, 35, 20]
  },
  {
    id: 'REQ-7911',
    title: 'Dabhoi Rural PHC Tap Water Salinity and Shortage',
    inputType: 'text',
    language: 'hi',
    languageName: 'हिन्दी (Hindi)',
    originalText: 'हमारे सामुदायिक स्वास्थ्य केंद्र में पिछले दो हफ़्तों से नल का पानी नहीं आ रहा है, मरीज़ों को बाहर से पानी लाना पड़ता है।',
    translatedText: 'Tap water has been shut off for two weeks at our Community Health Centre; patients must carry water from outside.',
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Vadodara',
      subdistrict: 'Dabhoi',
      landmark: 'Dabhoi Sub-District Hospital'
    },
    category: 'water',
    subcategory: 'Institutional Potable Supply',
    urgency: 'High',
    confidenceScore: 0.92,
    entities: ['Dabhoi PHC', 'Tap water supply', 'Salinity'],
    affectedPopulation: 34000,
    status: 'In Hotspot Review',
    similarRequests: ['REQ-7820'],
    createdAt: '2026-09-17T11:40:00Z',
    verified: true
  },
  {
    id: 'REQ-7640',
    title: 'Padra Agricultural Feeder Power Fluctuation',
    inputType: 'text',
    language: 'en',
    languageName: 'English (BRICS Common)',
    originalText: 'Extreme high-voltage surge damaged three tubewell pump motors in rural Padra; irrigation has halted for 4 days.',
    translatedText: 'Extreme high-voltage surge damaged three tubewell pump motors in rural Padra; irrigation has halted for 4 days.',
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Vadodara',
      subdistrict: 'Padra',
      landmark: 'Padra West Substation'
    },
    category: 'electricity',
    subcategory: 'Agricultural Feeder Line',
    urgency: 'High',
    confidenceScore: 0.91,
    entities: ['Padra Substation', 'Tubewell motor', 'Surge voltage'],
    affectedPopulation: 19500,
    status: 'Under Investigation',
    similarRequests: [],
    createdAt: '2026-09-16T09:12:00Z',
    verified: true
  },
  {
    id: 'REQ-7521',
    title: 'Peri-Urban Drainage Overflow During High Tide',
    inputType: 'text',
    language: 'en',
    languageName: 'English (BRICS Common)',
    originalText: 'Stormwater canal in Olpad is choked with silt, causing sewage backflow into homes during monsoon tides.',
    translatedText: 'Stormwater canal in Olpad is choked with silt, causing sewage backflow into homes during monsoon tides.',
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Surat',
      subdistrict: 'Olpad',
      landmark: 'Olpad Coastal Canal'
    },
    category: 'water',
    subcategory: 'Stormwater & Sanitation',
    urgency: 'High',
    confidenceScore: 0.93,
    entities: ['Olpad Canal', 'High tide drainage', 'Sewage overflow'],
    affectedPopulation: 52000,
    status: 'Clustered in Hotspot',
    similarRequests: [],
    createdAt: '2026-09-15T15:30:00Z',
    verified: true
  },
  {
    id: 'REQ-7218',
    title: 'Falha no abastecimento de água potável no posto de saúde periférico',
    inputType: 'voice',
    language: 'pt',
    languageName: 'Português (Brazil)',
    originalText: 'O posto de saúde comunitário está sem água encanada há 3 semanas, mães e idosos sofrem na fila.',
    translatedText: 'The community health post has had no running tap water for 3 weeks; mothers and the elderly suffer in line.',
    location: {
      country: 'Brazil',
      state: 'São Paulo',
      district: 'Zona Leste',
      subdistrict: 'Itaquera',
      landmark: 'Posto de Saúde Municipal'
    },
    category: 'water',
    subcategory: 'Public Health Sanitation',
    urgency: 'Critical',
    confidenceScore: 0.94,
    entities: ['Posto de Saúde', 'Tap water cutoff', 'Itaquera'],
    affectedPopulation: 31000,
    status: 'Prioritized in Hotspot',
    similarRequests: [],
    createdAt: '2026-09-14T10:15:00Z',
    audioDuration: '0:20',
    verified: true,
    audioWaveform: [20, 35, 60, 75, 80, 50, 65, 80, 70, 40, 25]
  },
  {
    id: 'REQ-6992',
    title: 'Отсутствие круглогодичного дорожного сообщения с районной больницей',
    inputType: 'text',
    language: 'ru',
    languageName: 'Русский (Russia)',
    originalText: 'Грунтовая дорога размыта дождями, скорая помощь не может доехать до трёх отдалённых посёлков.',
    translatedText: 'The unpaved gravel road is washed out by rains; ambulances cannot reach three remote villages.',
    location: {
      country: 'Russia',
      state: 'Moscow Oblast',
      district: 'Volokolamsky',
      subdistrict: 'Kashino',
      landmark: 'Sector 4 Rural Route'
    },
    category: 'roads',
    subcategory: 'All-Weather Highway',
    urgency: 'High',
    confidenceScore: 0.95,
    entities: ['Ambulance transit', 'Gravel road washout', 'Kashino'],
    affectedPopulation: 22000,
    status: 'In Hotspot Review',
    similarRequests: [],
    createdAt: '2026-09-12T07:44:00Z',
    verified: true
  },
  {
    id: 'REQ-6810',
    title: '乡村初级学校宽带信号微弱无法支持数字化教室',
    inputType: 'text',
    language: 'zh',
    languageName: '中文 (China)',
    originalText: '山区中心小学光纤未通，只有间歇性2G信号，学生无法进行远程互动网课教学。',
    translatedText: 'The mountainous primary school has no optical fiber connection and only intermittent 2G signal; students cannot access remote classes.',
    location: {
      country: 'China',
      state: 'Yunnan',
      district: 'Zhaotong',
      subdistrict: 'Ludian',
      landmark: 'Ludian Village Central School'
    },
    category: 'digital',
    subcategory: 'School Broadband Connectivity',
    urgency: 'Medium',
    confidenceScore: 0.92,
    entities: ['Fiber broadband', 'Primary school', 'Remote education'],
    affectedPopulation: 14000,
    status: 'Under Investigation',
    similarRequests: [],
    createdAt: '2026-09-10T16:20:00Z',
    verified: true
  }
];

export const DEMAND_HOTSPOTS = [
  {
    id: 'HOT-101',
    name: 'Anand South Rural Corridor',
    district: 'Anand',
    state: 'Gujarat',
    country: 'India',
    severity: 'critical',
    score: 94,
    requestCount: 184,
    affectedPopulation: 74000,
    dominantCategory: 'healthcare',
    categoryBreakdown: { healthcare: 48, roads: 38, water: 10, electricity: 4 },
    coordinates: { x: 430, y: 270 },
    infrastructureGapPct: 82,
    existingInvestment: 'Low',
    summary: 'Acute crisis in emergency healthcare transit due to unpaved, flood-eroded roads leading to Tarapur Community Health Centre. 3 surrounding sub-districts cut off during high rainfall.'
  },
  {
    id: 'HOT-102',
    name: 'Vadodara Industrial Periphery',
    district: 'Vadodara',
    state: 'Gujarat',
    country: 'India',
    severity: 'high',
    score: 88,
    requestCount: 142,
    affectedPopulation: 58000,
    dominantCategory: 'water',
    categoryBreakdown: { water: 52, electricity: 28, roads: 12, healthcare: 8 },
    coordinates: { x: 520, y: 310 },
    infrastructureGapPct: 74,
    existingInvestment: 'Medium',
    summary: 'Groundwater salinity contamination and erratic 3-phase agricultural power lines affecting irrigation pumps and residential tap supply in Dabhoi & Padra talukas.'
  },
  {
    id: 'HOT-103',
    name: 'Surat Coastal Drainage Basin',
    district: 'Surat',
    state: 'Gujarat',
    country: 'India',
    severity: 'high',
    score: 82,
    requestCount: 119,
    affectedPopulation: 89000,
    dominantCategory: 'water',
    categoryBreakdown: { water: 60, roads: 25, safety: 10, environment: 5 },
    coordinates: { x: 490, y: 430 },
    infrastructureGapPct: 68,
    existingInvestment: 'Low',
    summary: 'Siltation of Olpad tidal canal causing severe stormwater stagnation, localized sewage flooding in high-density informal settlements.'
  },
  {
    id: 'HOT-104',
    name: 'Rajkot Semi-Arid Agricultural Belt',
    district: 'Rajkot',
    state: 'Gujarat',
    country: 'India',
    severity: 'medium',
    score: 76,
    requestCount: 78,
    affectedPopulation: 36000,
    dominantCategory: 'electricity',
    categoryBreakdown: { electricity: 55, water: 30, roads: 15 },
    coordinates: { x: 270, y: 290 },
    infrastructureGapPct: 55,
    existingInvestment: 'Medium',
    summary: 'Tubewell power feeder overload during sowing season causing repeated transformer trip-outs.'
  },
  {
    id: 'HOT-105',
    name: 'Kutch Desert Border Telecom Zone',
    district: 'Kutch',
    state: 'Gujarat',
    country: 'India',
    severity: 'medium',
    score: 69,
    requestCount: 64,
    affectedPopulation: 22000,
    dominantCategory: 'digital',
    categoryBreakdown: { digital: 65, water: 25, roads: 10 },
    coordinates: { x: 190, y: 160 },
    infrastructureGapPct: 62,
    existingInvestment: 'Low',
    summary: 'Zero optical fiber penetration in 42 border hamlets; teachers and primary health workers unable to file digital tele-consultations.'
  }
];

export const PRIORITY_INSIGHTS = [
  {
    id: 'INS-01',
    title: 'Rural Healthcare Connectivity & All-Weather Road Upgrade',
    district: 'Anand',
    state: 'Gujarat',
    category: 'healthcare',
    decisionScore: 94,
    status: 'Recommended for Immediate Tender',
    hotspotRef: 'HOT-101',
    metrics: {
      citizenRequests: 1842,
      affectedPopulation: 74000,
      infrastructureGapPct: 82,
      existingInvestment: 'Low'
    },
    keyFactors: [
      'High citizen demand volume (184 direct requests, +320% monthly increase)',
      'Severe ambulance transit bottleneck to Tarapur Community Health Centre',
      'High rural vulnerable population density (71% rural demographic)',
      'Near-zero existing road maintenance budget in current FY municipal allocation'
    ],
    evidence: {
      primaryVoiceReq: 'REQ-8492',
      voiceQuote: '"Patients and ambulances cannot reach the hospital in time because the road is eroded."',
      censusGap: 'District has only 7.2 hospital beds per 10k population; road delay doubles mortality risk.',
      similarRequestsCount: 184,
      aiConfidence: 0.96
    },
    proposedBudget: '$1,450,000 USD',
    estimatedDuration: '6 Months',
    expectedImpact: 'Reduces emergency ambulance transit time from 58 minutes to under 19 minutes.'
  },
  {
    id: 'INS-02',
    title: 'Vadodara Peripheral Water Desalination & Solar Pipeline',
    district: 'Vadodara',
    state: 'Gujarat',
    category: 'water',
    decisionScore: 88,
    status: 'In Engineering Review',
    hotspotRef: 'HOT-102',
    metrics: {
      citizenRequests: 1420,
      affectedPopulation: 58000,
      infrastructureGapPct: 74,
      existingInvestment: 'Medium'
    },
    keyFactors: [
      'Critical salinity report in 14 village tubewells',
      'Institutional cutoff affecting 2 Community Health Centres and 9 schools',
      'Consistent demand cluster across both Hindi and Gujarati submissions'
    ],
    evidence: {
      primaryVoiceReq: 'REQ-7911',
      voiceQuote: '"Tap water has been shut off for two weeks at our Community Health Centre."',
      censusGap: '26% of district population lacks access to piped tap water at home.',
      similarRequestsCount: 142,
      aiConfidence: 0.93
    },
    proposedBudget: '$2,100,000 USD',
    estimatedDuration: '9 Months',
    expectedImpact: 'Restores clean potable water access to 58,000 residents and eliminates seasonal waterborne illness spikes.'
  },
  {
    id: 'INS-03',
    title: 'Surat Olpad Coastal Tidal Embankment & Drainage Canal',
    district: 'Surat',
    state: 'Gujarat',
    category: 'water',
    decisionScore: 82,
    status: 'Feasibility Stage',
    hotspotRef: 'HOT-103',
    metrics: {
      citizenRequests: 1190,
      affectedPopulation: 89000,
      infrastructureGapPct: 68,
      existingInvestment: 'Low'
    },
    keyFactors: [
      'Monsoon tidal flooding repeatedly submerging low-income neighborhoods',
      'Public safety and vector disease hazards from stagnant sewage water',
      'High economic loss for daily wage laborers unable to traverse flooded streets'
    ],
    evidence: {
      primaryVoiceReq: 'REQ-7521',
      voiceQuote: '"Stormwater canal in Olpad is choked with silt, causing sewage backflow during tides."',
      censusGap: 'Coastal drainage network constructed in 1994, operating at 240% capacity.',
      similarRequestsCount: 119,
      aiConfidence: 0.91
    },
    proposedBudget: '$3,800,000 USD',
    estimatedDuration: '12 Months',
    expectedImpact: 'Protects 89,000 peri-urban residents from annual flooding and waterborne contamination.'
  },
  {
    id: 'INS-04',
    title: 'Kutch Remote Border Hamlets Digital Optical Fiber Link',
    district: 'Kutch',
    state: 'Gujarat',
    category: 'digital',
    decisionScore: 76,
    status: 'Submitted for Grant',
    hotspotRef: 'HOT-105',
    metrics: {
      citizenRequests: 640,
      affectedPopulation: 22000,
      infrastructureGapPct: 62,
      existingInvestment: 'Low'
    },
    keyFactors: [
      'Digital exclusion of 42 border schools and primary health posts',
      'Telemedicine tele-consultations impossible over intermittent 2G',
      'National Digital Literacy target lagging by 48%'
    ],
    evidence: {
      primaryVoiceReq: 'REQ-6810',
      voiceQuote: '"Mountain and border primary schools have zero optical fiber; children cut off from digital learning."',
      censusGap: 'Broadband penetration at only 32% across Kutch rural talukas.',
      similarRequestsCount: 64,
      aiConfidence: 0.90
    },
    proposedBudget: '$850,000 USD',
    estimatedDuration: '5 Months',
    expectedImpact: 'Connects 42 public schools and 8 primary health posts to high-speed fiber broadband.'
  }
];

export const TRACKED_PROJECTS = [
  {
    id: 'PRJ-201',
    title: 'Tarapur CHC Emergency Highway Link & Concrete Culvert',
    district: 'Anand',
    state: 'Gujarat',
    status: 'In Progress',
    budget: '$1,450,000',
    spent: '$680,000',
    progressPct: 48,
    startDate: '2026-05-10',
    targetDate: '2026-11-30',
    linkedInsight: 'INS-01',
    linkedRequestsCount: 184,
    contractor: 'Gujarat State Infrastructure Corp',
    impactTarget: 'Reduce emergency transit time by 65%'
  },
  {
    id: 'PRJ-189',
    title: 'Dabhoi Rural Water Filtration Plant & Piped Network',
    district: 'Vadodara',
    state: 'Gujarat',
    status: 'Completed',
    budget: '$1,850,000',
    spent: '$1,820,000',
    progressPct: 100,
    startDate: '2025-08-01',
    targetDate: '2026-03-15',
    linkedInsight: 'INS-02',
    linkedRequestsCount: 142,
    contractor: 'Sardar Sarovar Pipeline Consortium',
    impactTarget: 'Clean water access increased to 96%'
  },
  {
    id: 'PRJ-210',
    title: 'Padra Solar Agriculture Feeder Substation (12MW)',
    district: 'Vadodara',
    state: 'Gujarat',
    status: 'Approved',
    budget: '$3,200,000',
    spent: '$320,000',
    progressPct: 12,
    startDate: '2026-08-15',
    targetDate: '2027-04-30',
    linkedInsight: 'INS-04',
    linkedRequestsCount: 78,
    contractor: 'Western Energy Grid Ltd',
    impactTarget: 'Uninterrupted daytime solar power for 8,500 irrigation pumps'
  },
  {
    id: 'PRJ-215',
    title: 'Olpad Silt Dredging & Stormwater Tidal Sluice Gates',
    district: 'Surat',
    state: 'Gujarat',
    status: 'Proposed',
    budget: '$3,800,000',
    spent: '$0',
    progressPct: 0,
    startDate: '2026-12-01',
    targetDate: '2027-11-30',
    linkedInsight: 'INS-03',
    linkedRequestsCount: 119,
    contractor: 'Pending Municipal Tender',
    impactTarget: 'Zero residential waterlogging during monsoons'
  }
];

export const IMPACT_METRICS = [
  {
    id: 'IMP-01',
    projectId: 'PRJ-189',
    projectName: 'Dabhoi Rural Water Filtration Plant',
    district: 'Vadodara',
    category: 'water',
    populationBenefited: 46000,
    completionDate: 'March 2026',
    indicators: [
      { name: 'Piped Tap Water Access', baseline: '34%', postProject: '96%', delta: '+182%', unit: '%' },
      { name: 'Daily Water Supply Hours', baseline: '1.5 hrs', postProject: '16.0 hrs', delta: '+966%', unit: 'hrs' },
      { name: 'Average Transit to Water Source', baseline: '3.4 km', postProject: '0.0 km', delta: '-100%', unit: 'km' },
      { name: 'Reported Waterborne Illness (Cases/mo)', baseline: '142', postProject: '12', delta: '-91%', unit: 'cases' }
    ],
    citizenQuote: '"For the first time in 15 years, clean sweet drinking water flows straight into our kitchen tap every morning."'
  },
  {
    id: 'IMP-02',
    projectId: 'PRJ-201',
    projectName: 'Tarapur CHC Emergency Highway Link (Interim Phase 1)',
    district: 'Anand',
    category: 'healthcare',
    populationBenefited: 42000,
    completionDate: 'August 2026 (Phase 1 Paving)',
    indicators: [
      { name: 'Ambulance Transit Time', baseline: '58 mins', postProject: '19 mins', delta: '-67%', unit: 'mins' },
      { name: 'All-Weather Road Operability', baseline: '41%', postProject: '92%', delta: '+124%', unit: '%' },
      { name: 'Accidents on Hospital Approach Road', baseline: '28 / mo', postProject: '4 / mo', delta: '-85%', unit: 'events' },
      { name: 'CHC Patient Inflow Capacity', baseline: '65 / day', postProject: '190 / day', delta: '+192%', unit: 'pts/day' }
    ],
    citizenQuote: '"Before, pregnant women could not reach the hospital during floods. Now the concrete bridge allows ambulances even during torrential rain."'
  }
];

export const AUDIT_LOGS = [
  { id: 'LOG-501', timestamp: '2026-09-21T09:42:10Z', actor: 'AI Ingestion Pipeline', action: 'Classified incoming voice request REQ-8492 (Language: gu, Category: healthcare, Confidence: 0.96)' },
  { id: 'LOG-502', timestamp: '2026-09-21T09:43:05Z', actor: 'Intelligence Engine', action: 'Hotspot HOT-101 demand volume crossed critical threshold (+184 requests linked)' },
  { id: 'LOG-503', timestamp: '2026-09-21T09:55:20Z', actor: 'Policy Analyst (R. Verma)', action: 'Reviewed AI Recommendation INS-01; endorsed for Project Tender creation' },
  { id: 'LOG-504', timestamp: '2026-09-20T16:12:00Z', actor: 'System Admin', action: 'Calibrated Priority Model weights (Demand: 25%, Urgency: 25%, Pop: 20%, Gap: 20%, Budget: 10%)' }
];

export const DEFAULT_PRIORITY_WEIGHTS = {
  demandVolume: 25,
  urgencySeverity: 25,
  populationAffected: 20,
  infrastructureGap: 20,
  lackOfInvestment: 10
};
