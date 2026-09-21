import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, DollarSign, Users, Building, Plus, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { storageService } from '../../services/storageService';

export const Projects = ({ onNavigate }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
    const unsubscribe = storageService.subscribe(() => {
      loadProjects();
    });
    return unsubscribe;
  }, []);

  const loadProjects = async () => {
    const list = await api.getProjects();
    setProjects(list);
  };

  const handleAdvanceStatus = (projectId, currentStatus) => {
    const nextStatus = currentStatus === 'Proposed' ? 'Approved' : currentStatus === 'Approved' ? 'In Progress' : 'Completed';
    storageService.updateProjectStatus(projectId, nextStatus);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CheckCircle2 size={20} color="#10b981" />
            <span className="badge badge-low">Capital Expenditure Tracker</span>
          </div>
          <h2 style={{ fontSize: '1.85rem' }}>Infrastructure Project Portfolio</h2>
          <p style={{ fontSize: '0.9rem' }}>
            Tracking public works funded directly in response to verified citizen demand hotspots.
          </p>
        </div>

        <button onClick={() => onNavigate('gov-recommendations')} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Plus size={16} />
          <span>Approve Projects from AI Insights</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {projects.map((p) => {
          const isCompleted = p.status === 'Completed';
          const isInProgress = p.status === 'In Progress';
          const isApproved = p.status === 'Approved';

          return (
            <div key={p.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    {p.id}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: isCompleted ? 'rgba(16, 185, 129, 0.15)' : isInProgress ? 'rgba(59, 130, 246, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                      color: isCompleted ? '#34d399' : isInProgress ? '#60a5fa' : '#facc15',
                      border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : isInProgress ? 'rgba(59, 130, 246, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`
                    }}
                  >
                    ● {p.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{p.title}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Location: {p.district} District, {p.state} | Contractor: {p.contractor}
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Construction Completion</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.progressPct}%</span>
                  </div>
                  <div style={{ height: '8px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${p.progressPct}%`,
                        background: isCompleted ? '#10b981' : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                        borderRadius: '4px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Key Project Specs */}
                <div className="stat-grid-compact" style={{ margin: '0 0 16px 0', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <div className="stat-compact-item">
                    <span className="stat-compact-val">{p.budget}</span>
                    <span className="stat-compact-lbl">Total Budget</span>
                  </div>
                  <div className="stat-compact-item">
                    <span className="stat-compact-val" style={{ color: 'var(--accent-blue)' }}>{p.linkedRequestsCount}</span>
                    <span className="stat-compact-lbl">Citizen Voices</span>
                  </div>
                </div>

                {/* Impact Target Callout */}
                <div style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '20px' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>Target Impact</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p.impactTarget}</span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {!isCompleted ? (
                  <button
                    onClick={() => handleAdvanceStatus(p.id, p.status)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Advance Status to {p.status === 'Proposed' ? 'Approved' : p.status === 'Approved' ? 'In Progress' : 'Completed'}</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('gov-impact')}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }}
                  >
                    <span>View Before/After Impact Data</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
