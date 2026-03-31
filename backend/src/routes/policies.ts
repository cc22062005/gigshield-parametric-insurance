import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { policies, riders, TIERS, COVERAGE_EXCLUSIONS, ZONES } from '../data/mockData';
import { calculatePremium } from '../services/premiumEngine';

const router = Router();

/**
 * GET /api/policies
 * List all policies, optionally filter by riderId
 */
router.get('/', (req, res) => {
  const { riderId } = req.query;

  let result = policies;
  if (riderId) {
    result = policies.filter(p => p.riderId === riderId);
  }

  res.json({ policies: result, total: result.length });
});

/**
 * GET /api/policies/tiers
 * Get available coverage tiers with pricing info
 */
router.get('/tiers', (req, res) => {
  const { zoneId } = req.query;
  const zone = Number(zoneId) || 4;

  const tiers = Object.entries(TIERS).map(([key, config]) => {
    const breakdown = calculatePremium(key as 'basic' | 'standard' | 'pro', zone);
    return {
      key,
      ...config,
      dynamicPremium: breakdown.finalPremium,
      premiumBreakdown: breakdown,
      zone: ZONES[zone]?.name || 'Unknown',
    };
  });

  res.json({ tiers, exclusions: COVERAGE_EXCLUSIONS });
});

/**
 * POST /api/policies/buy
 * Purchase a weekly policy
 */
router.post('/buy', (req, res) => {
  const { riderId, tier, zoneId } = req.body;

  if (!riderId || !tier) {
    return res.status(400).json({ error: 'riderId and tier are required' });
  }

  const tierKey = tier as 'basic' | 'standard' | 'pro';
  const tierConfig = TIERS[tierKey];
  if (!tierConfig) {
    return res.status(400).json({ error: 'Invalid tier. Use: basic, standard, or pro' });
  }

  const zone = Number(zoneId) || 4;
  const rider = riders.find(r => r.id === riderId);
  if (!rider) {
    return res.status(404).json({ error: 'Rider not found' });
  }

  // Check for existing active policy
  const existingActive = policies.find(p => p.riderId === riderId && p.status === 'active');
  if (existingActive) {
    return res.status(409).json({ error: 'Rider already has an active policy', policy: existingActive });
  }

  // Calculate dynamic premium
  const riderClaims = require('../data/mockData').claims.filter((c: any) => c.riderId === riderId);
  const breakdown = calculatePremium(tierKey, zone, riderClaims.length);

  const now = new Date();
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + 7);

  const newPolicy = {
    id: `pol-${uuidv4().slice(0, 6)}`,
    riderId,
    tier: tierKey,
    tierLabel: tierConfig.label,
    premium: breakdown.finalPremium,
    premiumBreakdown: breakdown,
    maxPayoutPerDay: tierConfig.maxPayoutPerDay,
    coverageStart: now.toISOString().split('T')[0],
    coverageEnd: endDate.toISOString().split('T')[0],
    status: 'active' as const,
    triggers: tierConfig.triggers,
    exclusions: COVERAGE_EXCLUSIONS,
    createdAt: now.toISOString(),
  };

  policies.push(newPolicy);

  // Update rider stats
  rider.totalEarningsProtected += tierConfig.maxPayoutPerDay * 7;

  res.status(201).json({
    message: `${tierConfig.label} policy activated for 7 days`,
    policy: newPolicy,
    financialNote: 'Weekly parametric insurance — covers income loss from verified external disruptions only. Health, accident, and vehicle damage are NOT covered.',
  });
});

/**
 * GET /api/policies/:id
 * Get policy detail
 */
router.get('/:id', (req, res) => {
  const policy = policies.find(p => p.id === req.params.id);
  if (!policy) {
    return res.status(404).json({ error: 'Policy not found' });
  }

  res.json({
    policy,
    eligibilityRules: [
      'Rider must be in declared zone when trigger event occurs',
      'Trigger must exceed defined threshold from verified data source',
      'Maximum 1 claim per trigger type per coverage period',
      'Coverage valid Mon 00:00 to Sun 23:59 IST',
      'Payout processed within 30 minutes of trigger verification',
    ],
  });
});

export default router;
