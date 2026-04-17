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
    version: '3.0.0',
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET  /api/policies',
      'POST /api/policies/buy',
      'GET  /api/policies/tiers',
      'POST /api/claims/simulate',
      'POST /api/claims/fraud-check',
      'POST /api/demo/trigger-disruption',
      'GET  /api/risk-score',
      'GET  /api/analytics/overview',
    ],
  });
});

router.post('/policies/buy', (req, res) => {
  res.json({
    id: `pol_00${Math.floor(Math.random() * 9)}`,
    plan: 'Standard',
    premium: 49,
    coverageHours: 40,
    zone: 'Bangalore - Koramangala',
    period: 'Current Week',
    status: 'active'
  });
});

// Demo Webhook to simulate public weather API push
router.post('/demo/trigger-disruption', (req, res) => {
  const { eventType, metric, zone } = req.body;
  res.json({
    success: true,
    triggeredEvent: {
      eventId: `ev_${Date.now()}`,
      type: eventType,
      metricValue: metric,
      zone: zone || 'Bangalore - Koramangala',
      timestamp: new Date().toISOString()
    },
    message: `Successfully captured webhook for ${eventType}. ML processing job queued.`
  });
});

router.post('/claims/simulate', (req, res) => {
  res.json({
    claimId: `clm_${Date.now()}`,
    trigger: req.body.trigger || 'Heavy Rain',
    zone: req.body.zone || 'Bangalore',
    amount: 500,
    status: 'pending_fraud_check'
  });
});

router.post('/claims/fraud-check', async (req, res) => {
  const { claimId } = req.body;
  
  // Decide if this is a "Spoof" injection for demo purposes
  // Normally we would pull telemetry from the database.
  const isSpoof = claimId?.includes('fraud');
  
  const telemetryReq = {
    claim_id: claimId || 'clm_default',
    gps_distance_m: isSpoof ? 8500 : 45, // spoofed is 8.5km away
    time_since_event_s: isSpoof ? 15 : 180, 
    past_claims_count: isSpoof ? 4 : 1
  };

  try {
    // Attempt real connection to Python ML Service
    const fraudResponse = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(telemetryReq)
    });

    if (fraudResponse.ok) {
      const mlData = await fraudResponse.json();
      return res.json(mlData);
    }
    throw new Error('ML API responded with error');
  } catch (error) {
    // Honest Fallback if Python microservice is offline
    console.warn('ML Service Offline. Using fallback deterministic rules.');
    
    // Deterministic fallback based on same simulated thresholds
    const isApproved = telemetryReq.gps_distance_m < 500 && telemetryReq.time_since_event_s > 60;
    
    res.json({
      confidence: isApproved ? 0.15 : 0.85,
      riskLevel: isApproved ? 'GREEN' : 'RED',
      approved: isApproved,
      signals: ['Fallback Rule Engine', `GPS: ${telemetryReq.gps_distance_m}m`],
      reason: isApproved ? 'Rule fallback: Auto-approved.' : 'Rule fallback: Anomalous telemetry detected.'
    });
  }
});

// Route modules
router.use('/auth', authRoutes);
router.use('/policies', policyRoutes);
router.use('/claims', claimRoutes);
router.use('/risk-score', riskRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
