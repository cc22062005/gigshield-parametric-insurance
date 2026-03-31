import { Router } from 'express';
import authRoutes from './auth';
import policyRoutes from './policies';
import claimRoutes from './claims';
import riskRoutes from './risk';
import analyticsRoutes from './analytics';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'GigShield API is running',
    version: '2.0.0',
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET  /api/policies',
      'POST /api/policies/buy',
      'GET  /api/policies/tiers',
      'POST /api/claims/simulate',
      'POST /api/claims/fraud-check',
      'GET  /api/risk-score',
      'GET  /api/analytics/overview',
    ],
  });
});

router.post('/policies/buy', (req, res) => {
  res.json({
    id: 'pol_001',
    plan: 'Standard',
    premium: 69,
    coverageHours: 40,
    zone: 'Mumbai',
    period: 'Apr 1-7',
    status: 'active'
  });
});

router.post('/claims/simulate', (req, res) => {
  res.json({
    claimId: 'clm_001',
    trigger: 'Heavy Rain',
    zone: 'Mumbai',
    amount: 1250,
    status: 'pending_fraud_check'
  });
});

router.post('/claims/fraud-check', (req, res) => {
  res.json({
    confidence: 0.12,
    approved: true,
    signals: [],
    reason: 'All checks passed'
  });
});

// Route modules
router.use('/auth', authRoutes);
router.use('/policies', policyRoutes);
router.use('/claims', claimRoutes);
router.use('/risk-score', riskRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
