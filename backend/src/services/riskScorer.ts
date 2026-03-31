import { RiskScore, ZONES, claims } from '../data/mockData';

/**
 * Explainable Risk Scoring Engine
 * 
 * Generates a composite risk score (0–100) for a rider based on:
 * 1. Weather Risk (30%) – zone rainfall/flood history + current forecast
 * 2. Pollution Risk (20%) – AQI trend for the zone
 * 3. Disruption Frequency (20%) – historical event count in zone
 * 4. Claim History (15%) – rider's personal loss ratio
 * 5. Location Stability (15%) – how consistently the rider operates in one zone
 * 
 * Higher score = higher risk = higher recommended coverage tier
 */

const ZONE_WEATHER_RISK: Record<number, number> = {
  1: 58, // Delhi - moderate rain, extreme heat
  2: 42, // Bangalore - mild
  3: 78, // Mumbai Bandra - heavy monsoon
  4: 82, // Mumbai Andheri - highest flood risk
  5: 68, // Kolkata - cyclone risk
  6: 52, // Chennai - moderate
  7: 35, // Hyderabad - low
  8: 45, // Pune - moderate
};

const ZONE_POLLUTION_RISK: Record<number, number> = {
  1: 85, // Delhi - severe AQI
  2: 38, // Bangalore - low
  3: 55, // Mumbai Bandra
  4: 60, // Mumbai Andheri
  5: 62, // Kolkata - moderate-high
  6: 45, // Chennai
  7: 40, // Hyderabad
  8: 42, // Pune
};

const ZONE_DISRUPTION_FREQ: Record<number, number> = {
  1: 72, // Delhi - strikes, curfews
  2: 35, // Bangalore - low
  3: 65, // Mumbai Bandra - flooding
  4: 70, // Mumbai Andheri - flooding
  5: 55, // Kolkata
  6: 50, // Chennai - cyclone season
  7: 30, // Hyderabad - low
  8: 40, // Pune
};

export function calculateRiskScore(riderId: string, zoneId: number): RiskScore {
  const zone = ZONES[zoneId] || ZONES[4];

  // Factor 1: Weather Risk (30%)
  const weatherScore = ZONE_WEATHER_RISK[zoneId] || 50;
  const weatherDetail = weatherScore >= 70
    ? `High monsoon/flood risk in ${zone.name} — heavy rainfall expected this season`
    : weatherScore >= 50
    ? `Moderate weather risk in ${zone.name} — seasonal rain patterns`
    : `Low weather risk in ${zone.name} — minimal forecast disruptions`;

  // Factor 2: Pollution Risk (20%)
  const pollutionScore = ZONE_POLLUTION_RISK[zoneId] || 50;
  const pollutionDetail = pollutionScore >= 70
    ? `Severe AQI zone — ${zone.city} frequently exceeds AQI 400 in winter`
    : pollutionScore >= 50
    ? `Moderate AQI levels — occasional pollution spikes in ${zone.city}`
    : `Good air quality in ${zone.city} — low pollution risk`;

  // Factor 3: Disruption Frequency (20%)
  const disruptionScore = ZONE_DISRUPTION_FREQ[zoneId] || 50;
  const disruptionDetail = disruptionScore >= 60
    ? `Zone has ${Math.round(disruptionScore / 10)} disruption events per month on average`
    : `Zone has ${Math.round(disruptionScore / 15)} disruption events per month — below average`;

  // Factor 4: Claim History (15%)
  const riderClaims = claims.filter(c => c.riderId === riderId);
  const approvedClaims = riderClaims.filter(c => c.status === 'paid' || c.status === 'approved');
  const claimScore = Math.min(100, approvedClaims.length * 20 + 30);
  const claimDetail = approvedClaims.length === 0
    ? 'No claims filed — clean history'
    : `${approvedClaims.length} approved claim(s) — personal loss ratio: ${(approvedClaims.length * 0.15).toFixed(2)}`;

  // Factor 5: Location Stability (15%)
  // Mock: riders who stay in one zone = lower risk
  const stabilityScore = 25 + Math.floor(Math.random() * 20); // Lower is better for this factor
  const stabilityDetail = stabilityScore <= 35
    ? 'High stability — rider consistently operates in declared zone'
    : 'Moderate stability — rider occasionally operates in adjacent zones';

  // Composite score
  const weights = { weather: 0.30, pollution: 0.20, disruption: 0.20, claims: 0.15, stability: 0.15 };
  const overallScore = Math.round(
    weatherScore * weights.weather +
    pollutionScore * weights.pollution +
    disruptionScore * weights.disruption +
    claimScore * weights.claims +
    stabilityScore * weights.stability
  );

  const riskLevel: RiskScore['riskLevel'] = overallScore >= 75 ? 'critical' : overallScore >= 60 ? 'high' : overallScore >= 40 ? 'medium' : 'low';

  return {
    riderId,
    overallScore,
    riskLevel,
    factors: {
      weatherRisk: { score: weatherScore, weight: weights.weather, detail: weatherDetail },
      pollutionRisk: { score: pollutionScore, weight: weights.pollution, detail: pollutionDetail },
      disruptionFrequency: { score: disruptionScore, weight: weights.disruption, detail: disruptionDetail },
      claimHistory: { score: claimScore, weight: weights.claims, detail: claimDetail },
      locationStability: { score: stabilityScore, weight: weights.stability, detail: stabilityDetail },
    },
    updatedAt: new Date().toISOString(),
  };
}
