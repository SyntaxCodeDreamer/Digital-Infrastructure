import React, { useState } from 'react';
import { Flame, AlertTriangle, Users, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { HotspotMap } from '../../components/HotspotMap';
import { storageService } from '../../services/storageService';

export const Hotspots = ({ onNavigate }) => {
  const [hotspots] = useState(storageService.getHotspots());
  const [districts] = useState(storageService.getDistricts());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Flame size={20} color="#f97316" />
          <span className="badge badge-high">Geospatial Cluster Analysis</span>
        </div>
        <h2 style={{ fontSize: '1.85rem' }}>Demand Hotspots Intelligence</h2>
        <p style={{ fontSize: '0.9rem' }}>
          Algorithmic density mapping identifying localized infrastructure deficits without compromising individual citizen privacy.
        </p>
      </div>

      {/* Interactive Map */}
      <HotspotMap hotspots={hotspots} districts={districts} />

      {/* Ranked Hotspot Clusters List */}
      <div>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Ranked Criticality Hotspots</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {hotspots.map((h, idx) => (
            <div
              key={h.id}
              className="glass-panel"
              style={{
                padding: '24px',
                borderTop: `4px solid ${h.severity === 'critical' ? '#ef4444' : h.severity === 'high' ? '#f97316' : '#eab308'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className={`badge badge-${h.severity}`}>
                  #{idx + 1} {h.severity.toUpperCase()} ALERT
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {h.district}, {h.state}
                </span>
              </div>

              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{h.name}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
                {h.summary}
              </p>

              <div className="stat-grid-compact" style={{ margin: '0 0 16px 0' }}>
                <div className="stat-compact-item">
                  <span className="stat-compact-val">{h.requestCount}</span>
                  <span className="stat-compact-lbl">Demands</span>
                </div>
                <div className="stat-compact-item">
                  <span className="stat-compact-val">{(h.affectedPopulation / 1000).toFixed(0)}k</span>
                  <span className="stat-compact-lbl">Residents</span>
                </div>
                <div className="stat-compact-item">
                  <span className="stat-compact-val" style={{ color: '#ef4444' }}>{h.infrastructureGapPct}%</span>
                  <span className="stat-compact-lbl">Infra Gap</span>
                </div>
                <div className="stat-compact-item">
                  <span className="stat-compact-val">{h.existingInvestment}</span>
                  <span className="stat-compact-lbl">Budget Level</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('gov-recommendations')}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Inspect AI Project Recommendations</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
