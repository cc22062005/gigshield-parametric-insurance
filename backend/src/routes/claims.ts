import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { claims, policies, riders } from '../data/mockData';
import { runFraudCheck } from '../services/fraudDetector';
import { checkTrigger, getTriggerTypes } from '../services/triggerOracle';

const router = Router();

/**
 * GET /api/claims
 * List all claims, optionally filter by riderId or status
 */
router.get('/', (req, res) => {
  const { riderId, status } = req.query;

  let result = claims;
  if (riderId) result = result.filter(c => c.riderId === riderId);
  if (status) result = result.filter(c => c.status === status);

  res.json({
    claims: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    total: result.length,
  });
});

/**
 * GET /api/claims/triggers
 * Get available trigger types for simulation
 */
router.get('/triggers', (_req, res) => {
  res.json({ triggers: getTriggerTypes() });
});

/**
 * POST /api/claims/simulate
 * Simulate a trigger event and auto-initiate claim flow
 * 
 * This is the core zero-touch claim flow:
 * 1. Oracle checks external data source
 * 2. If threshold exceeded → claim auto-initiated
 * 3. Fraud check runs automatically
 * 4. If passed → payout approved; if failed → claim flagged
 */
router.post('/simulate', (req, res) => {
  const { riderId, triggerKey, zoneId, intensity, simulateFraud, fraudType } = req.body;

  const rider = riders.find(r => r.id === (riderId || 'rider-001'));
  if (!rider) {
    return res.status(404).json({ error: 'Rider not found' });
  }

  const zone = Number(zoneId) || rider.zoneId;

  // Step 1: Check trigger from oracle
  const triggerEvent = checkTrigger(triggerKey || 'heavy_rain', zone, intensity || 0.8);

  if (!triggerEvent.triggered) {
    return res.json({
      step: 'TRIGGER_CHECK',
      result: 'NOT_TRIGGERED',
      triggerEvent,
      message: `${triggerEvent.type} value (${triggerEvent.actualValue}${triggerEvent.unit}) below threshold (${triggerEvent.threshold}${triggerEvent.unit}). No claim initiated.`,
    });
  }

  // Step 2: Find active policy
  const activePolicy = policies.find(p => p.riderId === rider.id && p.status === 'active');
  if (!activePolicy) {
    return res.json({
      step: 'POLICY_CHECK',
      result: 'NO_ACTIVE_POLICY',
      triggerEvent,
      message: 'Trigger verified but rider has no active policy. Claim cannot be initiated.',
    });
  }

  // Check if trigger is covered by policy
  const triggerCovered = activePolicy.triggers.some(t => 
    triggerEvent.type.toLowerCase().includes(t.split('(')[0].trim().toLowerCase()) ||
    t.toLowerCase().includes(triggerEvent.type.split('(')[0].trim().toLowerCase())
  );

  if (!triggerCovered) {
    return res.json({
      step: 'COVERAGE_CHECK',
      result: 'NOT_COVERED',
      triggerEvent,
      message: `${triggerEvent.type} is not covered under ${activePolicy.tierLabel}. Consider upgrading to a higher tier.`,
    });
  }

  // Step 3: Check for duplicate claims
  const duplicateClaim = claims.find(c =>
    c.riderId === rider.id &&
    c.triggerType === triggerEvent.type &&
    c.policyId === activePolicy.id &&
    c.status !== 'rejected'
  );

  // Step 4: Run fraud check
  const claimId = `clm-${uuidv4().slice(0, 6)}`;
  const fraudResult = runFraudCheck({
    riderId: rider.id,
    claimId,
    triggerType: triggerEvent.type,
    simulateFraud: simulateFraud || false,
    fraudType: fraudType || 'all',
  });

  // Step 5: Determine claim status
  let status: 'approved' | 'paid' | 'flagged' | 'rejected';
  let reasonCode: string;
  let payoutAmount: number;

  if (duplicateClaim) {
    status = 'rejected';
    reasonCode = 'DUPLICATE_CLAIM';
    payoutAmount = 0;
  } else if (!fraudResult.passed) {
    status = 'flagged';
    reasonCode = 'FRAUD_DETECTED';
    payoutAmount = 0;
  } else {
    status = 'paid';
    reasonCode = 'TRIGGER_VERIFIED';
    payoutAmount = activePolicy.maxPayoutPerDay;
  }

  const newClaim = {
    id: claimId,
    policyId: activePolicy.id,
    riderId: rider.id,
    triggerType: triggerEvent.type,
    triggerValue: `${triggerEvent.actualValue}${triggerEvent.unit}`,
    triggerThreshold: `${triggerEvent.threshold}${triggerEvent.unit}`,
    triggerSource: triggerEvent.source,
    status,
    reasonCode,
    fraudCheckResult: fraudResult,
    payoutAmount,
    createdAt: new Date().toISOString(),
    processedAt: new Date().toISOString(),
    paidAt: status === 'paid' ? new Date().toISOString() : null,
  };

  claims.push(newClaim);

  if (status === 'paid') {
    rider.totalClaimsPaid += payoutAmount;
  }

  res.json({
    step: 'COMPLETE',
    result: status.toUpperCase(),
    claim: newClaim,
    triggerEvent,
    fraudCheck: fraudResult,
    message: status === 'paid'
      ? `✅ Claim approved! ₹${payoutAmount} payout processed to ${rider.name}'s wallet.`
      : status === 'flagged'
      ? `🛑 Claim flagged for fraud. ${Object.entries(fraudResult.signals).filter(([,v]) => !v.passed).map(([k]) => k).join(', ')} signals failed.`
      : `❌ Claim rejected: ${reasonCode}`,
  });
});

/**
 * POST /api/claims/fraud-check
 * Run fraud detection on a specific claim
 */
router.post('/fraud-check', (req, res) => {
  const { claimId, simulateFraud, fraudType } = req.body;

  const claim = claims.find(c => c.id === claimId);
  if (!claim) {
    return res.status(404).json({ error: 'Claim not found' });
  }

  const result = runFraudCheck({
    riderId: claim.riderId,
    claimId: claim.id,
    triggerType: claim.triggerType,
    simulateFraud: simulateFraud || false,
    fraudType,
  });

  // Update claim with new fraud check
  claim.fraudCheckResult = result;
  if (!result.passed && claim.status !== 'rejected') {
    claim.status = 'flagged';
    claim.reasonCode = 'FRAUD_DETECTED';
  }

  res.json({ claim, fraudCheck: result });
});

export default router;
