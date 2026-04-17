// GigShield Phase 3 Mock Database Seed File
import fs from 'fs';
import path from 'path';

// This script simulates DB seeding for the DEVTrails Hackathon.
// In actual production, this would use a PostgreSQL ORM/driver like Prisma or Sequelize.

export const seedDatabase = () => {
  console.log('Seeding Database with Dummy Hackathon Data...');

  // 1. Create Core Persona (Raj)
  const users = [
    {
      id: 'usr_001_raj',
      name: 'Raj Kumar',
      role: 'WORKER',
      zone: 'Bangalore - Koramangala',
      platform: 'Zomato',
      walletBalance: 1250,
      activePolicyId: 'pol_current_week'
    },
    {
      id: 'usr_002_admin',
      name: 'Risk Ops Lead',
      role: 'ADMIN',
      permissions: ['ALL_ZONES', 'OVERRIDE_ML']
    }
  ];

  // 2. Active Policy (Proof of Business Model)
  const policies = [
    {
      id: 'pol_current_week',
      userId: 'usr_001_raj',
      planTier: 'Standard Cover',
      premiumPaid: 49,
      maxPayoutPerDay: 500,
      status: 'ACTIVE',
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      coveredTriggers: ['Heavy Rain', 'Severe AQI']
    }
  ];

  // 3. Historical Claim Data (For Dashboard UI)
  const claims = [
    {
      id: 'clm_hist_001',
      userId: 'usr_001_raj',
      trigger: 'Severe AQI',
      amount: 500,
      fraudScore: 0.12, // ML output (Confidence it is Fraud) High = Bad, Low = Good
      status: 'PAID',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'clm_hist_002',
      userId: 'usr_001_raj',
      trigger: 'Heavy Rain',
      amount: 250,
      fraudScore: 0.05,
      status: 'PAID',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const dbState = { users, policies, claims };

  // Write out to a local JSON file to simulate DB state if needed by rules engine
  const dbPath = path.join(__dirname, 'mock_db_state.json');
  fs.writeFileSync(dbPath, JSON.stringify(dbState, null, 2));
  
  console.log('✅ Database successfully seeded!');
  return dbState;
};

// Auto-run if executed directly
if (require.main === module) {
  seedDatabase();
}
