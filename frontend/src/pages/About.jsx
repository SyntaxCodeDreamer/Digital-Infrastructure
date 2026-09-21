import React from 'react';
import { ShieldCheck, Globe2, Cpu, FileCheck, Layers, Award, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <div className="container" style={{ maxWidth: '960px', marginInline: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
          Digital Public Good
        </span>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>About the Platform</h2>
        <p style={{ maxWidth: '640px', marginInline: 'auto' }}>
          BRICS Citizen Infrastructure Intelligence Platform — A scalable, multilingual AI intelligence layer connecting grassroots citizen needs to public infrastructure planning.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Core Value Proposition Card */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>The Core Challenge</h3>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Citizen infrastructure requests across developing economies are fragmented across call centers, local offices, social media, messaging apps, and paper processes. Consequently, policymakers lack clear visibility into grassroots demand hotspots, struggle to correlate citizen complaints with official demographic and infrastructure census datasets, and cannot systematically verify the before-and-after impact of public capital investments.
          </p>

          <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--accent-cyan)' }}>
              The Common Intelligence Layer
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              <span>Citizen Voice</span>
              <span>→</span>
              <span>AI Understanding</span>
              <span>→</span>
              <span>Data Integration</span>
              <span>→</span>
              <span>Demand Hotspots</span>
              <span>→</span>
              <span>Infrastructure Gaps</span>
              <span>→</span>
              <span>Project Insights</span>
              <span>→</span>
              <span>Impact Measurement</span>
            </div>
          </div>
        </div>

        {/* 10 Core Product Principles (MEMORY.md) */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Key Product Principles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.9rem' }}><strong>Multilingual by Design:</strong> Preserves original native language scripts and voice recordings.</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.9rem' }}><strong>Privacy Preservation:</strong> Individual citizen complaints are never exposed publicly; geographic visualizations use privacy-preserving cluster aggregations.</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.9rem' }}><strong>Explainable AI:</strong> Every score and priority recommendation includes transparent mathematical factors and supporting evidence.</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.9rem' }}><strong>Human-in-the-Loop:</strong> AI outputs are advisory decision support; never automatic public budget disbursement.</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.9rem' }}><strong>Evidence-Driven:</strong> Bottom-up citizen demand is synthesized with top-down official census and asset registries.</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.9rem' }}><strong>Open Architecture:</strong> Built on reusable web technologies (React, FastAPI, OpenStreetMap, Recharts) as a Digital Public Good.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
