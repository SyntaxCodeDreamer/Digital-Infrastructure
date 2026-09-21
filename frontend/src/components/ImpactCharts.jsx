import React from 'react';
import { TrendingUp, Users, CheckCircle, ArrowRight, ShieldCheck, HeartPulse, Droplets } from 'lucide-react';

export const ImpactCharts = ({ impactMetrics = [] }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {impactMetrics.map((imp) => (
        <div key={imp.id} className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
          {/* Header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '18px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-low" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  ✓ Impact Verified
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Completed: {imp.completionDate} | {imp.district} District
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>{imp.projectName}</h3>
            </div>

            {/* Beneficiaries Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
              <Users size={16} color="#06b6d4" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {imp.populationBenefited.toLocaleString()} Citizens Benefited
              </span>
            </div>
          </div>

          {/* Indicators Grid (Before vs After) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            {imp.indicators.map((ind, idx) => {
              const isPositive = ind.delta.startsWith('+') || ind.delta.startsWith('-');
              const isGoodReduction = ind.delta.startsWith('-') && (ind.name.includes('Transit') || ind.name.includes('Illness') || ind.name.includes('Distance') || ind.name.includes('Accident'));
              const highlightGreen = ind.delta.startsWith('+') || isGoodReduction;

              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>
                    {ind.name}
                  </div>

                  {/* Before / After Comparison */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Before</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#94a3b8' }}>{ind.baseline}</span>
                    </div>

                    <ArrowRight size={16} color="var(--text-muted)" />

                    <div>
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>After Project</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{ind.postProject}</span>
                    </div>
                  </div>

                  {/* Delta Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: highlightGreen ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: highlightGreen ? '#34d399' : '#f87171'
                      }}
                    >
                      {ind.delta} Impact
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Citizen Testimonial Verification */}
          {imp.citizenQuote && (
            <div
              style={{
                background: 'rgba(6, 182, 212, 0.08)',
                borderLeft: '4px solid var(--accent-cyan)',
                borderRadius: '0 8px 8px 0',
                padding: '12px 18px',
                fontSize: '0.875rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)'
              }}
            >
              {imp.citizenQuote}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
