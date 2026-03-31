// ── Frontend Types ────────────────────────────────────

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
    gpsConsistency: FraudSignal;
    velocityCheck: FraudSignal;
    duplicateCheck: FraudSignal;
    activityPattern: FraudSignal;
    deviceIntegrity: FraudSignal;
  };
}

export interface FraudSignal {
  score: number;
  passed: boolean;
  detail: string;
}

export interface RiskScore {
  riderId: string;
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    weatherRisk: RiskFactor;
    pollutionRisk: RiskFactor;
    disruptionFrequency: RiskFactor;
    claimHistory: RiskFactor;
    locationStability: RiskFactor;
  };
  updatedAt: string;
}

export interface RiskFactor {
  score: number;
  weight: number;
  detail: string;
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

export interface TierInfo {
  key: string;
  label: string;
  basePremium: number;
  maxPayoutPerDay: number;
  triggers: string[];
  description: string;
  dynamicPremium: number;
  premiumBreakdown: PremiumBreakdown;
  zone: string;
}

export interface AnalyticsOverview {
  totalActivePolicies: number;
  totalClaims: number;
  approvedClaims: number;
  flaggedClaims: number;
  rejectedClaims: number;
  lossRatio: number;
  weeklyRevenue: number;
  totalPayouts: number;
  avgPremium: number;
  avgPayout: number;
  claimsByTrigger: { trigger: string; count: number; payout: number }[];
  weeklyTrend: { week: string; claims: number; payouts: number; revenue: number; lossRatio: number }[];
  riskDistribution: { zone: string; zoneId: number; riskScore: number; activePolicies: number }[];
  fraudStats: {
    totalChecks: number;
    passed: number;
    flagged: number;
    topSignals: { signal: string; count: number }[];
  };
  live: {
    activePolicies: number;
    totalClaims: number;
    approvedRate: number;
    flaggedRate: number;
    totalRiders: number;
  };
}
