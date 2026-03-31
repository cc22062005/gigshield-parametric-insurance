import { v4 as uuidv4 } from 'uuid';

// ── Types ──────────────────────────────────────────────
export interface Rider {
  id: string;
  name: string;
  phone: string;
  zone: string;
  zoneId: number;
  platform: string;
  registered: string;
  totalEarningsProtected: number;
  totalClaimsPaid: number;
}

export interface Policy {
  id: string;
  riderId: string;
  tier: 'basic' | 'standard' | 'pro';
  tierLabel: string;
  premium: number;
  premiumBreakdown: PremiumBreakdown;
  maxPayoutPerDay: number;
  coverageStart: string;
  coverageEnd: string;
  status: 'active' | 'pending' | 'expired';
  triggers: string[];
  exclusions: string[];
  createdAt: string;
}

export interface PremiumBreakdown {
  basePremium: number;
  locationRiskMultiplier: number;
  weatherSurcharge: number;
  claimHistoryFactor: number;
  finalPremium: number;
}

export interface Claim {
  id: string;
  policyId: string;
  riderId: string;
  triggerType: string;
  triggerValue: string;
  triggerThreshold: string;
  triggerSource: string;
  status: 'auto_initiated' | 'fraud_check' | 'approved' | 'paid' | 'flagged' | 'rejected';
  reasonCode: string;
  fraudCheckResult: FraudCheckResult | null;
  payoutAmount: number;
  createdAt: string;
  processedAt: string | null;
  paidAt: string | null;
}

export interface FraudCheckResult {
  overallScore: number;
  passed: boolean;
  signals: {
    gpsConsistency: { score: number; passed: boolean; detail: string };
    velocityCheck: { score: number; passed: boolean; detail: string };
    duplicateCheck: { score: number; passed: boolean; detail: string };
    activityPattern: { score: number; passed: boolean; detail: string };
    deviceIntegrity: { score: number; passed: boolean; detail: string };
  };
}

export interface RiskScore {
  riderId: string;
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    weatherRisk: { score: number; weight: number; detail: string };
    pollutionRisk: { score: number; weight: number; detail: string };
    disruptionFrequency: { score: number; weight: number; detail: string };
    claimHistory: { score: number; weight: number; detail: string };
    locationStability: { score: number; weight: number; detail: string };
  };
  updatedAt: string;
}

export interface TriggerEvent {
  id: string;
  type: string;
  zone: string;
  zoneId: number;
  triggered: boolean;
  actualValue: number;
  threshold: number;
  unit: string;
  source: string;
  timestamp: string;
}

// ── Zone Data ──────────────────────────────────────────
export const ZONES: Record<number, { name: string; city: string; riskMultiplier: number }> = {
  1: { name: 'Connaught Place', city: 'Delhi', riskMultiplier: 1.1 },
  2: { name: 'Koramangala', city: 'Bangalore', riskMultiplier: 0.9 },
  3: { name: 'Bandra West', city: 'Mumbai', riskMultiplier: 1.3 },
  4: { name: 'Andheri East', city: 'Mumbai', riskMultiplier: 1.4 },
  5: { name: 'Salt Lake', city: 'Kolkata', riskMultiplier: 1.2 },
  6: { name: 'T. Nagar', city: 'Chennai', riskMultiplier: 1.0 },
  7: { name: 'Jubilee Hills', city: 'Hyderabad', riskMultiplier: 0.85 },
  8: { name: 'Aundh', city: 'Pune', riskMultiplier: 0.95 },
};

// ── Tier Config ────────────────────────────────────────
export const TIERS = {
  basic: {
    label: 'Basic Cover',
    basePremium: 39,
    maxPayoutPerDay: 250,
    triggers: ['Heavy Rain (>15mm/hr)'],
    description: 'Protection against severe rainfall disrupting deliveries.',
  },
  standard: {
    label: 'Standard Cover',
    basePremium: 69,
    maxPayoutPerDay: 500,
    triggers: ['Heavy Rain (>15mm/hr)', 'Severe AQI (>400)'],
    description: 'Rain + severe air pollution coverage for urban riders.',
  },
  pro: {
    label: 'Pro Cover',
    basePremium: 99,
    maxPayoutPerDay: 750,
    triggers: ['Heavy Rain (>15mm/hr)', 'Severe AQI (>400)', 'Curfew / Section 144', 'Extreme Heat (>45°C)', 'Flood Alert (NDMA Level)'],
    description: 'Comprehensive: Rain, AQI, heat, floods, and curfew/strikes.',
  },
};

export const COVERAGE_EXCLUSIONS = [
  'Health insurance or medical bills',
  'Life insurance or death benefits',
  'Accident coverage or bodily injury',
  'Vehicle repair or breakdown costs',
  'Personal property damage',
  'Pre-existing health conditions',
];

