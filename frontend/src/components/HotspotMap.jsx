import React, { useState } from 'react';
import { Flame, MapPin, Users, AlertTriangle, ChevronRight, X, Layers, Activity } from 'lucide-react';
import { CATEGORIES } from '../services/mockData';

export const HotspotMap = ({ hotspots = [], districts = [], onSelectHotspot }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0] || null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredHotspots = hotspots.filter(h => {
    if (activeCategory === 'all') return true;
    return h.dominantCategory === activeCategory;
  });

  const getSeverityColor = (sev) => {
    switch (sev) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      default: return '#10b981';
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
      {/* Map Header & Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={20} color="#f97316" />
            <h3 style={{ fontSize: '1.25rem' }}>Geographic Demand Hotspots</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            AI-aggregated density clusters preserving citizen privacy (BRICS Gujarat Regional Node)
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`btn btn-sm ${activeCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
          >
            All Sectors
          </button>
          {CATEGORIES.slice(0, 5).map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn btn-sm ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              {cat.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Container */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '20px' }} className="hotspot-map-grid">
        <style>{`
          @media (max-width: 960px) {
            .hotspot-map-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* SVG Interactive Canvas */}
        <div className="map-canvas-container" style={{ minHeight: '440px' }}>
          <svg viewBox="0 0 700 520" className="map-svg-layer">
            <defs>
              <radialGradient id="heatCritical" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatHigh" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatMedium" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#eab308" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Region Backdrop Grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* District Polygons */}
            {/* Kutch */}
            <path
              d="M 60 140 L 160 90 L 260 130 L 240 210 L 160 220 L 70 200 Z"
              className={`district-polygon ${selectedDistrict?.id === 'kutch' ? 'selected' : ''}`}
              onClick={() => setSelectedDistrict(districts.find(d => d.id === 'kutch'))}
            />
            <text x="140" y="160" fill="var(--text-muted)" fontSize="13" fontWeight="600">Kutch District</text>

            {/* Rajkot / Saurashtra */}
            <path
              d="M 180 230 L 270 210 L 340 250 L 330 350 L 220 370 L 160 300 Z"
              className={`district-polygon ${selectedDistrict?.id === 'rajkot' ? 'selected' : ''}`}
              onClick={() => setSelectedDistrict(districts.find(d => d.id === 'rajkot'))}
            />
            <text x="230" y="300" fill="var(--text-muted)" fontSize="13" fontWeight="600">Rajkot Region</text>

            {/* Ahmedabad */}
            <path
              d="M 350 140 L 450 130 L 460 220 L 380 240 L 330 190 Z"
              className={`district-polygon ${selectedDistrict?.id === 'ahmedabad' ? 'selected' : ''}`}
              onClick={() => setSelectedDistrict(districts.find(d => d.id === 'ahmedabad'))}
            />
            <text x="370" y="185" fill="var(--text-muted)" fontSize="13" fontWeight="600">Ahmedabad</text>

            {/* Anand (Primary Demo District) */}
            <path
              d="M 390 240 L 470 230 L 480 300 L 400 310 Z"
              className={`district-polygon ${selectedDistrict?.id === 'anand' ? 'selected' : ''}`}
              onClick={() => setSelectedDistrict(districts.find(d => d.id === 'anand'))}
              style={{
                fill: selectedDistrict?.id === 'anand' ? 'rgba(6, 182, 212, 0.35)' : 'rgba(239, 68, 68, 0.15)',
                stroke: '#ef4444',
                strokeWidth: 2
              }}
            />
            <text x="415" y="275" fill="#f87171" fontSize="13" fontWeight="700">Anand (Hotspot)</text>

            {/* Vadodara */}
            <path
              d="M 480 240 L 590 250 L 580 360 L 480 330 Z"
              className={`district-polygon ${selectedDistrict?.id === 'vadodara' ? 'selected' : ''}`}
              onClick={() => setSelectedDistrict(districts.find(d => d.id === 'vadodara'))}
            />
            <text x="505" y="300" fill="var(--text-muted)" fontSize="13" fontWeight="600">Vadodara</text>

            {/* Surat */}
            <path
              d="M 430 360 L 550 360 L 560 490 L 440 480 Z"
              className={`district-polygon ${selectedDistrict?.id === 'surat' ? 'selected' : ''}`}
              onClick={() => setSelectedDistrict(districts.find(d => d.id === 'surat'))}
            />
            <text x="475" y="425" fill="var(--text-muted)" fontSize="13" fontWeight="600">Surat Coastal</text>

            {/* Pulsing Hotspot Circles */}
            {filteredHotspots.map(h => {
              const color = getSeverityColor(h.severity);
              const gradId = h.severity === 'critical' ? 'url(#heatCritical)' : h.severity === 'high' ? 'url(#heatHigh)' : 'url(#heatMedium)';
              return (
                <g key={h.id} className="hotspot-pin" onClick={() => {
                  const dist = districts.find(d => d.name.toLowerCase() === h.district.toLowerCase());
                  if (dist) setSelectedDistrict(dist);
                  if (onSelectHotspot) onSelectHotspot(h);
                }}>
                  {/* Glowing Heat Circle */}
                  <circle cx={h.coordinates.x} cy={h.coordinates.y} r="45" fill={gradId} />
                  
                  {/* Outer Pulsing Radar Ring */}
                  <circle
                    cx={h.coordinates.x}
                    cy={h.coordinates.y}
                    r="24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    className="animate-radar"
                  />

                  {/* Inner Pin */}
                  <circle
                    cx={h.coordinates.x}
                    cy={h.coordinates.y}
                    r="8"
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />

                  {/* Label */}
                  <text
                    x={h.coordinates.x + 12}
                    y={h.coordinates.y + 4}
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="700"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {h.requestCount} reqs
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Legend */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'var(--bg-glass-heavy)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '8px 14px',
              display: 'flex',
              gap: '16px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span>Critical Demand</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f97316' }} />
              <span>High</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
              <span>Medium</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              <span>Low</span>
            </div>
          </div>
        </div>

        {/* District Detail Sidebar */}
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {selectedDistrict ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className={`badge badge-${selectedDistrict.severity || 'high'}`}>
                  {selectedDistrict.severity || 'Active'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {selectedDistrict.state}, {selectedDistrict.country}
                </span>
              </div>

              <h4 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>
                {selectedDistrict.name} District
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {selectedDistrict.dominantGap}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Active Citizen Demands</span>
                  <span style={{ fontWeight: 700, color: '#f87171' }}>{selectedDistrict.activeRequests} verified</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Population</span>
                  <span style={{ fontWeight: 600 }}>{(selectedDistrict.population / 1000000).toFixed(2)}M</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Rural Demographic</span>
                  <span style={{ fontWeight: 600 }}>{selectedDistrict.ruralPopPct}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Hospital Beds / 10k</span>
                  <span style={{ fontWeight: 600, color: selectedDistrict.hospitalBedsPer10k < 10 ? '#ef4444' : '#10b981' }}>
                    {selectedDistrict.hospitalBedsPer10k} (Target: 20)
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Paved Road Operability</span>
                  <span style={{ fontWeight: 600 }}>{selectedDistrict.roadCoveragePct}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Tap Water Access</span>
                  <span style={{ fontWeight: 600 }}>{selectedDistrict.waterAccessPct}%</span>
                </div>
              </div>

              {/* Connected Hotspot Alert */}
              {hotspots.find(h => h.district.toLowerCase() === selectedDistrict.name.toLowerCase()) && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '0.8rem',
                    color: '#fca5a5'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                    <AlertTriangle size={14} color="#ef4444" />
                    <span>Immediate Attention Triggered</span>
                  </div>
                  {hotspots.find(h => h.district.toLowerCase() === selectedDistrict.name.toLowerCase())?.summary}
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
              Click any district polygon or hotspot pin on the map to inspect aggregated indicators.
            </div>
          )}

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>
            🔒 Strict Privacy: Individual complaints are anonymized into cluster densities.
          </div>
        </div>
      </div>
    </div>
  );
};
