import React, { useState } from 'react';
import { X, Volume2, Play, Pause, MapPin, CheckCircle2, AlertCircle, Share2, Sparkles, Layers } from 'lucide-react';

export const RequestDetailModal = ({ request, onClose, onTrackClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!request) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {request.id}
              </span>
              <span className={`badge badge-${request.urgency.toLowerCase()}`}>
                {request.urgency} Urgency
              </span>
              <span className="badge badge-blue">
                {request.category.toUpperCase()}
              </span>
            </div>
            <h3 style={{ fontSize: '1.35rem' }}>{request.title}</h3>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Multilingual Text Comparison (Preserving Native Language) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
          {/* Original Citizen Submission */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Original Submission ({request.languageName || request.language})
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                {request.inputType === 'voice' ? '🎙️ Voice Ingest' : '✍️ Text Ingest'}
              </span>
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: request.inputType === 'voice' ? 'italic' : 'normal' }}>
              "{request.originalText}"
            </div>

            {/* If Voice, show Audio Player Bar */}
            {request.inputType === 'voice' && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="audio-player-pill"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{isPlaying ? 'Pause Audio' : 'Play Voice Recording'}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({request.audioDuration || '0:22'})</span>
                </button>
              </div>
            )}
          </div>

          {/* AI Translated & Normalized English */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                AI Normalized & Translated (English)
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                ✓ Verified
              </span>
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              "{request.translatedText}"
            </div>
          </div>
        </div>

        {/* AI Ingestion Intelligence Metrics */}
        <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="var(--accent-cyan)" />
            <span>AI Understanding & Extraction Layer</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI Confidence Score</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                {((request.confidenceScore || 0.95) * 100).toFixed(0)}%
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Location Extracted</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {request.location?.subdistrict}, {request.location?.district}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Estimated Beneficiaries</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                {(request.affectedPopulation || 24000).toLocaleString()} residents
              </div>
            </div>
          </div>

          {/* Extracted Entities */}
          {request.entities && request.entities.length > 0 && (
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Extracted Entities & Geographic Identifiers:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {request.entities.map((ent, idx) => (
                  <span key={idx} className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                    {ent}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Similar / Duplicate Requests Cluster (PRD Feature 6) */}
        {request.similarRequests && request.similarRequests.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={15} />
              <span>Deduplication & Similar Demand Cluster ({request.similarRequests.length} detected)</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {request.similarRequests.map((simId) => (
                <span
                  key={simId}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-blue)'
                  }}
                >
                  🔗 {simId}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Submitted: {new Date(request.createdAt).toLocaleDateString()}
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
            {onTrackClick && (
              <button onClick={() => onTrackClick(request.id)} className="btn btn-primary">
                View Full Tracking Pipeline
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
