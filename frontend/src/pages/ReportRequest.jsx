import React, { useState } from 'react';
import { 
  Mic, 
  FileText, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  AlertCircle,
  Clock,
  Compass
} from 'lucide-react';
import { CATEGORIES, BRICS_LANGUAGES, DISTRICTS_DATA } from '../services/mockData';
import { AudioRecorder } from '../components/AudioRecorder';
import { api } from '../services/api';
import { detectLanguage, classifyRequest, extractUrgency } from '../services/aiService';

export const ReportRequest = ({ onNavigateToTrack }) => {
  const [inputMode, setInputMode] = useState('voice'); // 'voice' or 'text'
  const [selectedLang, setSelectedLang] = useState('gu');
  const [textInput, setTextInput] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Anand');
  const [subdistrict, setSubdistrict] = useState('Tarapur');
  const [landmark, setLandmark] = useState('Near Tarapur Community Health Centre');
  const [selectedCategory, setSelectedCategory] = useState('auto');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [audioData, setAudioData] = useState(null);

  // Real-time AI Classification Preview
  const activeContent = inputMode === 'voice' ? (audioData?.transcript || textInput) : textInput;
  const detectedLang = detectLanguage(activeContent);
  const liveClassification = classifyRequest(activeContent, selectedCategory);
  const liveUrgency = extractUrgency(activeContent);

  const handleAudioComplete = (data) => {
    setAudioData(data);
    if (data.transcript) {
      setTextInput(data.transcript);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = inputMode === 'voice' ? (audioData?.transcript || textInput || 'Urgent infrastructure repair needed in village approach road.') : textInput;
    if (!content.trim()) {
      alert('Please enter or record your request before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.submitRequest({
        originalText: content,
        language: selectedLang || detectedLang.code,
        inputType: inputMode,
        category: selectedCategory === 'auto' ? liveClassification.category : selectedCategory,
        location: {
          country: 'India',
          state: 'Gujarat',
          district: selectedDistrict,
          subdistrict: subdistrict,
          landmark: landmark
        },
        audioDuration: audioData?.duration || (inputMode === 'voice' ? '0:22' : null),
        audioWaveform: audioData ? [30, 45, 70, 85, 90, 65, 80, 95, 60, 40, 20] : null
      });

      // Simulate step-by-step pipeline resolution
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmittedResult(response);
      }, 1200);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '860px', marginInline: 'auto' }}>
      {!submittedResult ? (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
              Direct Citizen Access
            </span>
            <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Report an Infrastructure Need</h2>
            <p style={{ maxWidth: '540px', marginInline: 'auto' }}>
              Your voice counts. Submissions are processed by AI into demand hotspots and delivered straight to regional infrastructure planning teams.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Input Mode Selector (Voice vs Text) */}
            <div>
              <label className="input-label">Select Input Method</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setInputMode('voice')}
                  className={`btn ${inputMode === 'voice' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ gap: '8px', padding: '14px' }}
                >
                  <Mic size={18} />
                  <span>Voice Recording (Preferred)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={`btn ${inputMode === 'text' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ gap: '8px', padding: '14px' }}
                >
                  <FileText size={18} />
                  <span>Written Text Description</span>
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="input-label">Preferred Citizen Language</label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="select-control"
              >
                {BRICS_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Recording Box */}
            {inputMode === 'voice' ? (
              <div>
                <label className="input-label">Audio Voice Input</label>
                <AudioRecorder
                  selectedLanguage={selectedLang}
                  onRecordingComplete={handleAudioComplete}
                />
              </div>
            ) : (
              <div>
                <label className="input-label">Describe the Infrastructure Issue</label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Describe the issue in your own language (e.g. Broken road, lack of clinic water, power outages)..."
                  rows={4}
                  className="textarea-control"
                />
              </div>
            )}

            {/* Location Fields */}
            <div>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="#06b6d4" />
                <span>Geographic Location</span>
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '12px' }} className="loc-grid">
                <style>{`
                  @media (max-width: 640px) {
                    .loc-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>District</span>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="select-control"
                  >
                    {DISTRICTS_DATA.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.state})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Taluka / Sub-district / Village</span>
                  <input
                    type="text"
                    value={subdistrict}
                    onChange={(e) => setSubdistrict(e.target.value)}
                    placeholder="e.g. Tarapur, Padra, Olpad"
                    className="input-control"
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Landmark or Specific Facility</span>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Community Health Centre, Primary School, Main Canal"
                  className="input-control"
                />
              </div>
            </div>

            {/* Sector Category */}
            <div>
              <label className="input-label">Sector Category (Optional)</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select-control"
              >
                <option value="auto">✨ Auto-Detect with AI Understanding (Recommended)</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Real-Time AI Understanding Feedback Pill */}
            {activeContent && (
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  <Sparkles size={16} />
                  <span>Real-Time AI Understanding Preview</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="badge badge-purple">Detected: {detectedLang.name}</span>
                  <span className="badge badge-blue">Category: {liveClassification.categoryLabel}</span>
                  <span className={`badge badge-${liveUrgency.toLowerCase()}`}>Urgency: {liveUrgency}</span>
                  <span className="badge badge-low">Confidence: {(liveClassification.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '8px' }}
            >
              {isSubmitting ? (
                <span>Ingesting & Processing with AI...</span>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Submit Development Request</span>
                  <ArrowRight size={18} />
                </div>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Post Submission View matching DESIGN Section 4 */
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginInline: 'auto', marginBottom: '20px', color: '#10b981' }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Request Received</h2>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '28px' }}>
            Request ID: {submittedResult.id}
          </div>

          {/* AI Processing Checklist (DESIGN Section 4) */}
          <div style={{ maxWidth: '480px', marginInline: 'auto', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
              AI Processing Resolution
            </div>

            <div className="pipeline-step done">
              <div className="pipeline-step-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Language detected</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {submittedResult.languageName || 'Gujarati (gu)'} (Preserved in original script)
                </div>
              </div>
            </div>

            <div className="pipeline-step done">
              <div className="pipeline-step-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Request understood & normalized</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  "{submittedResult.translatedText.slice(0, 60)}..."
                </div>
              </div>
            </div>

            <div className="pipeline-step done">
              <div className="pipeline-step-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Category & urgency identified</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {submittedResult.category.toUpperCase()} | {submittedResult.urgency} Priority ({(submittedResult.confidenceScore * 100).toFixed(0)}% confidence)
                </div>
              </div>
            </div>

            <div className="pipeline-step done">
              <div className="pipeline-step-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Location processed & clustered</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {submittedResult.location.subdistrict}, {submittedResult.location.district} District Hotspot
                </div>
              </div>
            </div>
          </div>

          {/* Next Actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateToTrack(submittedResult.id)}
              className="btn btn-primary btn-lg"
              style={{ gap: '8px' }}
            >
              <span>Track Request Lifecycle</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => {
                setSubmittedResult(null);
                setTextInput('');
                setAudioData(null);
              }}
              className="btn btn-secondary btn-lg"
            >
              Submit Another Need
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
