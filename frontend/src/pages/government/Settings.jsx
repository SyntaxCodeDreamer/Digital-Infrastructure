import React, { useState, useEffect } from 'react';
import { Sliders, Database, ShieldCheck, History, Save, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { api } from '../../services/api';

export const Settings = () => {
  const [weights, setWeights] = useState(storageService.getWeights());
  const [auditLogs, setAuditLogs] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const logs = await api.getAuditLogs();
    setAuditLogs(logs);
  };

  const handleWeightChange = (key, value) => {
    setWeights(prev => ({
      ...prev,
      [key]: parseInt(value, 10) || 0
    }));
  };

  const totalWeight = weights.demandVolume + weights.urgencySeverity + weights.populationAffected + weights.infrastructureGap + weights.lackOfInvestment;

  const handleSaveWeights = () => {
    storageService.setWeights(weights);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
    loadLogs();
  };

  const handleResetWeights = () => {
    const defaultWeights = {
      demandVolume: 25,
      urgencySeverity: 25,
      populationAffected: 20,
      infrastructureGap: 20,
      lackOfInvestment: 10
    };
    setWeights(defaultWeights);
    storageService.setWeights(defaultWeights);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
    loadLogs();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Sliders size={20} color="var(--accent-purple)" />
          <span className="badge badge-purple">Administrative Governance & Audit</span>
        </div>
        <h2 style={{ fontSize: '1.85rem' }}>Decision Model Calibration & Data Ingestion</h2>
        <p style={{ fontSize: '0.9rem' }}>
          Transparent, auditable weighting formula for multi-criteria project prioritization.
        </p>
      </div>

      {saveSuccess && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '14px 20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399' }}>
          <CheckCircle2 size={18} />
          <span>Priority weights updated and logged to audit trail. All project recommendations recalculated.</span>
        </div>
      )}

      {/* Priority Weights Sliders (PRD Section 8) */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Decision-Support Weight Parameters</h3>
            <p style={{ fontSize: '0.85rem' }}>
              Adjust relative weights considered when prioritizing capital infrastructure projects.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: totalWeight === 100 ? '#10b981' : '#ef4444' }}>
              Total Weight: {totalWeight}%
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          {/* Slider 1 */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Citizen Demand Volume</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-blue)' }}>{weights.demandVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.demandVolume}
              onChange={(e) => handleWeightChange('demandVolume', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-blue)' }}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Raw volume and growth velocity of complaints</span>
          </div>

          {/* Slider 2 */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Urgency & Life Safety</span>
              <span style={{ fontWeight: 800, color: '#ef4444' }}>{weights.urgencySeverity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.urgencySeverity}
              onChange={(e) => handleWeightChange('urgencySeverity', e.target.value)}
              style={{ width: '100%', accentColor: '#ef4444' }}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Hazard level (e.g. emergency hospital blockage)</span>
          </div>

          {/* Slider 3 */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Vulnerable Population Size</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>{weights.populationAffected}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.populationAffected}
              onChange={(e) => handleWeightChange('populationAffected', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Catchment population benefited by resolution</span>
          </div>

          {/* Slider 4 */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Official Infrastructure Gap</span>
              <span style={{ fontWeight: 800, color: '#f59e0b' }}>{weights.infrastructureGap}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.infrastructureGap}
              onChange={(e) => handleWeightChange('infrastructureGap', e.target.value)}
              style={{ width: '100%', accentColor: '#f59e0b' }}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Deficit against national service benchmarks</span>
          </div>

          {/* Slider 5 */}
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Lack of Existing Investment</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-purple)' }}>{weights.lackOfInvestment}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.lackOfInvestment}
              onChange={(e) => handleWeightChange('lackOfInvestment', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Prioritizes historically overlooked districts</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={handleResetWeights} className="btn btn-secondary">
            <RotateCcw size={16} />
            <span>Reset to Standard</span>
          </button>
          <button onClick={handleSaveWeights} className="btn btn-primary">
            <Save size={16} />
            <span>Apply Weight Calibration</span>
          </button>
        </div>
      </div>

      {/* External Dataset Ingestion Pipeline Status */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Database size={20} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1.25rem' }}>External Public Datasets Ingestion</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>National Census & Demographics</span>
              <span className="badge badge-low" style={{ fontSize: '0.68rem' }}>Live Connected</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Registrar General & Census Commissioner</span>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '8px', fontWeight: 600 }}>
              ✓ 6 Districts Sync Active (Pop, Rural %, Poverty)
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Public Works Road & Bridge Asset GIS</span>
              <span className="badge badge-low" style={{ fontSize: '0.68rem' }}>Live Connected</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: State Roads & Building Department</span>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '8px', fontWeight: 600 }}>
              ✓ 14,800 km Paved Road Inventory Synced
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Municipal Capital Budgets (FY 2026)</span>
              <span className="badge badge-low" style={{ fontSize: '0.68rem' }}>Live Connected</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Finance Dept Public Expenditure Portal</span>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '8px', fontWeight: 600 }}>
              ✓ $42M Municipal Tenders Monitored
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Trail (PRD Section 5 & RULES Section 5) */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <History size={20} color="var(--accent-blue)" />
          <h3 style={{ fontSize: '1.25rem' }}>System & AI Ingestion Audit Trail</h3>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>Actor / Agent</th>
                <th>Logged Event Action</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>{log.id}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(log.timestamp).toLocaleString()}</td>
                  <td style={{ fontWeight: 600, fontSize: '0.82rem' }}>{log.actor}</td>
                  <td style={{ fontSize: '0.85rem' }}>{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
