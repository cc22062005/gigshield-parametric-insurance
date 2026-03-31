import { TriggerEvent, ZONES } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

/**
 * Trigger Oracle Service
 * 
 * Simulates external data feeds for parametric trigger events.
 * In production, these would poll real APIs:
 * - IMD (India Meteorological Department) for weather
 * - CPCB for air quality
 * - NDMA for flood/disaster alerts
 * - State government feeds for curfew orders
 * 
 * Each trigger has a defined threshold. When the actual value exceeds
 * the threshold, the trigger fires and eligible policies auto-initiate claims.
 */

interface TriggerConfig {
  type: string;
  threshold: number;
  unit: string;
  source: string;
  generateValue: (intensity: number) => number;
}

const TRIGGER_CONFIGS: Record<string, TriggerConfig> = {
  heavy_rain: {
    type: 'Heavy Rain',
    threshold: 15,
    unit: 'mm/hr',
    source: 'IMD Weather API',
    generateValue: (intensity) => 8 + intensity * 25, // 8–33 mm/hr
  },
  flood_alert: {
    type: 'Flood Alert',
    threshold: 3,
    unit: 'NDMA Level (1-5)',
    source: 'NDMA Disaster Alert API',
    generateValue: (intensity) => Math.min(5, 1 + Math.round(intensity * 4)),
  },
  extreme_heat: {
    type: 'Extreme Heat',
    threshold: 45,
    unit: '°C',
    source: 'IMD Temperature API',
    generateValue: (intensity) => 38 + intensity * 12, // 38–50°C
  },
  severe_aqi: {
    type: 'Severe AQI',
    threshold: 400,
    unit: 'AQI',
    source: 'CPCB Air Quality API',
    generateValue: (intensity) => 250 + intensity * 250, // 250–500
  },
  curfew: {
    type: 'Curfew / Section 144',
    threshold: 1,
    unit: 'Active (0/1)',
    source: 'State Government Order Feed',
    generateValue: (intensity) => intensity > 0.5 ? 1 : 0,
  },
};

/**
 * Simulate a trigger event check for a given zone
 * @param triggerKey - One of: heavy_rain, flood_alert, extreme_heat, severe_aqi, curfew
 * @param zoneId - Zone identifier
 * @param intensity - 0.0 to 1.0, controls how severe the event is (for demo slider)
 */
export function checkTrigger(
  triggerKey: string,
  zoneId: number,
  intensity: number = 0.7
): TriggerEvent {
  const config = TRIGGER_CONFIGS[triggerKey];
  if (!config) {
    throw new Error(`Unknown trigger type: ${triggerKey}`);
  }

  const zone = ZONES[zoneId] || ZONES[4];
  const actualValue = Math.round(config.generateValue(Math.max(0, Math.min(1, intensity))) * 10) / 10;
  const triggered = actualValue >= config.threshold;

  return {
    id: uuidv4(),
    type: config.type,
    zone: zone.name,
    zoneId,
    triggered,
    actualValue,
    threshold: config.threshold,
    unit: config.unit,
    source: config.source,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check all triggers for a zone and return an array of results
 */
export function checkAllTriggers(zoneId: number): TriggerEvent[] {
  return Object.keys(TRIGGER_CONFIGS).map(key =>
    checkTrigger(key, zoneId, 0.3 + Math.random() * 0.5) // Semi-random intensity
  );
}

/**
 * Get available trigger types (for UI dropdown)
 */
export function getTriggerTypes() {
  return Object.entries(TRIGGER_CONFIGS).map(([key, config]) => ({
    key,
    type: config.type,
    threshold: config.threshold,
    unit: config.unit,
    source: config.source,
  }));
}
