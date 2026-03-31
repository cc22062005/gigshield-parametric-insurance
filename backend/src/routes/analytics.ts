import { Router } from 'express';
import { analyticsSnapshot, policies, claims, riders } from '../data/mockData';

const router = Router();

/**
 * GET /api/analytics/overview
 * KPI and summary data for admin dashboard
 */
router.get('/overview', (_req, res) => {
  const livePolicies = policies.filter(p => p.status === 'active').length;
  const liveClaims = claims.length;
  const approved = claims.filter(c => c.status === 'paid' || c.status === 'approved').length;
  const flagged = claims.filter(c => c.status === 'flagged').length;

  res.json({
    ...analyticsSnapshot,
    live: {
      activePolicies: livePolicies + analyticsSnapshot.totalActivePolicies,
      totalClaims: liveClaims + analyticsSnapshot.totalClaims,
      approvedRate: Math.round(((approved + analyticsSnapshot.approvedClaims) / (liveClaims + analyticsSnapshot.totalClaims)) * 100),
      flaggedRate: Math.round(((flagged + analyticsSnapshot.flaggedClaims) / (liveClaims + analyticsSnapshot.totalClaims)) * 100),
      totalRiders: riders.length,
    },
  });
});

/**
 * GET /api/analytics/claims-by-trigger
 * Chart data: claims grouped by trigger type
 */
router.get('/claims-by-trigger', (_req, res) => {
  res.json({ data: analyticsSnapshot.claimsByTrigger });
});

/**
 * GET /api/analytics/weekly-trend
 * Chart data: weekly trend of claims, payouts, revenue
 */
router.get('/weekly-trend', (_req, res) => {
  res.json({ data: analyticsSnapshot.weeklyTrend });
});

/**
 * GET /api/analytics/risk-distribution
 * Chart data: risk scores and policy count by zone
 */
router.get('/risk-distribution', (_req, res) => {
  res.json({ data: analyticsSnapshot.riskDistribution });
});

/**
 * GET /api/analytics/fraud-stats
 * Fraud detection statistics
 */
router.get('/fraud-stats', (_req, res) => {
  res.json({ data: analyticsSnapshot.fraudStats });
});

export default router;
