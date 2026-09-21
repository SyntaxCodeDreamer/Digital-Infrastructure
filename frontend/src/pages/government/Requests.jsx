import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Layers, Sparkles, Volume2 } from 'lucide-react';
import { CATEGORIES, BRICS_LANGUAGES, DISTRICTS_DATA } from '../../services/mockData';
import { RequestDetailModal } from '../../components/RequestDetailModal';
import { api } from '../../services/api';
import { storageService } from '../../services/storageService';

export const Requests = ({ onNavigate }) => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedLang, setSelectedLang] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    loadRequests();
    const unsubscribe = storageService.subscribe(() => {
      loadRequests();
    });
    return unsubscribe;
  }, [search, selectedCategory, selectedUrgency, selectedLang, selectedDistrict]);

  const loadRequests = async () => {
    const list = await api.getRequests({
      search,
      category: selectedCategory,
      urgency: selectedUrgency,
      language: selectedLang
    });

    let filtered = list;
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(r => r.location?.district.toLowerCase() === selectedDistrict.toLowerCase());
    }
    setRequests(filtered);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Type', 'Language', 'Original Text', 'Translated Text', 'Category', 'Urgency', 'District', 'Confidence'];
    const rows = requests.map(r => [
      r.id,
      r.inputType,
      r.language,
      `"${(r.originalText || '').replace(/"/g, '""')}"`,
      `"${(r.translatedText || '').replace(/"/g, '""')}"`,
      r.category,
      r.urgency,
      r.location?.district || '',
      r.confidenceScore || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `brics_citizen_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem' }}>Citizen Requests Intelligence Hub</h2>
          <p style={{ fontSize: '0.9rem' }}>
            Unified stream of verified citizen submissions across voice, text, and messaging channels.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
          <Download size={15} />
          <span>Export Dataset (CSV)</span>
        </button>
      </div>

      {/* Filter Bar (DESIGN.md Section 10) */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) repeat(4, minmax(0, 1fr))', gap: '12px' }} className="requests-filter-grid">
          <style>{`
            @media (max-width: 1024px) {
              .requests-filter-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (max-width: 640px) {
              .requests-filter-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search keyword, ID, village..."
              className="input-control"
              style={{ paddingLeft: '38px' }}
            />
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
          </div>

          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="select-control">
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>

          <select value={selectedUrgency} onChange={(e) => setSelectedUrgency(e.target.value)} className="select-control">
            <option value="all">All Urgencies</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="select-control">
            <option value="all">All Languages</option>
            {BRICS_LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name.split(' ')[0]}</option>)}
          </select>

          <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="select-control">
            <option value="all">All Districts</option>
            {DISTRICTS_DATA.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Channel</th>
              <th>Language</th>
              <th>Original Text</th>
              <th>AI Translation</th>
              <th>District</th>
              <th>Category</th>
              <th>Urgency</th>
              <th>Confidence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
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
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{req.language.toUpperCase()}</span>
                  </td>
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontStyle: req.inputType === 'voice' ? 'italic' : 'normal' }}>
                    {req.originalText}
                  </td>
                  <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {req.translatedText}
                  </td>
                  <td>{req.location?.district}</td>
                  <td>
                    <span className="badge badge-blue">{req.category}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${req.urgency.toLowerCase()}`}>
                      {req.urgency}
                    </span>
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
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No citizen requests match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
