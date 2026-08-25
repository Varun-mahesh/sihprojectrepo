const API_BASE = 'http://127.0.0.1:5000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Auth
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  verifyOtp: (payload) => request('/auth/verify-otp', { method: 'POST', body: JSON.stringify(payload) }),
  getCurrentUser: () => request('/auth/me'),

  // Services
  getServices: (q = '', category = '') => {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (category) params.append('category', category);
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return request(`/services${queryStr}`);
  },
  getServiceById: (id) => request(`/services/${id}`),
  getCategories: () => request('/services/categories'),

  // Applications
  getApplications: (userId) => {
    const queryStr = userId ? `?user_id=${userId}` : '';
    return request(`/applications${queryStr}`);
  },
  getApplicationById: (id) => request(`/applications/${id}`),
  submitApplication: (payload) => request('/applications', { method: 'POST', body: JSON.stringify(payload) }),
  trackApplication: (trackingId) => request(`/applications/track/${trackingId}`),

  // Integrations & Interoperability
  getIntegrations: () => request('/integrations'),
  testIntegration: (adapterKey) => request(`/integrations/test/${adapterKey}`, { method: 'POST' }),

  // Admin & Monitoring
  getAdminMetrics: () => request('/admin/metrics'),
  getApiLogs: (limit = 50) => request(`/admin/logs?limit=${limit}`),
  toggleIntegrationStatus: (id, status) => request(`/admin/integrations/${id}/toggle`, { method: 'POST', body: JSON.stringify({ status }) }),

  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationRead: (id) => request(`/notifications/${id}/read`, { method: 'POST' })
};
