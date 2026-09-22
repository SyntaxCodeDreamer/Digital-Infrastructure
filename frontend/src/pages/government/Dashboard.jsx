import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  FileText, 
  Flame, 
  Compass, 
  Lightbulb, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Eye, 
  Sparkles,
  Layers
} from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { HotspotMap } from '../../components/HotspotMap';
import { PriorityInsightCard } from '../../components/PriorityInsightCard';
import { RequestDetailModal } from '../../components/RequestDetailModal';
import { CATEGORIES } from '../../services/mockData';
import { api } from '../../services/api';
import { storageService } from '../../services/storageService';
import { translate } from '../../services/i18n';

export const Dashboard = ({ onNavigate, onOpenProject, currentLang = 'en' }) => {
  const [summary, setSummary] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [insights, setInsights] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    loadDashboardData();
    const unsubscribe = storageService.subscribe(() => {
      loadDashboardData();
    });
    return unsubscribe;
  }, []);

  const loadDashboardData = async () => {
    const sum = await api.getDashboardSummary();
    const hots = await api.getHotspots();
    const dists = storageService.getDistricts();
    const ins = await api.getRecommendations();
    const reqs = await api.getRequests();

    setSummary(sum);
    setHotspots(hots);
    setDistricts(dists);
    setInsights(ins);
    setRecentRequests(reqs.slice(0, 6));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Top Welcome & Notification Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-blue">{translate('Executive Intelligence Hub', currentLang)}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{translate('Regional Node: Western India (BRICS Pilot)', currentLang)}</span>
          </div>
          <h2 style={{ fontSize: '1.85rem' }}>{translate('Government Planning Dashboard', currentLang)}</h2>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => onNavigate('gov-recommendations')} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
            <Sparkles size={16} />
            <span>{translate('Review AI Project Insights', currentLang)} ({insights.length})</span>
          </button>
        </div>
      </div>

      {/* Top 5 KPI Cards (DESIGN.md Section 5) */}
      <div className="grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <StatCard
          title={translate('Total Citizen Requests', currentLang)}
          value={summary?.totalRequests || 184}
          trend="+14% this month"
          subtitle="96% classified with high confidence"
          icon={FileText}
          color="#3b82f6"
          onClick={() => onNavigate('gov-requests')}
        />
        <StatCard
          title={translate('Active Demand Hotspots', currentLang)}
          value={summary?.activeHotspots || 5}
          trend="1 Critical Alert"
          subtitle="Anand South Rural Corridor highest"
          icon={Flame}
          color="#ef4444"
          onClick={() => onNavigate('gov-hotspots')}
        />
        <StatCard
          title={translate('Infrastructure Gaps', currentLang)}
          value={summary?.infrastructureGapsIdentified || 14}
          trend="82% Peak Deficit"
          subtitle="Road & Healthcare connectivity"
          icon={Compass}
          color="#f97316"
          onClick={() => onNavigate('gov-gaps')}
        />
        <StatCard
          title={translate('Active Projects Funded', currentLang)}
          value={summary?.projectsTracked || 4}
          trend="$10.3M Allocated"
          subtitle="1 Completed, 2 In Progress"
          icon={CheckCircle2}
          color="#10b981"
          onClick={() => onNavigate('gov-projects')}
        />
        <StatCard
          title={translate('Population Impacted', currentLang)}
          value={summary ? `${(summary.populationImpacted / 1000).toFixed(0)}k+` : '242k+'}
          trend="+46k this quarter"
          subtitle="Verified by post-project census"
          icon={Users}
          color="#06b6d4"
          onClick={() => onNavigate('gov-impact')}
        />
      </div>

      {/* Main Content Row 1: Interactive Hotspot Map */}
      <div>
        <HotspotMap
          hotspots={hotspots}
          districts={districts}
          onSelectHotspot={(h) => onNavigate('gov-hotspots')}
        />
      </div>

      {/* Main Content Row 2: Category Distribution & AI Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '24px' }} className="dash-row-grid">
        <style>{`
          @media (max-width: 1024px) {
            .dash-row-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Priority AI Project Insights Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lightbulb size={20} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.25rem' }}>{translate('Top AI-Generated Project Insights', currentLang)}</h3>
            </div>
            <button onClick={() => onNavigate('gov-recommendations')} className="btn btn-secondary btn-sm">
              {translate('View All', currentLang)} ({insights.length})
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {insights.slice(0, 2).map((ins) => (
              <PriorityInsightCard
                key={ins.id}
                insight={ins}
                onOpenProject={onOpenProject}
              />
            ))}
          </div>
        </div>

        {/* Category Breakdown & Distribution */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{translate('Citizen Demand by Sector', currentLang)}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cross-BRICS Classification</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {CATEGORIES.slice(0, 6).map((cat) => {
                const count = cat.id === 'healthcare' ? 38 : cat.id === 'roads' ? 32 : cat.id === 'water' ? 24 : cat.id === 'electricity' ? 16 : 10;
                return (
                  <div key={cat.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cat.label}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{count}% of requests</span>
                    </div>
                    <div style={{ height: '8px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${count}%`,
                          background: cat.color,
                          borderRadius: '4px',
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
            💡 <strong>Cross-Sector Correlation:</strong> 74% of rural healthcare complaints cite poor road connectivity as the primary factor preventing ambulance access.
          </div>
        </div>
      </div>

      {/* Main Content Row 3: Recent Citizen Requests Stream */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>{translate('Recent Ingested Requests', currentLang)}</h3>
            <p style={{ fontSize: '0.85rem' }}>Multilingual submissions processed by speech & translation services</p>
          </div>
          <button onClick={() => onNavigate('gov-requests')} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            <span>{translate('View Full Requests Hub', currentLang)}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Channel</th>
                <th>Language</th>
                <th>Translated Summary</th>
                <th>District</th>
                <th>Category</th>
                <th>Urgency</th>
                <th>Confidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {req.id}
                  </td>
                  <td>
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                      {req.inputType === 'voice' ? '🎙️ Voice' : '✍️ Text'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem' }}>
                      {req.language.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {req.translatedText}
                  </td>
                  <td>{req.location?.district}</td>
                  <td>
                    <span className="badge badge-blue">{req.category}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${req.urgency.toLowerCase()}`}>{req.urgency}</span>
                  </td>
                  <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    {((req.confidenceScore || 0.95) * 100).toFixed(0)}%
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px' }}
                      title="Inspect AI extraction"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Inspection Modal */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onTrackClick={(id) => onNavigate('track')}
        />
      )}
    </div>
  );
};
