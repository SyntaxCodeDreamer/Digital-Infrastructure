import React, { useState, useEffect } from 'react';
import { Lightbulb, Sliders, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { PriorityInsightCard } from '../../components/PriorityInsightCard';
import { api } from '../../services/api';
import { storageService } from '../../services/storageService';

export const Recommendations = ({ onNavigate, onOpenProject }) => {
  const [insights, setInsights] = useState([]);
  const [weights, setWeights] = useState(storageService.getWeights());
  const [approvedNotification, setApprovedNotification] = useState(null);

  useEffect(() => {
    loadData();
    const unsubscribe = storageService.subscribe((event, payload) => {
      if (event === 'PROJECT_CREATED' || event === 'WEIGHTS_UPDATED') {
        loadData();
      }
    });
    return unsubscribe;
  }, []);

  const loadData = async () => {
    const list = await api.getRecommendations();
    setInsights(list);
    setWeights(storageService.getWeights());
  };

  const handleOpenProject = (insightId) => {
    const proj = storageService.createProjectFromInsight(insightId);
    if (proj) {
      setApprovedNotification(`Project ${proj.id} successfully initiated and added to Tracked Projects!`);
      setTimeout(() => setApprovedNotification(null), 5000);
      if (onOpenProject) onOpenProject(proj.id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Lightbulb size={20} color="var(--accent-cyan)" />
            <span className="badge badge-purple">AI Decision-Support System</span>
          </div>
          <h2 style={{ fontSize: '1.85rem' }}>AI-Generated Project Recommendations</h2>
          <p style={{ fontSize: '0.9rem' }}>
            Multi-criteria prioritization ranking infrastructure opportunities by citizen demand volume, severity, and deficit.
          </p>
        </div>

        <button onClick={() => onNavigate('gov-settings')} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
          <Sliders size={16} />
          <span>Calibrate Priority Weights</span>
        </button>
      </div>

      {/* Notification Banner */}
      {approvedNotification && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '16px 20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399' }}>
          <CheckCircle2 size={20} />
          <span style={{ fontWeight: 600 }}>{approvedNotification}</span>
        </div>
      )}

      {/* Explainable Decision-Support Scoring Formula (PRD Section 8) */}
      <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-purple)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="var(--accent-purple)" />
            <span>Active Priority Scoring Formula</span>
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Configurable in Admin Settings</span>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '14px 18px', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '14px', overflowX: 'auto' }}>
          Score = ({weights.demandVolume}% × DemandVolume) + ({weights.urgencySeverity}% × Urgency) + ({weights.populationAffected}% × Population) + ({weights.infrastructureGap}% × InfraGap) + ({weights.lackOfInvestment}% × UnderInvestment)
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div>Demand: <strong>{weights.demandVolume}%</strong></div>
          <div>Severity: <strong>{weights.urgencySeverity}%</strong></div>
          <div>Pop. Impact: <strong>{weights.populationAffected}%</strong></div>
          <div>Census Gap: <strong>{weights.infrastructureGap}%</strong></div>
          <div>Under-Investment: <strong>{weights.lackOfInvestment}%</strong></div>
        </div>
      </div>

      {/* Insights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {insights.map((ins) => (
          <PriorityInsightCard
            key={ins.id}
            insight={ins}
            onOpenProject={handleOpenProject}
          />
        ))}
      </div>
    </div>
  );
};
