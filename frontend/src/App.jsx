import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { Home } from './pages/Home';
import { ReportRequest } from './pages/ReportRequest';
import { TrackRequest } from './pages/TrackRequest';
import { PublicProjects } from './pages/PublicProjects';
import { About } from './pages/About';
import { Dashboard } from './pages/government/Dashboard';
import { Requests } from './pages/government/Requests';
import { Hotspots } from './pages/government/Hotspots';
import { InfrastructureGaps } from './pages/government/InfrastructureGaps';
import { Recommendations } from './pages/government/Recommendations';
import { Projects } from './pages/government/Projects';
import { Impact } from './pages/government/Impact';
import { Settings } from './pages/government/Settings';
import { storageService } from './services/storageService';
import { authService } from './services/authService';
import { Building2, ShieldCheck, Lock, ArrowRight, UserCheck } from 'lucide-react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState('citizen'); // 'citizen', 'analyst', 'admin'
  const [currentView, setCurrentView] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [currentLang, setCurrentLang] = useState('gu'); // Default to Gujarati for primary demo
  const [trackedRequestId, setTrackedRequestId] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginTargetRole, setLoginTargetRole] = useState('analyst');
  const [pendingViewAfterLogin, setPendingViewAfterLogin] = useState(null);

  // Initialize storage & auth on mount and configure theme
  useEffect(() => {
    storageService.initStorage();
    document.documentElement.setAttribute('data-theme', theme);
    
    // Check active user session
    const session = authService.getCurrentUser();
    if (session && session.user) {
      setCurrentUser(session.user);
      setCurrentRole(session.user.role);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenLogin = (targetRole = 'analyst', intendedView = null) => {
    setLoginTargetRole(targetRole);
    setPendingViewAfterLogin(intendedView);
    setLoginModalOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setLoginModalOpen(false);

    // Navigate to intended or default government portal
    if (pendingViewAfterLogin) {
      setCurrentView(pendingViewAfterLogin);
      setPendingViewAfterLogin(null);
    } else if (user.role === 'admin') {
      setCurrentView('gov-settings');
    } else {
      setCurrentView('gov-dashboard');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentRole('citizen');
    setCurrentView('home');
  };

  const handleNavigateToTrack = (reqId) => {
    setTrackedRequestId(reqId);
    setCurrentView('track');
  };

  const handleOpenProject = (projectId) => {
    if (!currentUser) {
      handleOpenLogin('analyst', 'gov-projects');
    } else {
      setCurrentRole('analyst');
      setCurrentView('gov-projects');
    }
  };

  // Safe navigation interceptor protecting government views
  const handleProtectedNavigate = (view) => {
    if (view.startsWith('gov-')) {
      if (!currentUser) {
        const requiredRole = view === 'gov-settings' ? 'admin' : 'analyst';
        handleOpenLogin(requiredRole, view);
        return;
      }
      if (view === 'gov-settings' && currentUser.role !== 'admin') {
        alert('Access to Model Settings & Calibration requires Administrator role. Please sign in as Administrator.');
        handleOpenLogin('admin', 'gov-settings');
        return;
      }
    }
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    // Protected route check
    if (currentView.startsWith('gov-') && !currentUser) {
      return (
        <div className="glass-panel" style={{ padding: '60px 32px', textAlign: 'center', maxWidth: '640px', marginInline: 'auto' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginInline: 'auto', marginBottom: '20px', color: 'var(--accent-blue)' }}>
            <Lock size={32} />
          </div>
          <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Restricted Area</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Authentication Required</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.6 }}>
            The Government Planning Dashboard and Intelligence Portals are reserved for authenticated Government Policy Analysts and System Administrators.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => handleOpenLogin('analyst', currentView)} className="btn btn-primary btn-lg" style={{ gap: '8px' }}>
              <ShieldCheck size={18} />
              <span>Sign In as Government Analyst</span>
            </button>
            <button onClick={() => handleOpenLogin('admin', 'gov-settings')} className="btn btn-secondary btn-lg" style={{ gap: '8px' }}>
              <span>Administrator Sign In</span>
            </button>
          </div>
        </div>
      );
    }

    switch (currentView) {
      // Public Views
      case 'home':
        return (
          <Home
            onNavigate={(view) => {
              if (view.startsWith('gov-')) {
                handleProtectedNavigate(view);
              } else {
                setCurrentView(view);
              }
            }}
          />
        );
      case 'report':
        return <ReportRequest onNavigateToTrack={handleNavigateToTrack} />;
      case 'track':
        return <TrackRequest initialRequestId={trackedRequestId} onOpenProject={handleOpenProject} />;
      case 'public-projects':
        return <PublicProjects onNavigate={(view) => setCurrentView(view)} />;
      case 'about':
        return <About />;

      // Government Views (Protected)
      case 'gov-dashboard':
        return <Dashboard onNavigate={handleProtectedNavigate} onOpenProject={handleOpenProject} currentLang={currentLang} />;
      case 'gov-requests':
        return <Requests onNavigate={handleProtectedNavigate} />;
      case 'gov-hotspots':
        return <Hotspots onNavigate={handleProtectedNavigate} />;
      case 'gov-gaps':
        return <InfrastructureGaps onNavigate={handleProtectedNavigate} />;
      case 'gov-recommendations':
        return <Recommendations onNavigate={handleProtectedNavigate} onOpenProject={handleOpenProject} />;
      case 'gov-projects':
        return <Projects onNavigate={handleProtectedNavigate} />;
      case 'gov-impact':
        return <Impact />;
      case 'gov-settings':
        return <Settings />;

      default:
        return <Home onNavigate={(view) => setCurrentView(view)} />;
    }
  };

  return (
    <div className="app-wrapper">
      {/* Navigation Header with Auth State */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={(r) => {
          if (r === 'citizen') {
            setCurrentRole('citizen');
            setCurrentView('home');
          } else {
            handleOpenLogin(r);
          }
        }}
        currentView={currentView}
        setCurrentView={handleProtectedNavigate}
        theme={theme}
        toggleTheme={toggleTheme}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        currentUser={currentUser}
        onOpenLogin={(role) => handleOpenLogin(role, null)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {renderCurrentView()}
        </div>
      </main>

      {/* Login Authentication Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        targetRole={loginTargetRole}
      />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-glass-heavy)', padding: '40px 0 28px 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Building2 size={18} color="var(--accent-cyan)" />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>BRICS Citizen Infrastructure Intelligence Platform</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Multilingual Digital Public Good for Evidence-Based Civic Infrastructure Planning.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <button onClick={() => { setCurrentRole('citizen'); setCurrentView('about'); }} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              Privacy & Ethics
            </button>
            <span>•</span>
            <button onClick={() => { setCurrentRole('citizen'); setCurrentView('public-projects'); }} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              Open Transparency
            </button>
            <span>•</span>
            {currentUser ? (
              <button onClick={() => setCurrentView('gov-dashboard')} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontWeight: 600 }}>
                Analyst Portal ({currentUser.name.split(' ')[0]})
              </button>
            ) : (
              <button onClick={() => handleOpenLogin('analyst', 'gov-dashboard')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                🔒 Policymaker Login
              </button>
            )}
          </div>
        </div>
        <div className="container" style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          © 2026 BRICS Innovation Public Initiative. Open Public Good Architecture.
        </div>
      </footer>
    </div>
  );
}

export default App;
