import { CoverageCard, StatusBadge } from '../components';

export default function PolicyManagement() {
  return (
    <div className="p-6 space-y-6">
      {/* Premium Calculator */}
      <div className="glass-card p-6">
        <h2>Weekly Premium Quote</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <select>Zone: Mumbai | Bangalore | Delhi</select>
          <select>Plan: Basic ₹39 | Standard ₹69 | Pro ₹99</select>
          <button className="btn-primary">Calculate</button>
        </div>
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
          <h3>Standard Plan: ₹69/week</h3>
          <p>Base ₹59 + Zone Risk ₹8 + Weather ₹2 = ₹69</p>
        </div>
      </div>

      {/* Coverage Scope */}
      <CoverageCard 
        title="Covered Triggers" 
        items={['Heavy Rain', 'Extreme Heat', 'Severe AQI', 'Flood', 'Curfew']}
      />
      <div className="glass-card p-6 bg-red-50 border-red-200">
        <h3>❌ Exclusions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          <StatusBadge>Health/Accidents</StatusBadge>
          <StatusBadge>Vehicle Repair</StatusBadge>
          <StatusBadge>Life Insurance</StatusBadge>
          <StatusBadge>Personal Liability</StatusBadge>
        </div>
      </div>

      {/* Active Policies */}
      <div className="glass-card p-6">
        <h3>Active Policies</h3>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <StatusBadge>Active</StatusBadge>
            <div>Standard Cover - Apr 1-7</div>
            <div>₹69/week | Mumbai Zone</div>
          </div>
        </div>
      </div>
    </div>
  );
}
