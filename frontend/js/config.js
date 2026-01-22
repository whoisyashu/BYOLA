/**
 * BYOLA Frontend Configuration
 * Centralized configuration for API endpoints and app settings
 */

const CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'http://localhost:5000/api',
    ENDPOINTS: {
      AUTH: '/auth',
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      VERIFY_TOKEN: '/auth/verify',
      USER_PROFILE: '/users/me',
      LAWYER_PROFILE: '/lawyers/profile',
      ADMIN_DASHBOARD: '/admin/dashboard',
      ADMIN_PENDING_LAWYERS: '/admin/lawyers/pending',
      LAWYERS_LIST: '/lawyers',
      LAWYER_ONBOARDING: '/lawyers/onboard',
    },
  },

  // Local Storage Keys
  STORAGE: {
    TOKEN: 'byola_token',
    REFRESH_TOKEN: 'byola_refresh_token',
    USER: 'byola_user',
    ROLE: 'byola_role',
  },

  // User Roles
  ROLES: {
    USER: 'user',
    LAWYER: 'lawyer',
    ADMIN: 'admin',
  },

  // Dashboard Routes
  DASHBOARDS: {
    USER: '/dashboard/user.html',
    LAWYER: '/dashboard/lawyer.html',
    ADMIN: '/dashboard/admin.html',
  },

  // Application Settings
  APP: {
    NAME: 'BYOLA',
    VERSION: '1.0.0',
    TITLE: 'Be Your Own Legal Advisor',
  },
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
