import { KPICard } from '../components';

export default function AdminSimulator() {
  return (
    <div className="p-6 space-y-6">
      {/* KPIs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard icon="📊" label="Active Policies" value="247" trend="+12%" />
        <KPICard icon="✅" label="Approved %" value="78.7%" trend="+2.1%" />
        <KPICard icon="⚠️" label="Flagged %" value="12.4%" trend="-1.3%" />
        <KPICard icon="📈" label="Loss Ratio" value="23.1%" trend="+0.8%" />
        <KPICard icon="💰" label="Weekly Revenue" value="₹17,043" trend="+15%" />
        <KPICard icon="🛡️" label="Fraud Rate" value="94%" trend="+3%" />
      </div>

      {/* Trigger Simulator */}
      <div className="glass-card p-6">
        <h3>Trigger Simulator</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          <button className="p-3 rounded-lg bg-emerald-100 hover:bg-emerald-200">Rain</button>
          <button className="p-3 rounded-lg bg-emerald-100 hover:bg-emerald-200">Flood</button>
          <button className="p-3 rounded-lg bg-emerald-100 hover:bg-emerald-200">Heat</button>
          <button className="p-3 rounded-lg bg-orange-100 hover:bg-orange-200">AQI</button>
          <button className="p-3 rounded-lg bg-red-100 hover:bg-red-200">Curfew</button>
        </div>
      </div>

      {/* Live Claims */}
      <div className="glass-card p-6">
        <h3>Live Claims Feed</h3>
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
            <span>Raj M. - Rain Trigger - APPROVED</span>
            <span>₹1,250</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded">
            <span>Anil S. - GPS Anomaly - FLAGGED</span>
            <span>Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
