import React, { useState } from 'react';
import { Lightbulb, CheckCircle, ArrowRight, ShieldAlert, Sparkles, FileText, X } from 'lucide-react';

export const PriorityInsightCard = ({ insight, onOpenProject }) => {
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 90) return '#ef4444';
    if (score >= 80) return '#f97316';
    if (score >= 70) return '#eab308';
    return '#10b981';
  };

  return (
    <>
      <div className={`insight-card ${insight.decisionScore >= 90 ? 'critical' : 'high'}`}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                AI Decision Support
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {insight.district} District, {insight.state}
              </span>
            </div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {insight.title}
            </h4>
          </div>

          {/* Decision Score Badge */}
          <div
            style={{
              padding: '6px 12px',
              borderRadius: '12px',
              background: `${getScoreColor(insight.decisionScore)}22`,
              border: `1px solid ${getScoreColor(insight.decisionScore)}66`,
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: getScoreColor(insight.decisionScore), lineHeight: 1 }}>
              {insight.decisionScore}
            </div>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
              Score / 100
            </div>
          </div>
        </div>

        {/* 4 Metrics Grid (Per DESIGN.md Section 7) */}
        <div className="stat-grid-compact">
          <div className="stat-compact-item">
            <span className="stat-compact-val">{insight.metrics.citizenRequests.toLocaleString()}</span>
            <span className="stat-compact-lbl">Citizen Requests</span>
          </div>
          <div className="stat-compact-item">
            <span className="stat-compact-val">{insight.metrics.affectedPopulation.toLocaleString()}</span>
            <span className="stat-compact-lbl">Affected Pop.</span>
          </div>
          <div className="stat-compact-item">
            <span className="stat-compact-val" style={{ color: '#ef4444' }}>{insight.metrics.infrastructureGapPct}%</span>
            <span className="stat-compact-lbl">Infra Gap</span>
          </div>
          <div className="stat-compact-item">
            <span className="stat-compact-val" style={{ color: insight.metrics.existingInvestment === 'Low' ? '#ef4444' : '#f59e0b' }}>
              {insight.metrics.existingInvestment}
            </span>
            <span className="stat-compact-lbl">Existing Budget</span>
          </div>
        </div>

        {/* Key Factors Bulleted List */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Key Driving Factors
          </div>
          <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {insight.keyFactors.map((factor, idx) => (
              <li key={idx}>{factor}</li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setShowEvidenceModal(true)}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <FileText size={15} />
            <span>Review Evidence</span>
          </button>

          <button
            onClick={() => onOpenProject(insight.id)}
            className="btn btn-primary btn-sm"
            style={{ gap: '6px' }}
          >
            <span>Open Project</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Evidence Inspection Modal */}
      {showEvidenceModal && (
        <div className="modal-overlay" onClick={() => setShowEvidenceModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '6px' }}>
                  Explainable Decision Support
                </span>
                <h3 style={{ fontSize: '1.4rem' }}>{insight.title} — Evidence Dossier</h3>
                <p style={{ fontSize: '0.85rem' }}>Supporting data behind priority score calculation</p>
              </div>
              <button onClick={() => setShowEvidenceModal(false)} className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Primary Citizen Quote */}
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                  <Sparkles size={16} />
                  <span>Primary Voice Ingestion Reference ({insight.evidence.primaryVoiceReq})</span>
                </div>
                <blockquote style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0, paddingLeft: '12px', borderLeft: '3px solid var(--accent-cyan)' }}>
                  {insight.evidence.voiceQuote}
                </blockquote>
              </div>

              {/* Census & Infrastructure Audit Gap */}
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                  Government Infrastructure Baseline Deficit
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {insight.evidence.censusGap}
                </p>
              </div>

              {/* Model Confidence & Policy Disclaimer */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Model Confidence</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    {(insight.evidence.aiConfidence * 100).toFixed(0)}% Certainty
                  </div>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Linked Similar Requests</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                    {insight.evidence.similarRequestsCount} Submissions
                  </div>
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ⚖️ <strong>Compliance Notice:</strong> As mandated by platform rules, this score is non-binding decision support. Final public capital expenditure requires authorized government analyst ratification.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button onClick={() => setShowEvidenceModal(false)} className="btn btn-secondary">
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setShowEvidenceModal(false);
                  onOpenProject(insight.id);
                }}
                className="btn btn-primary"
              >
                Approve & Initiate Project Tender
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
