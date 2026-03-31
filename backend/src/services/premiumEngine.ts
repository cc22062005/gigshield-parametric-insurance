import { TIERS, ZONES, PremiumBreakdown } from '../data/mockData';

/**
 * Weekly Premium Calculation Engine
 * 
 * Formula: basePremium × locationRiskMultiplier × (1 + weatherSurcharge) × claimHistoryFactor
 * 
 * This implements a simplified actuarial model where:
 * - Base premium covers expected loss + admin costs + margin
 * - Location multiplier adjusts for zone-specific risk (flood-prone areas pay more)
 * - Weather surcharge applies during monsoon months
 * - Claim history factor rewards/penalizes based on personal loss ratio
 */

const MONSOON_MONTHS = [6, 7, 8, 9]; // June–September
const WEATHER_SURCHARGE_RATE = 0.15; // 15% surcharge during monsoon

export function calculatePremium(
  tier: 'basic' | 'standard' | 'pro',
  zoneId: number,
  claimCount: number = 0,
  currentMonth?: number
): PremiumBreakdown {
  const tierConfig = TIERS[tier];
  const zone = ZONES[zoneId] || ZONES[4]; // Default to Andheri East

  const basePremium = tierConfig.basePremium;
  const locationRiskMultiplier = zone.riskMultiplier;

  // Weather surcharge during monsoon season
  const month = currentMonth ?? new Date().getMonth() + 1;
  const weatherSurcharge = MONSOON_MONTHS.includes(month) ? WEATHER_SURCHARGE_RATE : 0;

  // Claim history factor: more claims = slightly higher premium
  // 0 claims: 1.0, 1-2 claims: 1.05, 3-5 claims: 1.15, 6+: 1.25
  let claimHistoryFactor = 1.0;
  if (claimCount >= 6) claimHistoryFactor = 1.25;
  else if (claimCount >= 3) claimHistoryFactor = 1.15;
  else if (claimCount >= 1) claimHistoryFactor = 1.05;

  const rawPremium = basePremium * locationRiskMultiplier * (1 + weatherSurcharge) * claimHistoryFactor;
  const finalPremium = Math.round(rawPremium);

  return {
    basePremium,
    locationRiskMultiplier,
    weatherSurcharge,
    claimHistoryFactor,
    finalPremium,
  };
}

/**
 * Calculate maximum payout for a given policy tier and disruption day count.
 * In parametric insurance, payout = fixed amount per day × eligible disruption days (max 7 per week).
 */
export function calculatePayout(tier: 'basic' | 'standard' | 'pro', disruptionDays: number = 1): number {
  const maxPerDay = TIERS[tier].maxPayoutPerDay;
  const eligibleDays = Math.min(disruptionDays, 7);
  return maxPerDay * eligibleDays;
}

/**
 * Financial Viability Metrics (simplified for demo)
 * Loss Ratio = Total Claims Paid / Total Premiums Collected
 * Target: < 0.70 for sustainability
 */
export function calculateLossRatio(totalPayouts: number, totalPremiums: number): number {
  if (totalPremiums === 0) return 0;
  return Math.round((totalPayouts / totalPremiums) * 100) / 100;
}
