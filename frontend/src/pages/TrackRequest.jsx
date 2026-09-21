import React, { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle2, Clock, Sparkles, Building, ArrowRight, Layers, Volume2 } from 'lucide-react';
import { api } from '../services/api';

export const TrackRequest = ({ initialRequestId = '', onOpenProject }) => {
  const [searchId, setSearchId] = useState(initialRequestId || 'REQ-8492');
  const [currentRequest, setCurrentRequest] = useState(null);
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (initialRequestId) {
      setSearchId(initialRequestId);
      handleSearch(initialRequestId);
    }
  }, [initialRequestId]);

  const loadData = async () => {
    const list = await api.getRequests();
    setAllRequests(list);
    if (initialRequestId) {
      const match = list.find(r => r.id.toLowerCase() === initialRequestId.toLowerCase());
      if (match) setCurrentRequest(match);
    } else if (list.length > 0) {
      setCurrentRequest(list[0]);
    }
  };

  const handleSearch = async (queryId = searchId) => {
    if (!queryId.trim()) return;
    setLoading(true);
    const req = await api.getRequestById(queryId.trim());
    setCurrentRequest(req);
    setLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: '960px', marginInline: 'auto' }}>
      {/* Search Header */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '28px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Track Citizen Request</h2>
          <p>Real-time visibility into the municipal decision-support and project execution pipeline.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', maxWidth: '560px', marginInline: 'auto' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Request ID (e.g. REQ-8492)..."
              className="input-control"
              style={{ paddingLeft: '42px', fontFamily: 'var(--font-mono)' }}
            />
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
          </div>
          <button onClick={() => handleSearch()} className="btn btn-primary" style={{ paddingInline: '24px' }}>
            Track Status
          </button>
        </div>

        {/* Quick Click Samples */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quick sample IDs:</span>
          {allRequests.slice(0, 4).map(r => (
            <button
              key={r.id}
              onClick={() => {
                setSearchId(r.id);
                handleSearch(r.id);
              }}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '2px 8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-blue)',
                cursor: 'pointer'
              }}
            >
              {r.id} ({r.language})
            </button>
          ))}
        </div>
      </div>

      {/* Request Details & Pipeline Stepper */}
      {currentRequest ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Main Card */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-cyan)' }}>
                    {currentRequest.id}
                  </span>
                  <span className={`badge badge-${currentRequest.urgency.toLowerCase()}`}>
                    {currentRequest.urgency} Urgency
                  </span>
                  <span className="badge badge-purple">
                    {currentRequest.category.toUpperCase()}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.4rem' }}>{currentRequest.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                  <MapPin size={15} color="#06b6d4" />
                  <span>{currentRequest.location?.subdistrict}, {currentRequest.location?.district} ({currentRequest.location?.state})</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-low" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                  ● {currentRequest.status || 'Prioritized in Hotspot'}
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Ingested: {new Date(currentRequest.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Original vs Translated */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '28px' }} className="track-compare-grid">
              <style>{`
                @media (max-width: 768px) {
                  .track-compare-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Original Citizen Voice ({currentRequest.languageName || currentRequest.language})
                </div>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  "{currentRequest.originalText}"
                </p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  AI Normalized & Translated English
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  "{currentRequest.translatedText}"
                </p>
              </div>
            </div>

            {/* Visual Lifecycle Stepper */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="var(--accent-cyan)" />
                <span>End-to-End Processing Stepper</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="pipeline-step done">
                  <div className="pipeline-step-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Stage 1: Citizen Ingestion & Transcription</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Ingested via {currentRequest.inputType.toUpperCase()} channel. Native script captured with zero data loss.
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Completed</span>
                </div>

                <div className="pipeline-step done">
                  <div className="pipeline-step-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Stage 2: AI Multi-Sector Classification & Geocoding</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Mapped to {currentRequest.category.toUpperCase()} category with {((currentRequest.confidenceScore || 0.95) * 100).toFixed(0)}% confidence. Geocoded to {currentRequest.location?.district}.
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Completed</span>
                </div>

                <div className="pipeline-step done">
                  <div className="pipeline-step-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Stage 3: Demand Hotspot Clustering</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Clustered with {currentRequest.similarRequests?.length || 2} similar requests in the {currentRequest.location?.district} District Demand Cluster.
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Active in Hotspot</span>
                </div>

                <div className="pipeline-step" style={{ borderColor: 'var(--border-bright)', background: 'rgba(59, 130, 246, 0.08)' }}>
                  <div className="pipeline-step-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>4</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--accent-blue)' }}>Stage 4: Government Project Insight & Tender Consideration</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Reviewed by Municipal Infrastructure Analysts. Linked to Priority Insight #INS-01.
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>In Review</span>
                </div>

                <div className="pipeline-step">
                  <div className="pipeline-step-icon" style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}>5</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-muted)' }}>Stage 5: Construction & Before/After Impact Verification</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Execution by State Infrastructure Corp. Post-project impact surveys will measure transit time improvement.
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upcoming</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No citizen request found with ID "{searchId}". Please check the ID or try one of the samples above.
        </div>
      )}
    </div>
  );
};
