import React, { useState } from 'react';
import { Compass, BarChart2, Layers, AlertCircle, ArrowUpRight } from 'lucide-react';
import { DISTRICTS_DATA } from '../../services/mockData';

export const InfrastructureGaps = ({ onNavigate }) => {
  const [metricFilter, setMetricFilter] = useState('roads');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Compass size={20} color="var(--accent-blue)" />
          <span className="badge badge-blue">Cross-Dataset Synthesis</span>
        </div>
        <h2 style={{ fontSize: '1.85rem' }}>Infrastructure Gap & Demographic Overlay</h2>
        <p style={{ fontSize: '0.9rem' }}>
          Correlating bottom-up citizen requests with official municipal datasets, census poverty ratios, and capital asset registries.
        </p>
      </div>

      {/* Cross-Dataset Matrix Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem' }}>District-by-District Deficit Matrix</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Benchmark: National Public Infrastructure Standard (NPIS-2026)
          </span>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>District</th>
                <th>Demographic</th>
                <th>Citizen Demands</th>
                <th>Road Operability</th>
                <th>Hospital Beds / 10k</th>
                <th>Tap Water Coverage</th>
                <th>Broadband Access</th>
                <th>Primary Gap Deficit</th>
              </tr>
            </thead>
            <tbody>
              {DISTRICTS_DATA.map((d) => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {d.name}
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem' }}>{(d.population / 1000000).toFixed(2)}M people</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.ruralPopPct}% Rural | {d.povertyRate}% Below PL</div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: d.activeRequests > 150 ? '#ef4444' : d.activeRequests > 100 ? '#f97316' : 'var(--text-primary)' }}>
                      {d.activeRequests} verified
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '60px', height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${d.roadCoveragePct}%`, height: '100%', background: d.roadCoveragePct < 65 ? '#ef4444' : '#3b82f6' }} />
                      </div>
                      <span style={{ fontSize: '0.8rem' }}>{d.roadCoveragePct}%</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: d.hospitalBedsPer10k < 8 ? '#ef4444' : d.hospitalBedsPer10k < 15 ? '#f59e0b' : '#10b981' }}>
                      {d.hospitalBedsPer10k} beds
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{d.waterAccessPct}%</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{d.broadbandPct}%</span>
                  </td>
                  <td>
                    <span className={`badge badge-${d.severity}`} style={{ fontSize: '0.7rem' }}>
                      {d.dominantGap.split('&')[0]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Finding Callouts */}
      <div className="grid-cols-2">
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #ef4444' }}>
          <h4 style={{ fontSize: '1.15rem', color: '#ef4444', marginBottom: '8px' }}>
            Emergency Health Vulnerability in Anand
          </h4>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            While Anand has a high rural population (71%), its hospital bed ratio is merely 7.2 per 10k residents. Combined with unpaved road networks that wash out during the monsoon, ambulance transit time is severely compromised (58 minutes vs. 20-minute safety threshold).
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #06b6d4' }}>
          <h4 style={{ fontSize: '1.15rem', color: '#06b6d4', marginBottom: '8px' }}>
            Potable Water Salinity Crisis in Vadodara Rural
          </h4>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            Vadodara shows a high volume of complaints centered around tap water quality and tubewell salinity in Dabhoi. Official municipal records confirm that 26% of peripheral households depend on unmonitored groundwater prone to chemical runoff.
          </p>
        </div>
      </div>
    </div>
  );
};
