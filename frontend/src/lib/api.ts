const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function request(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Sitzung abgelaufen. Bitte erneut anmelden.');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API Fehler: ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: (refreshToken: string) =>
    request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken }) }),

  // User
  getProfile: () => request('/users/me'),
  updateProfile: (data: Record<string, unknown>) =>
    request('/users/me', { method: 'PATCH', body: JSON.stringify(data) }),

  // DNA / Analysis
  uploadDna: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return fetch(`${API_URL}/analysis/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(r => r.json());
  },
  getAnalysisJobs: () => request('/analysis/jobs'),
  getAnalysisResult: (jobId: string) => request(`/analysis/jobs/${jobId}`),

  // Recommendations
  getRecommendations: () => request('/recommendations'),

  // Doctor endpoints
  getPatients: () => request('/users/patients'),
  getPatientDetail: (id: string) => request(`/users/patients/${id}`),

  // Documents
  getDocuments: () => request('/documents'),
  uploadDocument: (file: File, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return fetch(`${API_URL}/documents/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(r => r.json());
  },
};
