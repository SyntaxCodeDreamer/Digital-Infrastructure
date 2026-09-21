import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { ImpactCharts } from '../../components/ImpactCharts';
import { api } from '../../services/api';

export const Impact = () => {
  const [impactMetrics, setImpactMetrics] = useState([]);

  useEffect(() => {
    loadImpact();
  }, []);

  const loadImpact = async () => {
    const list = await api.getImpactMetrics();
    setImpactMetrics(list);
  };

  const totalBenefited = impactMetrics.reduce((acc, m) => acc + m.populationBenefited, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <TrendingUp size={20} color="#10b981" />
            <span className="badge badge-low">Verified Outcomes</span>
          </div>
          <h2 style={{ fontSize: '1.85rem' }}>Post-Implementation Impact Measurement</h2>
          <p style={{ fontSize: '0.9rem' }}>
            Quantitative Before-and-After assessments validating whether completed public infrastructure solved the citizen-reported bottleneck.
          </p>
        </div>

        {/* Global Impact Badge */}
        <div className="glass-panel" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <HeartHandshake size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {totalBenefited.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Citizens Directly Benefited
            </div>
          </div>
        </div>
      </div>

      {/* Impact Indicators and Testimonials */}
      <ImpactCharts impactMetrics={impactMetrics} />
    </div>
  );
};
