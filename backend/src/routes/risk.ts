import { Router } from 'express';
import { calculateRiskScore } from '../services/riskScorer';
import { riders } from '../data/mockData';

const router = Router();

/**
 * GET /api/risk-score
 * Calculate explainable risk score for a rider
 */
router.get('/', (req, res) => {
  const { riderId, zoneId } = req.query;

  const rider = riders.find(r => r.id === (riderId || 'rider-001'));
  if (!rider) {
    return res.status(404).json({ error: 'Rider not found' });
  }

  const zone = Number(zoneId) || rider.zoneId;
  const riskScore = calculateRiskScore(rider.id, zone);

  res.json({
    riskScore,
    recommendation: riskScore.overallScore >= 70
      ? 'High risk zone — Pro Cover recommended for maximum protection'
      : riskScore.overallScore >= 50
      ? 'Moderate risk — Standard Cover provides good value for this zone'
      : 'Low risk zone — Basic Cover is sufficient for current conditions',
  });
});

/**
 * GET /api/risk-score/all
 * Get risk scores for all zones (admin view)
 */
router.get('/all', (_req, res) => {
  const zoneScores = Object.keys(require('../data/mockData').ZONES).map(zoneId => {
    const zId = Number(zoneId);
    return calculateRiskScore('system', zId);
  });

  res.json({ zoneScores });
});

export default router;
