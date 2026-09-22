import React, { useState } from 'react';
import { 
  Building2, 
  Globe2, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  BarChart3, 
  Flame, 
  Lightbulb, 
  CheckCircle2, 
  TrendingUp, 
  Settings, 
  Compass, 
  RotateCcw,
  LogIn,
  LogOut,
  User
} from 'lucide-react';
import { INDIAN_LANGUAGES } from '../services/mockData';
import { storageService } from '../services/storageService';

export const Navbar = ({ 
  currentRole, 
  setCurrentRole, 
  currentView, 
  setCurrentView, 
  theme, 
  toggleTheme,
  currentLang,
  setCurrentLang,
  currentUser,
  onOpenLogin,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const publicNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'report', label: 'Report a Need' },
    { id: 'track', label: 'Track Request' },
    { id: 'public-projects', label: 'Projects' },
    { id: 'about', label: 'About' },
  ];

  const govNavItems = [
    { id: 'gov-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'gov-requests', label: 'Citizen Requests', icon: FileText },
    { id: 'gov-hotspots', label: 'Demand Hotspots', icon: Flame },
    { id: 'gov-gaps', label: 'Infrastructure Gaps', icon: Compass },
    { id: 'gov-recommendations', label: 'Project Insights', icon: Lightbulb },
    { id: 'gov-projects', label: 'Projects Tracker', icon: CheckCircle2 },
    { id: 'gov-impact', label: 'Impact Analytics', icon: TrendingUp },
    { id: 'gov-settings', label: 'Model & Settings', icon: Settings },
  ];

  const navItems = currentRole === 'citizen' ? publicNavItems : govNavItems;

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to official BRICS seed state?')) {
      storageService.resetToDefaults();
      window.location.reload();
    }
  };

  const handleRoleSelect = (targetRole) => {
    setRoleDropdownOpen(false);
    if (targetRole === 'citizen') {
      setCurrentRole('citizen');
      setCurrentView('home');
      return;
    }

    // If target is analyst or admin, check authentication
    if (!currentUser || currentUser.role !== targetRole) {
      onOpenLogin(targetRole);
    } else {
      setCurrentRole(targetRole);
      setCurrentView(targetRole === 'admin' ? 'gov-settings' : 'gov-dashboard');
    }
  };

  return (
    <header className="navbar-sticky">
      <div className="container nav-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => setCurrentView(currentRole === 'citizen' ? 'home' : 'gov-dashboard')}>
          <div className="brand-icon-box">
            <Building2 size={24} />
          </div>
          <div>
            <div className="brand-title">BRICS Citizen Intel</div>
            <div className="brand-subtitle">Digital Public Good</div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', gap: '4px', alignItems: 'center' }} className="desktop-nav-bar">
          <style>{`
            @media (min-width: 1024px) {
              .desktop-nav-bar { display: flex !important; }
            }
          `}</style>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {Icon && <Icon size={16} />}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Controls: Role Switcher, Auth Profile, Language, Theme */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Demo Reset */}
          <button 
            onClick={handleResetData}
            title="Reset to seed data (PRD Gujarati scenario)"
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 8px', borderRadius: '8px', color: 'var(--text-muted)' }}
          >
            <RotateCcw size={14} />
          </button>

          {/* Role Switcher Pill */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="role-badge-selector"
              style={{
                borderColor: currentRole === 'citizen' ? 'var(--accent-blue)' : currentRole === 'analyst' ? 'var(--accent-cyan)' : 'var(--accent-purple)',
                color: 'var(--text-primary)'
              }}
            >
              {currentRole === 'citizen' ? (
                <UserCheck size={14} color="#3b82f6" />
              ) : currentRole === 'analyst' ? (
                <ShieldCheck size={14} color="#06b6d4" />
              ) : (
                <Settings size={14} color="#a855f7" />
              )}
              <span>{currentRole === 'citizen' ? 'Citizen' : currentRole === 'analyst' ? 'Gov Analyst' : 'Admin'}</span>
            </button>

            {roleDropdownOpen && (
              <div 
                className="glass-panel"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '240px',
                  padding: '8px',
                  zIndex: 200,
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                  PORTAL ACCESS ROLE
                </div>

                <button
                  onClick={() => handleRoleSelect('citizen')}
                  className={`btn btn-secondary btn-sm`}
                  style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '4px' }}
                >
                  <UserCheck size={14} color="#3b82f6" />
                  <span>Citizen (Public Portal)</span>
                </button>

                <button
                  onClick={() => handleRoleSelect('analyst')}
                  className={`btn btn-secondary btn-sm`}
                  style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '4px' }}
                >
                  <ShieldCheck size={14} color="#06b6d4" />
                  <span>Government Analyst {currentUser?.role === 'analyst' ? '(Signed In)' : '🔒 Sign In'}</span>
                </button>

                <button
                  onClick={() => handleRoleSelect('admin')}
                  className={`btn btn-secondary btn-sm`}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  <Settings size={14} color="#a855f7" />
                  <span>Administrator {currentUser?.role === 'admin' ? '(Signed In)' : '🔒 Sign In'}</span>
                </button>
              </div>
            )}
          </div>

          {/* User Profile or Sign In Button */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-secondary)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem'
                }}
                title={`${currentUser.name} (${currentUser.title})`}
              >
                <span>{currentUser.avatar || '👤'}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', maxWidth: '110px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="btn btn-secondary btn-sm"
                style={{ padding: '6px 10px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                title="Sign Out"
              >
                <LogOut size={14} />
                <span style={{ fontSize: '0.78rem' }}>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenLogin('analyst')}
              className="btn btn-primary btn-sm"
              style={{ gap: '6px', padding: '6px 12px', fontSize: '0.825rem' }}
            >
              <LogIn size={14} />
              <span>Gov Sign In</span>
            </button>
          )}

          {/* Language Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px' }}
            >
              <Globe2 size={15} />
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>{currentLang}</span>
            </button>

            {langDropdownOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '220px',
                  padding: '8px',
                  zIndex: 200,
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                  SELECT LANGUAGE
                </div>
                {INDIAN_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      marginBottom: '3px',
                      background: currentLang === lang.code ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      borderColor: currentLang === lang.code ? 'var(--border-bright)' : 'transparent'
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span style={{ fontSize: '0.82rem' }}>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 10px' }}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#3b82f6" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-sm mobile-menu-btn"
            style={{ display: 'none', padding: '6px 10px' }}
          >
            <style>{`
              @media (max-width: 1023px) {
                .mobile-menu-btn { display: inline-flex !important; }
              }
            `}</style>
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '16px 24px',
            background: 'var(--bg-glass-heavy)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-link-btn ${isActive ? 'active' : ''}`}
                  style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}
                >
                  {Icon && <Icon size={18} />}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
