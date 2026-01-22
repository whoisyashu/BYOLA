/**
 * BYOLA Authentication Service
 * Handles authentication logic and API calls
 */

class AuthService {
  constructor() {
    this.token = this.getToken();
    this.user = this.getUser();
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Response from server
   */
  async login(email, password) {
    try {
      const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }

      const data = await response.json();
      this.setToken(data.token);
      this.setRefreshToken(data.refreshToken);
      this.setUser(data.user);
      this.token = data.token;
      this.user = data.user;
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Response from server
   */
  async register(userData) {
    try {
      const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }

      const data = await response.json();
      this.setToken(data.token);
      this.setRefreshToken(data.refreshToken);
      this.setUser(data.user);
      this.token = data.token;
      this.user = data.user;
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Verify token
   * @returns {Promise<boolean>} Token validity
   */
  async verifyToken() {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.VERIFY_TOKEN}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  /**
   * Get stored token
   * @returns {string|null} JWT token
   */
  getToken() {
    return localStorage.getItem(CONFIG.STORAGE.TOKEN);
  }

  /**
   * Set token in storage
   * @param {string} token - JWT token
   */
  setToken(token) {
    localStorage.setItem(CONFIG.STORAGE.TOKEN, token);
  }

  /**
   * Get refresh token
   * @returns {string|null} Refresh token
   */
  getRefreshToken() {
    return localStorage.getItem(CONFIG.STORAGE.REFRESH_TOKEN);
  }

  /**
   * Set refresh token
   * @param {string} token - Refresh token
   */
  setRefreshToken(token) {
    localStorage.setItem(CONFIG.STORAGE.REFRESH_TOKEN, token);
  }

  /**
   * Get stored user data
   * @returns {Object|null} User object
   */
  getUser() {
    const user = localStorage.getItem(CONFIG.STORAGE.USER);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Set user in storage
   * @param {Object} user - User object
   */
  setUser(user) {
    localStorage.setItem(CONFIG.STORAGE.USER, JSON.stringify(user));
  }

  /**
   * Get user role
   * @returns {string|null} User role
   */
  getRole() {
    const user = this.getUser();
    return user ? user.role : localStorage.getItem(CONFIG.STORAGE.ROLE);
  }

  /**
   * Set user role
   * @param {string} role - User role
   */
  setRole(role) {
    localStorage.setItem(CONFIG.STORAGE.ROLE, role);
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return !!this.getToken() && !!this.getUser();
  }

  /**
   * Clear authentication
   */
  clearAuth() {
    localStorage.removeItem(CONFIG.STORAGE.TOKEN);
    localStorage.removeItem(CONFIG.STORAGE.REFRESH_TOKEN);
    localStorage.removeItem(CONFIG.STORAGE.USER);
    localStorage.removeItem(CONFIG.STORAGE.ROLE);
    this.token = null;
    this.user = null;
  }
}

// Create singleton instance
const authService = new AuthService();
