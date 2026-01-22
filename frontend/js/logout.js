/**
 * BYOLA Logout Service
 * Handles user logout functionality
 */

class LogoutService {
  /**
   * Logout user
   * @async
   * @returns {Promise<void>}
   */
  static async logout() {
    try {
      const token = authService.getToken();

      // Call logout endpoint if available
      if (token) {
        try {
          await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.LOGOUT}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Logout API error:', error);
          // Continue with local logout even if API call fails
        }
      }

      // Clear local authentication
      authService.clearAuth();

      // Redirect to login or home
      window.location.href = '/index.html';
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even on error
      authService.clearAuth();
      window.location.href = '/index.html';
    }
  }

  /**
   * Initialize logout buttons
   */
  static initLogoutButtons() {
    const logoutButtons = document.querySelectorAll('[data-logout]');
    logoutButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    });

    // Also handle any element with class 'logout-btn'
    const classLogoutButtons = document.querySelectorAll('.logout-btn');
    classLogoutButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    });

    // Handle logout links (common in headers)
    const logoutLinks = document.querySelectorAll('a[href*="logout"]');
    logoutLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  LogoutService.initLogoutButtons();
});
