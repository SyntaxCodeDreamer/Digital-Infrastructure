import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertCircle, X, CheckCircle2, UserCheck, Settings, KeyRound } from 'lucide-react';
import { authService, DEMO_ACCOUNTS } from '../services/authService';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess, targetRole = 'analyst' }) => {
  const [selectedRole, setSelectedRole] = useState(targetRole || 'analyst');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickFill = (role) => {
    const acc = DEMO_ACCOUNTS.find(a => a.role === role);
    if (acc) {
      setSelectedRole(role);
      setEmail(acc.email);
      setPassword(acc.password);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await authService.login(email, password, selectedRole);
      setLoading(false);

      if (res.success) {
        if (onLoginSuccess) {
          onLoginSuccess(res.session.user);
        }
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoading(false);
      setError('An error occurred during authentication.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: '36px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                Restricted Government Portal
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Sign In to Platform</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Government Policy Analysts & System Administrators
            </p>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px' }} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Role Tab Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '20px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('analyst');
              if (email.includes('admin')) setEmail('analyst@brics.gov');
            }}
            className={`btn btn-sm ${selectedRole === 'analyst' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', fontSize: '0.825rem' }}
          >
            <ShieldCheck size={14} />
            <span>Gov Analyst</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('admin');
              if (email.includes('analyst')) setEmail('admin@brics.gov');
            }}
            className={`btn btn-sm ${selectedRole === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ border: 'none', fontSize: '0.825rem' }}
          >
            <Settings size={14} />
            <span>Administrator</span>
          </button>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div style={{ marginBottom: '20px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid var(--border-bright)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <KeyRound size={14} />
            <span>Click to Auto-fill Demo Credentials:</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleQuickFill('analyst')}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                color: 'var(--accent-blue)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              👨‍💼 Gov Analyst (Dr. Verma)
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                color: 'var(--accent-purple)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              👩‍💻 Admin (Elena Rostova)
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', padding: '10px 14px', color: '#f87171', fontSize: '0.825rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="input-label">Official Government Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'admin' ? 'admin@brics.gov' : 'analyst@brics.gov'}
                className="input-control"
                style={{ paddingLeft: '38px' }}
                required
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
            </div>
          </div>

          <div>
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-control"
                style={{ paddingLeft: '38px' }}
                required
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Standard demo password: <code>analyst123</code> or <code>admin123</code>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '8px' }}
          >
            {loading ? 'Authenticating...' : `Sign In as ${selectedRole === 'admin' ? 'System Administrator' : 'Government Analyst'}`}
          </button>
        </form>

        {/* Compliance Footer */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
          🔒 Authorized personnel only. Every login attempt is registered to the immutable system audit trail.
        </div>
      </div>
    </div>
  );
};