// ── Mock Riders ────────────────────────────────────────
export const riders: Rider[] = [
  { id: 'rider-001', name: 'Raj Kumar', phone: '9876543210', zone: 'Andheri East', zoneId: 4, platform: 'Zomato', registered: '2025-08-15', totalEarningsProtected: 47500, totalClaimsPaid: 3750 },
  { id: 'rider-002', name: 'Priya Sharma', phone: '9876543211', zone: 'Bandra West', zoneId: 3, platform: 'Swiggy', registered: '2025-09-01', totalEarningsProtected: 38200, totalClaimsPaid: 2500 },
  { id: 'rider-003', name: 'Amit Patel', phone: '9876543212', zone: 'Koramangala', zoneId: 2, platform: 'Zomato', registered: '2025-07-20', totalEarningsProtected: 52100, totalClaimsPaid: 4000 },
  { id: 'rider-004', name: 'Deepika Reddy', phone: '9876543213', zone: 'Jubilee Hills', zoneId: 7, platform: 'Dunzo', registered: '2025-10-05', totalEarningsProtected: 28900, totalClaimsPaid: 1500 },
  { id: 'rider-005', name: 'Suresh Nair', phone: '9876543214', zone: 'T. Nagar', zoneId: 6, platform: 'Swiggy', registered: '2025-06-12', totalEarningsProtected: 61200, totalClaimsPaid: 5250 },
];

// ── Mock Policies ──────────────────────────────────────
export const policies: Policy[] = [
  {
    id: 'pol-001', riderId: 'rider-001', tier: 'standard', tierLabel: 'Standard Cover',
    premium: 97, premiumBreakdown: { basePremium: 69, locationRiskMultiplier: 1.4, weatherSurcharge: 0, claimHistoryFactor: 1.0, finalPremium: 97 },
    maxPayoutPerDay: 500, coverageStart: '2026-03-31', coverageEnd: '2026-04-06',
    status: 'active', triggers: ['Heavy Rain (>15mm/hr)', 'Severe AQI (>400)'],
    exclusions: COVERAGE_EXCLUSIONS, createdAt: '2026-03-31T08:00:00Z',
  },
  {
    id: 'pol-002', riderId: 'rider-002', tier: 'pro', tierLabel: 'Pro Cover',
    premium: 129, premiumBreakdown: { basePremium: 99, locationRiskMultiplier: 1.3, weatherSurcharge: 0, claimHistoryFactor: 1.0, finalPremium: 129 },
    maxPayoutPerDay: 750, coverageStart: '2026-03-31', coverageEnd: '2026-04-06',
    status: 'active', triggers: ['Heavy Rain (>15mm/hr)', 'Severe AQI (>400)', 'Curfew / Section 144', 'Extreme Heat (>45°C)', 'Flood Alert (NDMA Level)'],
    exclusions: COVERAGE_EXCLUSIONS, createdAt: '2026-03-31T07:30:00Z',
  },
  {
    id: 'pol-003', riderId: 'rider-001', tier: 'basic', tierLabel: 'Basic Cover',
    premium: 55, premiumBreakdown: { basePremium: 39, locationRiskMultiplier: 1.4, weatherSurcharge: 0, claimHistoryFactor: 1.0, finalPremium: 55 },
    maxPayoutPerDay: 250, coverageStart: '2026-03-24', coverageEnd: '2026-03-30',
    status: 'expired', triggers: ['Heavy Rain (>15mm/hr)'],
    exclusions: COVERAGE_EXCLUSIONS, createdAt: '2026-03-24T08:00:00Z',
  },
];

