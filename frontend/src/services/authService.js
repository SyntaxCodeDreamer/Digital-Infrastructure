// Authentication Service for BRICS Citizen Infrastructure Intelligence Platform

const AUTH_STORAGE_KEY = 'brics_auth_session_v1';

export const DEMO_ACCOUNTS = [
  {
    email: 'analyst@brics.gov',
    password: 'analyst123',
    role: 'analyst',
    name: 'Dr. Rajesh Verma',
    title: 'Senior Infrastructure Planning Analyst',
    department: 'Gujarat State Infrastructure Planning Board',
    country: 'India',
    avatar: '👨‍💼'
  },
  {
    email: 'admin@brics.gov',
    password: 'admin123',
    role: 'admin',
    name: 'Elena Rostova',
    title: 'Chief Model Governance & Systems Architect',
    department: 'BRICS Digital Public Infrastructure Authority',
    country: 'BRICS Secretariat',
    avatar: '👩‍💻'
  }
];

export const authService = {
  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!authService.getCurrentUser();
  },

  login: async (email, password, roleHint = 'analyst') => {
    // Check against demo accounts
    const cleanEmail = (email || '').trim().toLowerCase();
    const account = DEMO_ACCOUNTS.find(acc => 
      acc.email.toLowerCase() === cleanEmail && acc.password === password
    );

    if (account) {
      const sessionData = {
        token: `jwt_brics_token_${Date.now()}`,
        user: {
          email: account.email,
          role: account.role,
          name: account.name,
          title: account.title,
          department: account.department,
          country: account.country,
          avatar: account.avatar
        },
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      return { success: true, session: sessionData };
    }

    // Allow flexible test credentials if they match role pattern
    if (password === 'admin123' && (cleanEmail.includes('admin') || roleHint === 'admin')) {
      const sessionData = {
        token: `jwt_brics_token_${Date.now()}`,
        user: {
          email: cleanEmail || 'admin@brics.gov',
          role: 'admin',
          name: 'System Administrator',
          title: 'System & Model Administrator',
          department: 'BRICS Digital Public Infrastructure Authority',
          country: 'BRICS Secretariat',
          avatar: '👩‍💻'
        },
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      return { success: true, session: sessionData };
    }

    if (password === 'analyst123' || (cleanEmail.includes('analyst') && password.length >= 6)) {
      const sessionData = {
        token: `jwt_brics_token_${Date.now()}`,
        user: {
          email: cleanEmail || 'analyst@brics.gov',
          role: 'analyst',
          name: 'Government Analyst',
          title: 'Public Infrastructure Analyst',
          department: 'State Infrastructure Planning Board',
          country: 'India',
          avatar: '👨‍💼'
        },
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      return { success: true, session: sessionData };
    }

    return { 
      success: false, 
      error: 'Invalid credentials. Use demo accounts (analyst@brics.gov / analyst123 or admin@brics.gov / admin123)' 
    };
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};
