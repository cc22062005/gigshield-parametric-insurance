import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Auth ───────────────────────────────────────
export const authAPI = {
  register: (data: { name: string; phone: string; zone?: string; zoneId?: number; platform?: string }) =>
    api.post('/auth/register', data),
  login: (phone: string) =>
    api.post('/auth/login', { phone }),
  getRiders: () =>
    api.get('/auth/riders'),
};

// ── Policies ───────────────────────────────────
export const policiesAPI = {
  list: (riderId?: string) =>
    api.get('/policies', { params: { riderId } }),
  getTiers: (zoneId?: number) =>
    api.get('/policies/tiers', { params: { zoneId } }),
  buy: (data: { riderId: string; tier: string; zoneId?: number }) =>
    api.post('/policies/buy', data),
  getDetail: (id: string) =>
    api.get(`/policies/${id}`),
};

// ── Claims ─────────────────────────────────────
export const claimsAPI = {
  list: (riderId?: string, status?: string) =>
    api.get('/claims', { params: { riderId, status } }),
  getTriggers: () =>
    api.get('/claims/triggers'),
  simulate: (data: {
    riderId?: string; triggerKey?: string; zoneId?: number;
    intensity?: number; simulateFraud?: boolean; fraudType?: string;
  }) => api.post('/claims/simulate', data),
  fraudCheck: (data: { claimId: string; simulateFraud?: boolean; fraudType?: string }) =>
    api.post('/claims/fraud-check', data),
};

// ── Risk Score ─────────────────────────────────
export const riskAPI = {
  getScore: (riderId?: string, zoneId?: number) =>
    api.get('/risk-score', { params: { riderId, zoneId } }),
  getAllZones: () =>
    api.get('/risk-score/all'),
};

// ── Analytics ──────────────────────────────────
export const analyticsAPI = {
  overview: () =>
    api.get('/analytics/overview'),
  claimsByTrigger: () =>
    api.get('/analytics/claims-by-trigger'),
  weeklyTrend: () =>
    api.get('/analytics/weekly-trend'),
  riskDistribution: () =>
    api.get('/analytics/risk-distribution'),
  fraudStats: () =>
    api.get('/analytics/fraud-stats'),
};

export default api;
