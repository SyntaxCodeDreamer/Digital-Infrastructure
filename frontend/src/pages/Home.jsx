import React from 'react';
import { 
  ArrowRight, 
  Mic, 
  Globe2, 
  ShieldCheck, 
  Flame, 
  Compass, 
  Building, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  Lock, 
  Layers,
  FileCheck
} from 'lucide-react';
import { BRICS_LANGUAGES } from '../services/mockData';

export const Home = ({ onNavigate, onTestScenario }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
      {/* Hero Section (DESIGN.md Section 3) */}
      <section style={{ textAlign: 'center', padding: '40px 0 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid var(--border-bright)', marginBottom: '24px' }}>
          <Sparkles size={16} color="#06b6d4" />
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
            BRICS Digital Public Good — AI-Powered Civic Intelligence
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', maxWidth: '900px', marginInline: 'auto' }}>
          Your Voice. <br />
          <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Better Infrastructure.
          </span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '680px', marginInline: 'auto', marginBottom: '36px', lineHeight: 1.6 }}>
          Submit local infrastructure needs in your native language through voice or text. Our explainable AI unifies citizen demand with public datasets to help policymakers prioritize life-changing projects.
        </p>

        {/* Dual Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <button
            onClick={() => onNavigate('report')}
            className="btn btn-primary btn-lg"
            style={{ gap: '10px' }}
          >
            <Mic size={20} />
            <span>Report a Need (Voice / Text)</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => onNavigate('gov-dashboard')}
            className="btn btn-secondary btn-lg"
            style={{ gap: '10px' }}
          >
            <BarChart3 size={20} color="var(--accent-cyan)" />
            <span>Explore Development Data</span>
          </button>
        </div>
      </section>

      {/* Live Impact Ticker */}
      <section className="container">
        <div className="glass-panel" style={{ padding: '24px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }} className="stat-ticker-grid">
            <style>{`
              @media (max-width: 768px) {
                .stat-ticker-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
            `}</style>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>
                2,490+
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Citizen Requests Ingested
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)', fontFamily: 'var(--font-display)' }}>
                7
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                BRICS Languages Supported
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f97316', fontFamily: 'var(--font-display)' }}>
                5
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Active Demand Hotspots
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-display)' }}>
                242,000+
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Population Impacted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary MVP Demo Scenario Spotlight (PRD Section 12) */}
      <section className="container">
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            borderLeft: '5px solid var(--accent-cyan)',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%), var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
                ⭐ Flagship MVP Demo Scenario (PRD Section 12)
              </span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Rural Healthcare & Road Connectivity
              </span>
            </div>
            <button
              onClick={() => onNavigate('report')}
              className="btn btn-primary btn-sm"
              style={{ gap: '6px' }}
            >
              <span>Test This Scenario Now</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '24px' }} className="demo-spotlight-grid">
            <style>{`
              @media (max-width: 900px) {
                .demo-spotlight-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>
                Gujarati Voice Ingestion → Anand Rural Hospital Road Upgrade
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
                A citizen in Tarapur village submits a voice note in Gujarati reporting that monsoon floods washed out the approach road to the Community Health Centre, blocking emergency ambulances.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span className="badge badge-purple">1. Speech-to-Text & Language Detect (gu)</span>
                <span className="badge badge-blue">2. Cross-Category AI Classification (Health + Roads)</span>
                <span className="badge badge-high">3. Anand Demand Hotspot Trigger (184 reqs)</span>
                <span className="badge badge-low">4. $1.45M Project Tender Initiated</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Simulated Audio Clip
              </div>
              <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '12px' }}>
                "અમારા ગામ તારાપુરથી સામુહિક આરોગ્ય કેન્દ્ર સુધીનો રસ્તો ચોમાસામાં તૂટી ગયો છે..."
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                <span>✓ 96% AI Confidence</span>
                <span>Ambulance Time -67%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (PRD Section 3 & DESIGN Section 3) */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>End-to-End Intelligence Pipeline</h2>
          <p style={{ maxWidth: '600px', marginInline: 'auto' }}>
            From an individual citizen's voice note to verified infrastructure impact.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="pipeline-grid">
          <style>{`
            @media (max-width: 900px) {
              .pipeline-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: '16px' }}>
              <Mic size={22} />
            </div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>1. Multilingual Citizen Voice</h4>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              Citizens submit concerns via voice recordings, text, or messaging in their native tongue with zero technical literacy required.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', marginBottom: '16px' }}>
              <Sparkles size={22} />
            </div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>2. AI Understanding & Fusion</h4>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              Speech-to-text, translation, classification, and deduplication merge citizen demands with municipal census and road asset inventories.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '16px' }}>
              <BarChart3 size={22} />
            </div>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>3. Evidence-Based Action</h4>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              Policymakers explore interactive demand hotspots and explainable project recommendations with transparent scoring formulas.
            </p>
          </div>
        </div>
      </section>

      {/* Multilingual Support Grid */}
      <section className="container">
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Designed for Linguistic Diversity</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Preserving original native scripts while providing unified analytics in common languages.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
            {BRICS_LANGUAGES.map(lang => (
              <div
                key={lang.code}
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>{lang.flag}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{lang.name.split(' ')[0]}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{lang.name.split(' ')[1] || 'Official'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust, Privacy & Ethics Pledge (PRD Section 11 & RULES Section 2) */}
      <section className="container" style={{ marginBottom: '40px' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)', flexShrink: 0 }}>
            <ShieldCheck size={28} />
          </div>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Digital Public Good Ethics & Privacy Pledge</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              1. <strong>Human-in-the-Loop:</strong> AI outputs are non-binding decision support; no automated budget disbursement.<br />
              2. <strong>Privacy Preservation:</strong> Individual citizen complaints are never exposed publicly; geographic visualizations use privacy-preserving cluster aggregations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
