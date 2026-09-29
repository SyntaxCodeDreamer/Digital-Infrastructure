import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  ExternalLink,
  User
} from 'lucide-react';
import { INDIAN_LANGUAGES } from '../services/mockData';
import { storageService } from '../services/storageService';
import { translate } from '../services/i18n';

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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [citizenRoleDropdownOpen, setCitizenRoleDropdownOpen] = useState(false);

  const langRef = useRef(null);
  const profileRef = useRef(null);
  const citizenRoleRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (citizenRoleRef.current && !citizenRoleRef.current.contains(event.target)) {
        setCitizenRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const publicNavItems = [
    { id: 'home', label: translate('Home', currentLang) },
    { id: 'report', label: translate('Report a Need', currentLang) },
    { id: 'track', label: translate('Track Request', currentLang) },
    { id: 'public-projects', label: translate('Projects', currentLang) },
    { id: 'about', label: translate('About', currentLang) },
  ];

  const govNavItems = [
    { id: 'gov-dashboard', label: translate('Dashboard', currentLang), icon: BarChart3 },
    { id: 'gov-requests', label: translate('Citizen Requests', currentLang), icon: FileText },
    { id: 'gov-hotspots', label: translate('Demand Hotspots', currentLang), icon: Flame },
    { id: 'gov-gaps', label: translate('Infrastructure Gaps', currentLang), icon: Compass },
    { id: 'gov-recommendations', label: translate('Project Insights', currentLang), icon: Lightbulb },
    { id: 'gov-projects', label: translate('Projects Tracker', currentLang), icon: CheckCircle2 },
    { id: 'gov-impact', label: translate('Impact Analytics', currentLang), icon: TrendingUp },
    { id: 'gov-settings', label: translate('Model & Settings', currentLang), icon: Settings },
  ];

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to official BRICS seed state?')) {
      storageService.resetToDefaults();
      window.location.reload();
    }
  };

  const handleRoleSelect = (targetRole) => {
    setProfileDropdownOpen(false);
    setCitizenRoleDropdownOpen(false);

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
      setCurrentView('gov-dashboard');
    }
  };

  const isGov = currentRole === 'analyst' || currentRole === 'admin';

  return (
    <header className="navbar-sticky">
      {/* Top Header Row */}
      <div className="container nav-container">
        {/* Brand Logo & Portal Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            className="brand-logo" 
            onClick={() => setCurrentView(isGov ? 'gov-dashboard' : 'home')}
          >
            <div className="brand-icon-box">
              <Building2 size={22} />
            </div>
            <div>
              <div className="brand-title">{translate('BRICS Citizen Intel', currentLang)}</div>
              <div className="brand-subtitle">{translate('Digital Public Good', currentLang)}</div>
            </div>
          </div>

          {/* Portal Tag & Switch Link (for Government View) */}
          {isGov && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`portal-badge ${currentRole === 'admin' ? 'admin' : ''}`}>
                {currentRole === 'admin' ? 'Admin Portal' : 'Gov Portal'}
              </span>
              <button 
                onClick={() => {
                  setCurrentRole('citizen');
                  setCurrentView('home');
                }}
                className="public-switch-link"
                title="Switch to Citizen Public Portal"
              >
                <ExternalLink size={12} />
                <span>Citizen Portal</span>
              </button>
            </div>
          )}
        </div>

        {/* Center: Public Links (when Citizen) OR Regional Node Status (when Gov) */}
        {!isGov ? (
          <nav style={{ display: 'none', gap: '4px', alignItems: 'center' }} className="desktop-nav-bar">
            <style>{`
              @media (min-width: 1024px) {
                .desktop-nav-bar { display: flex !important; }
              }
            `}</style>
            {publicNavItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        ) : (
          <div className="node-status-pill">
            <span className="pulse-dot" />
            <span>Regional Node: Gujarat (BRICS Pilot)</span>
          </div>
        )}

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Demo Reset */}
          <button 
            onClick={handleResetData}
            title="Reset data back to seed state"
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 8px', borderRadius: '8px', color: 'var(--text-muted)' }}
          >
            <RotateCcw size={14} />
          </button>

          {/* Language Selector */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px' }}
            >
              <Globe2 size={15} />
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>{currentLang}</span>
            </button>

            {langDropdownOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  width: '220px',
                  padding: '8px',
                  zIndex: 200,
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                  {translate('SELECT LANGUAGE', currentLang)}
                </div>
                {INDIAN_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setLangDropdownOpen(false);
                      const select = document.querySelector('.goog-te-combo');
                      if (select) {
                        select.value = lang.code;
                        select.dispatchEvent(new Event('change', { bubbles: true }));
                      }
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
                    <span style={{ fontSize: '0.82rem' }} className="notranslate">{lang.name}</span>
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

          {/* User Auth & Profile Handling */}
          {isGov && currentUser ? (
            /* Unified Executive Profile Menu */
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="user-profile-pill"
                title={`${currentUser.name} (${currentUser.title})`}
              >
                <div className="user-avatar-circle">
                  {currentUser.avatar || '👤'}
                </div>
                <span className="user-profile-name">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className={`user-role-tag ${currentRole}`}>
                  {currentRole === 'admin' ? 'Admin' : 'Analyst'}
                </span>
                <ChevronDown size={14} style={{ color: 'var(--text-muted)', marginLeft: '2px' }} />
              </button>

              {profileDropdownOpen && (
                <div
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '120%',
                    width: '270px',
                    padding: '12px',
                    zIndex: 210,
                    boxShadow: 'var(--shadow-lg)'
                  }}
                >
                  {/* User Profile Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                      {currentUser.avatar || '👤'}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.title}
                      </div>
                    </div>
                  </div>

                  {/* Switch Portal Section */}
                  <div style={{ padding: '8px 4px 4px 4px' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Switch Portal Role
                    </div>
                    <button
                      onClick={() => handleRoleSelect('citizen')}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '4px', gap: '8px' }}
                    >
                      <UserCheck size={14} color="#3b82f6" />
                      <span>Citizen Public View</span>
                    </button>
                    <button
                      onClick={() => handleRoleSelect('analyst')}
                      className="btn btn-secondary btn-sm"
                      style={{ 
                        width: '100%', 
                        justifyContent: 'flex-start', 
                        marginBottom: '4px', 
                        gap: '8px',
                        background: currentRole === 'analyst' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                        borderColor: currentRole === 'analyst' ? 'rgba(6, 182, 212, 0.3)' : 'transparent'
                      }}
                    >
                      <ShieldCheck size={14} color="#06b6d4" />
                      <span>Gov Analyst {currentRole === 'analyst' ? '✓' : ''}</span>
                    </button>
                    <button
                      onClick={() => handleRoleSelect('admin')}
                      className="btn btn-secondary btn-sm"
                      style={{ 
                        width: '100%', 
                        justifyContent: 'flex-start', 
                        marginBottom: '4px', 
                        gap: '8px',
                        background: currentRole === 'admin' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                        borderColor: currentRole === 'admin' ? 'rgba(168, 85, 247, 0.3)' : 'transparent'
                      }}
                    >
                      <Settings size={14} color="#a855f7" />
                      <span>Administrator {currentRole === 'admin' ? '✓' : ''}</span>
                    </button>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '8px', paddingTop: '8px' }}>
                    <button
                      onClick={onLogout}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'center', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', gap: '6px' }}
                    >
                      <LogOut size={14} />
                      <span>{translate('Sign Out', currentLang)}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Citizen Mode: Gov Sign In Button & Role Switcher */
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div ref={citizenRoleRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setCitizenRoleDropdownOpen(!citizenRoleDropdownOpen)}
                  className="role-badge-selector"
                  style={{ borderColor: 'var(--accent-blue)', color: 'var(--text-primary)' }}
                >
                  <UserCheck size={14} color="#3b82f6" />
                  <span>Citizen</span>
                  <ChevronDown size={12} color="var(--text-muted)" />
                </button>

                {citizenRoleDropdownOpen && (
                  <div 
                    className="glass-panel"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '120%',
                      width: '230px',
                      padding: '8px',
                      zIndex: 200,
                      boxShadow: 'var(--shadow-lg)'
                    }}
                  >
                    <div style={{ padding: '6px 10px', fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                      PORTAL ACCESS
                    </div>
                    <button
                      onClick={() => handleRoleSelect('citizen')}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '4px', gap: '8px' }}
                    >
                      <UserCheck size={14} color="#3b82f6" />
                      <span>Citizen (Public)</span>
                    </button>
                    <button
                      onClick={() => handleRoleSelect('analyst')}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '4px', gap: '8px' }}
                    >
                      <ShieldCheck size={14} color="#06b6d4" />
                      <span>Gov Analyst 🔒</span>
                    </button>
                    <button
                      onClick={() => handleRoleSelect('admin')}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', gap: '8px' }}
                    >
                      <Settings size={14} color="#a855f7" />
                      <span>Administrator 🔒</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => onOpenLogin('analyst')}
                className="btn btn-primary btn-sm"
                style={{ gap: '6px', padding: '6px 12px', fontSize: '0.825rem' }}
              >
                <LogIn size={14} />
                <span>Gov Sign In</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
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

      {/* Tier 2: Dedicated Government Sub-Navigation Bar */}
      {isGov && (
        <div className="gov-subnav-bar">
          <div className="container gov-subnav-container">
            <nav className="gov-tabs-scroll">
              {govNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`gov-nav-tab ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '16px 20px',
            background: 'var(--bg-glass-heavy)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(isGov ? govNavItems : publicNavItems).map((item) => {
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
                  <span>{item.label}</span>
                </button>
              );
            })}

            {isGov && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => {
                    handleRoleSelect('citizen');
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', gap: '8px' }}
                >
                  <UserCheck size={14} color="#3b82f6" />
                  <span>Switch to Public Portal</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start', gap: '8px', color: '#ef4444' }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
