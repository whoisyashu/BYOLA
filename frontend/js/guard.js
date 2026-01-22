/**
 * BYOLA Route Guard
 * Protects routes based on authentication and role
 */

class RouteGuard {
  /**
   * Check if user is authenticated and redirect if not
   */
  static requireAuth() {
    if (!authService.isAuthenticated()) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/login.html?return=${returnUrl}`;
      return false;
    }
    return true;
  }

  /**
   * Check if user has specific role and redirect if not
   * @param {string|Array} requiredRoles - Role(s) required to access
   */
  static requireRole(requiredRoles) {
    if (!authService.isAuthenticated()) {
      window.location.href = '/login.html';
      return false;
    }

    const userRole = authService.getRole();
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    if (!roles.includes(userRole)) {
      // User doesn't have required role, redirect to appropriate dashboard
      this.redirectToDashboard(userRole);
      return false;
    }
    return true;
  }

  /**
   * Redirect user to their role-specific dashboard
   * @param {string} role - User role
   */
  static redirectToDashboard(role) {
    const dashboards = CONFIG.DASHBOARDS;
    const dashboard = dashboards[role.toUpperCase()] || '/index.html';
    window.location.href = dashboard;
  }

  /**
   * Redirect authenticated users away from auth pages
   */
  static requireGuest() {
    if (authService.isAuthenticated()) {
      const userRole = authService.getRole();
      this.redirectToDashboard(userRole);
      return false;
    }
    return true;
  }

  /**
   * Initialize route guard (call on page load)
   */
  static init() {
    const currentPath = window.location.pathname;

    // Protected routes - require authentication
    const protectedRoutes = [
      '/dashboard/user.html',
      '/dashboard/lawyer.html',
      '/dashboard/admin.html',
    ];

    // Guest only routes - redirect if authenticated
    const guestRoutes = ['/login.html', '/register.html'];

    // Check protected routes
    if (protectedRoutes.some(route => currentPath.includes(route))) {
      this.requireAuth();
    }

    // Check guest routes
    if (guestRoutes.some(route => currentPath.includes(route))) {
      this.requireGuest();
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  RouteGuard.init();
});
