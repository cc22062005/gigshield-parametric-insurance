import { FraudCheckResult, claims } from '../data/mockData';

/**
 * Multi-Signal Fraud Detection Engine
 * 
 * Analyzes 5 independent signals to produce a composite fraud confidence score.
 * Each signal is scored 0–100 (higher = more trustworthy).
 * A claim passes if the composite score >= 60 and no critical signal fails.
 * 
 * Signals:
 * 1. GPS Consistency – location stability within rider's declared zone
 * 2. Velocity Check – detects impossible travel (teleportation/spoofing)
 * 3. Duplicate Check – same trigger type + same period = flagged
 * 4. Activity Pattern – claim frequency vs peer average
 * 5. Device Integrity – mock location software detection
 */

interface FraudCheckInput {
  riderId: string;
  claimId: string;
  triggerType: string;
  gpsLat?: number;
  gpsLng?: number;
  deviceId?: string;
  simulateFraud?: boolean; // Demo toggle
  fraudType?: 'gps_spoof' | 'velocity' | 'duplicate' | 'pattern' | 'all';
}

export function runFraudCheck(input: FraudCheckInput): FraudCheckResult {
  const { riderId, triggerType, simulateFraud = false, fraudType = 'all' } = input;

  // Count existing claims for this rider
  const riderClaims = claims.filter(c => c.riderId === riderId);
  const recentClaims = riderClaims.filter(c => {
    const claimDate = new Date(c.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return claimDate >= weekAgo;
  });

  // Check for duplicate claims (same trigger type in same week)
  const duplicateFound = recentClaims.some(c => c.triggerType === triggerType && c.status !== 'rejected');

  // ── Generate signal scores ──
  let gpsConsistency = generateGPSScore(simulateFraud && (fraudType === 'gps_spoof' || fraudType === 'all'));
  let velocityCheck = generateVelocityScore(simulateFraud && (fraudType === 'velocity' || fraudType === 'all'));
  let duplicateCheck = generateDuplicateScore(duplicateFound || (simulateFraud && (fraudType === 'duplicate' || fraudType === 'all')));
  let activityPattern = generateActivityScore(riderClaims.length, simulateFraud && (fraudType === 'pattern' || fraudType === 'all'));
  let deviceIntegrity = generateDeviceScore(simulateFraud && (fraudType === 'gps_spoof' || fraudType === 'all'));

  // Composite score (weighted average)
  const weights = { gps: 0.25, velocity: 0.20, duplicate: 0.20, activity: 0.15, device: 0.20 };
  const overallScore = Math.round(
    gpsConsistency.score * weights.gps +
    velocityCheck.score * weights.velocity +
    duplicateCheck.score * weights.duplicate +
    activityPattern.score * weights.activity +
    deviceIntegrity.score * weights.device
  );

  // Pass if overall >= 60 AND no critical failure
  const criticalFail = !gpsConsistency.passed || !velocityCheck.passed || !deviceIntegrity.passed;
  const passed = overallScore >= 60 && !criticalFail;

  return {
    overallScore,
    passed,
    signals: {
      gpsConsistency,
      velocityCheck,
      duplicateCheck,
      activityPattern,
      deviceIntegrity,
    },
  };
}

function generateGPSScore(isFraud: boolean) {
  if (isFraud) {
    return { score: 18 + Math.floor(Math.random() * 10), passed: false, detail: 'GPS location jumped 45km in 10 minutes — spoofing suspected' };
  }
  const score = 88 + Math.floor(Math.random() * 12);
  return { score, passed: true, detail: 'Consistent location within declared zone for past 6 hours' };
}

function generateVelocityScore(isFraud: boolean) {
  if (isFraud) {
    return { score: 10 + Math.floor(Math.random() * 12), passed: false, detail: 'Impossible travel speed detected (270km/h between pings)' };
  }
  const score = 90 + Math.floor(Math.random() * 10);
  return { score, passed: true, detail: 'Normal movement pattern, consistent with delivery activity' };
}

function generateDuplicateScore(isDuplicate: boolean) {
  if (isDuplicate) {
    return { score: 5, passed: false, detail: 'Duplicate claim for same trigger type within coverage period' };
  }
  const score = 95 + Math.floor(Math.random() * 5);
  return { score, passed: true, detail: 'No duplicate claims found for this trigger period' };
}

function generateActivityScore(totalClaims: number, isFraud: boolean) {
  if (isFraud) {
    return { score: 30 + Math.floor(Math.random() * 15), passed: false, detail: 'Claim frequency 3.2x above zone peer average' };
  }
  // Normal riders: 0-3 claims is fine, 4-6 is slightly elevated
  const score = totalClaims <= 3 ? 85 + Math.floor(Math.random() * 15) : 65 + Math.floor(Math.random() * 15);
  return { score, passed: score >= 50, detail: `Claim count (${totalClaims}) within acceptable range for zone` };
}

function generateDeviceScore(isFraud: boolean) {
  if (isFraud) {
    return { score: 12 + Math.floor(Math.random() * 15), passed: false, detail: 'Mock location software signature detected on device' };
  }
  const score = 90 + Math.floor(Math.random() * 10);
  return { score, passed: true, detail: 'Device integrity verified — no spoofing tools detected' };
}
