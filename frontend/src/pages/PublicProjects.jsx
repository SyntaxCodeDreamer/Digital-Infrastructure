import React, { useState, useEffect } from 'react';
import { Building, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export const PublicProjects = ({ onNavigate }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const list = await api.getProjects();
    setProjects(list);
  };

  return (
    <div className="container" style={{ maxWidth: '1100px', marginInline: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
          Open Public Transparency
        </span>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Citizen-Driven Public Works</h2>
        <p style={{ maxWidth: '640px', marginInline: 'auto' }}>
          See how local voices turn into funded civic infrastructure. Every project listed here was initiated and approved based on verified citizen demand clusters.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {projects.map((p) => {
          const isCompleted = p.status === 'Completed';
          return (
            <div key={p.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    {p.id}
                  </span>
                  <span className={`badge ${isCompleted ? 'badge-low' : 'badge-blue'}`}>
                    {p.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{p.title}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  📍 {p.district} District, {p.state}
                </div>

                {/* Progress */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                    <span style={{ fontWeight: 700 }}>{p.progressPct}%</span>
                  </div>
                  <div style={{ height: '8px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${p.progressPct}%`,
                        background: isCompleted ? '#10b981' : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>

                {/* Impact Statement */}
                <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', display: 'block' }}>Expected Public Outcome</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.impactTarget}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Driven by <strong>{p.linkedRequestsCount}</strong> citizen petitions</span>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{p.budget}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
