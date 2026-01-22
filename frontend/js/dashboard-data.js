// Dashboard data loader
class DashboardData {
  static async apiFetch(endpoint, options = {}) {
    const token = authService.getToken();
    if (!token) throw new Error('Missing auth token');

    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${CONFIG.API.BASE_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${res.status} ${res.statusText} ${text}`);
    }
    return res.json();
  }

  static async getUserProfile() {
    const data = await this.apiFetch(CONFIG.API.ENDPOINTS.USER_PROFILE);
    return data.user;
  }

  static async getLawyerProfile() {
    const data = await this.apiFetch(CONFIG.API.ENDPOINTS.LAWYER_PROFILE);
    return data.profile;
  }

  static async getPendingLawyers() {
    const data = await this.apiFetch(CONFIG.API.ENDPOINTS.ADMIN_PENDING_LAWYERS);
    return data;
  }

  static setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? '—';
  }

  static formatDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '—' : date.toLocaleDateString();
  }

  static async populateUserDashboard() {
    try {
      const user = await this.getUserProfile();
      this.setText('user-name', user?.name);
      this.setText('user-email', user?.email);
      this.setText('user-role', user?.role);
      this.setText('user-member-since', this.formatDate(user?.createdAt));
    } catch (err) {
      console.error('Failed to load user dashboard data:', err);
    }
  }

  static async populateLawyerDashboard() {
    try {
      const [user, profile] = await Promise.all([
        this.getUserProfile(),
        this.getLawyerProfile(),
      ]);

      this.setText('lawyer-name', user?.name);
      this.setText('lawyer-email', user?.email);
      this.setText('lawyer-role', user?.role);
      this.setText('lawyer-member-since', this.formatDate(user?.createdAt));
      this.setText('lawyer-license', profile?.barCouncilId || 'Not provided');
      this.setText('lawyer-practice', (profile?.specialization || []).join(', ') || 'Not provided');

      const status = profile?.onboardingStatus || 'pending';
      this.setText('lawyer-status', status.charAt(0).toUpperCase() + status.slice(1));

      const statusBadge = document.getElementById('lawyer-status-badge');
      if (statusBadge) {
        statusBadge.textContent = status === 'pending' ? 'Pending Review' : status.charAt(0).toUpperCase() + status.slice(1);
        statusBadge.classList.remove('status-badge--pending', 'status-badge--rejected', 'status-badge--approved');
        if (status === 'approved') statusBadge.classList.add('status-badge--approved');
        else if (status === 'rejected') statusBadge.classList.add('status-badge--rejected');
        else statusBadge.classList.add('status-badge--pending');
      }

      const rejection = profile?.rejectionReason;
      this.setText('lawyer-rejection', rejection || 'No rejection reason');

      const rejectionCard = document.querySelector('.rejection-card');
      if (rejectionCard) rejectionCard.style.display = status === 'rejected' ? 'block' : 'none';
    } catch (err) {
      console.error('Failed to load lawyer dashboard data:', err);
    }
  }

  static renderPendingLawyers(listEl, lawyers) {
    if (!listEl) return;
    if (!lawyers || lawyers.length === 0) {
      listEl.innerHTML = '<p>No pending applications.</p>';
      return;
    }
    listEl.innerHTML = lawyers
      .map((lawyer) => {
        const user = lawyer.userId || {};
        return `<div class="application-item">
          <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
          <p><strong>Email:</strong> ${user.email || 'N/A'}</p>
          <p><strong>Bar Council ID:</strong> ${lawyer.barCouncilId || 'N/A'}</p>
          <p><strong>Status:</strong> ${lawyer.onboardingStatus || 'pending'}</p>
        </div>`;
      })
      .join('');
  }

  static async populateAdminDashboard() {
    try {
      const data = await this.getPendingLawyers();
      const count = data?.count ?? 0;
      this.setText('admin-pending-count', `${count} Applications`);
      this.setText('pending-reviews-count', count);
      this.renderPendingLawyers(document.getElementById('pending-list'), data?.lawyers || []);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    }
  }
}