// ── Mock Claims ────────────────────────────────────────
export const claims: Claim[] = [
  {
    id: 'clm-001', policyId: 'pol-003', riderId: 'rider-001',
    triggerType: 'Heavy Rain', triggerValue: '22mm/hr', triggerThreshold: '15mm/hr',
    triggerSource: 'IMD Weather API', status: 'paid', reasonCode: 'TRIGGER_VERIFIED',
    fraudCheckResult: {
      overallScore: 95, passed: true,
      signals: {
        gpsConsistency: { score: 98, passed: true, detail: 'Consistent location in Zone 4 for past 6 hours' },
        velocityCheck: { score: 100, passed: true, detail: 'No impossible travel detected' },
        duplicateCheck: { score: 100, passed: true, detail: 'No duplicate claims in this period' },
        activityPattern: { score: 88, passed: true, detail: 'Claim frequency within normal range (2 per month)' },
        deviceIntegrity: { score: 92, passed: true, detail: 'No mock location software detected' },
      },
    },
    payoutAmount: 250, createdAt: '2026-03-26T14:30:00Z', processedAt: '2026-03-26T14:31:00Z', paidAt: '2026-03-26T14:35:00Z',
  },
  {
    id: 'clm-002', policyId: 'pol-001', riderId: 'rider-001',
    triggerType: 'Severe AQI', triggerValue: 'AQI 456', triggerThreshold: 'AQI 400',
    triggerSource: 'CPCB Air Quality API', status: 'approved', reasonCode: 'TRIGGER_VERIFIED',
    fraudCheckResult: {
      overallScore: 91, passed: true,
      signals: {
        gpsConsistency: { score: 95, passed: true, detail: 'Stable location in Andheri East zone' },
        velocityCheck: { score: 100, passed: true, detail: 'Normal movement pattern' },
        duplicateCheck: { score: 100, passed: true, detail: 'First AQI claim this week' },
        activityPattern: { score: 82, passed: true, detail: 'Slightly above average claim rate' },
        deviceIntegrity: { score: 90, passed: true, detail: 'Device integrity verified' },
      },
    },
    payoutAmount: 500, createdAt: '2026-03-31T10:15:00Z', processedAt: '2026-03-31T10:16:00Z', paidAt: null,
  },
  {
    id: 'clm-003', policyId: 'pol-002', riderId: 'rider-002',
    triggerType: 'Heavy Rain', triggerValue: '31mm/hr', triggerThreshold: '15mm/hr',
    triggerSource: 'IMD Weather API', status: 'flagged', reasonCode: 'FRAUD_DETECTED',
    fraudCheckResult: {
      overallScore: 38, passed: false,
      signals: {
        gpsConsistency: { score: 22, passed: false, detail: 'GPS location jumped 45km in 10 minutes' },
        velocityCheck: { score: 15, passed: false, detail: 'Impossible travel speed detected (270km/h)' },
        duplicateCheck: { score: 100, passed: true, detail: 'No duplicate claims found' },
        activityPattern: { score: 45, passed: false, detail: 'Claim frequency 3x above zone average' },
        deviceIntegrity: { score: 30, passed: false, detail: 'Mock location software signature detected' },
      },
    },
    payoutAmount: 0, createdAt: '2026-03-30T16:45:00Z', processedAt: '2026-03-30T16:46:00Z', paidAt: null,
  },
  {
    id: 'clm-004', policyId: 'pol-001', riderId: 'rider-001',
    triggerType: 'Heavy Rain', triggerValue: '18mm/hr', triggerThreshold: '15mm/hr',
    triggerSource: 'IMD Weather API', status: 'rejected', reasonCode: 'OUTSIDE_COVERAGE_HOURS',
    fraudCheckResult: null,
    payoutAmount: 0, createdAt: '2026-03-28T03:20:00Z', processedAt: '2026-03-28T03:21:00Z', paidAt: null,
  },
];

// ── Analytics Snapshots ─────────────────────────────────
export const analyticsSnapshot = {
  totalActivePolicies: 1247,
  totalClaims: 3841,
  approvedClaims: 3102,
  flaggedClaims: 289,
  rejectedClaims: 450,
  lossRatio: 0.62,
  weeklyRevenue: 86290,
  totalPayouts: 53500,
  avgPremium: 72,
  avgPayout: 412,
  claimsByTrigger: [
    { trigger: 'Heavy Rain', count: 1820, payout: 25480 },
    { trigger: 'Severe AQI', count: 945, payout: 13230 },
    { trigger: 'Curfew', count: 412, payout: 5768 },
    { trigger: 'Extreme Heat', count: 389, payout: 5446 },
    { trigger: 'Flood Alert', count: 275, payout: 3576 },
  ],
  weeklyTrend: [
    { week: 'W1', claims: 485, payouts: 6790, revenue: 11200, lossRatio: 0.61 },
    { week: 'W2', claims: 520, payouts: 7280, revenue: 12100, lossRatio: 0.60 },
    { week: 'W3', claims: 890, payouts: 12460, revenue: 13800, lossRatio: 0.90 },
    { week: 'W4', claims: 445, payouts: 6230, revenue: 12500, lossRatio: 0.50 },
    { week: 'W5', claims: 510, payouts: 7140, revenue: 11900, lossRatio: 0.60 },
    { week: 'W6', claims: 620, payouts: 8680, revenue: 12400, lossRatio: 0.70 },
    { week: 'W7', claims: 371, payouts: 4920, revenue: 12390, lossRatio: 0.40 },
  ],
  riskDistribution: [
    { zone: 'Andheri East', zoneId: 4, riskScore: 78, activePolicies: 312 },
    { zone: 'Bandra West', zoneId: 3, riskScore: 72, activePolicies: 245 },
    { zone: 'Connaught Place', zoneId: 1, riskScore: 65, activePolicies: 198 },
    { zone: 'Salt Lake', zoneId: 5, riskScore: 61, activePolicies: 156 },
    { zone: 'T. Nagar', zoneId: 6, riskScore: 55, activePolicies: 142 },
    { zone: 'Koramangala', zoneId: 2, riskScore: 48, activePolicies: 98 },
    { zone: 'Aundh', zoneId: 8, riskScore: 42, activePolicies: 56 },
    { zone: 'Jubilee Hills', zoneId: 7, riskScore: 38, activePolicies: 40 },
  ],
  fraudStats: {
    totalChecks: 3841,
    passed: 3552,
    flagged: 289,
    topSignals: [
      { signal: 'GPS Spoofing', count: 142 },
      { signal: 'Velocity Anomaly', count: 89 },
      { signal: 'Duplicate Claims', count: 34 },
      { signal: 'Activity Pattern', count: 24 },
    ],
  },
};
