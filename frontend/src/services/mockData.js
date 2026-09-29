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

export const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🌐' },
  { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳' }
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
    activeRequests: 0,
    coordinates: { lat: 22.5645, lng: 72.9289, mapX: 430, mapY: 270 },
    dominantGap: 'None',
    severity: 'low'
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
    activeRequests: 0,
    coordinates: { lat: 22.3072, lng: 73.1812, mapX: 520, mapY: 310 },
    dominantGap: 'None',
    severity: 'low'
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
    activeRequests: 0,
    coordinates: { lat: 21.1702, lng: 72.8311, mapX: 490, mapY: 430 },
    dominantGap: 'None',
    severity: 'low'
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
    activeRequests: 0,
    coordinates: { lat: 22.3039, lng: 70.8022, mapX: 270, mapY: 290 },
    dominantGap: 'None',
    severity: 'low'
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
    activeRequests: 0,
    coordinates: { lat: 23.7337, lng: 69.8597, mapX: 190, mapY: 160 },
    dominantGap: 'None',
    severity: 'low'
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
    activeRequests: 0,
    coordinates: { lat: 23.0225, lng: 72.5714, mapX: 410, mapY: 200 },
    dominantGap: 'None',
    severity: 'low'
  }
];

export const INITIAL_CITIZEN_REQUESTS = [];

export const DEMAND_HOTSPOTS = [];

export const PRIORITY_INSIGHTS = [];

export const TRACKED_PROJECTS = [];

export const IMPACT_METRICS = [];

export const AUDIT_LOGS = [];

export const DEFAULT_PRIORITY_WEIGHTS = {
  demandVolume: 25,
  urgencySeverity: 25,
  populationAffected: 20,
  infrastructureGap: 20,
  lackOfInvestment: 10
};

