import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { riders } from '../data/mockData';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new rider
 */
router.post('/register', (req, res) => {
  const { name, phone, zone, zoneId, platform } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  // Check for existing rider
  const existing = riders.find(r => r.phone === phone);
  if (existing) {
    return res.status(409).json({ error: 'Rider already registered', rider: existing });
  }

  const newRider = {
    id: `rider-${uuidv4().slice(0, 6)}`,
    name,
    phone,
    zone: zone || 'Andheri East',
    zoneId: zoneId || 4,
    platform: platform || 'Zomato',
    registered: new Date().toISOString().split('T')[0],
    totalEarningsProtected: 0,
    totalClaimsPaid: 0,
  };

  riders.push(newRider);

  res.status(201).json({
    message: 'Registration successful',
    rider: newRider,
    token: `mock-jwt-${newRider.id}-${Date.now()}`,
  });
});

/**
 * POST /api/auth/login
 * Mock login - returns rider profile + token
 */
router.post('/login', (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Find rider or default to demo rider
  const rider = riders.find(r => r.phone === phone) || riders[0];

  res.json({
    message: 'Login successful',
    rider,
    token: `mock-jwt-${rider.id}-${Date.now()}`,
  });
});

/**
 * GET /api/auth/riders
 * List all riders (admin)
 */
router.get('/riders', (_req, res) => {
  res.json({ riders });
});

export default router;
