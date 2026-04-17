import { Shield, Activity, AlertTriangle, CloudRain, Zap, Wallet } from 'lucide-react';

export default function AdminSimulator() {
  const kpis = [
    { label: 'Active Policies', value: '128', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Open Claims', value: '12', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Flagged Claims', value: '3', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Payouts Today', value: '₹4,850', icon: Wallet, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  const scenarios = [
    { title: 'Cloudburst in Bangalore', detail: 'Rainfall > 70mm/hr in Koramangala', icon: CloudRain },
    { title: 'AQI Spike in Delhi', detail: 'AQI crosses 450 for rider zones', icon: AlertTriangle },
    { title: 'Instant Payout Test', detail: 'Simulate payout after auto-approved claim', icon: Zap },
  ];

  return (
    <div className="min-h-full w-full p-6 lg:p-8 text-white animate-fade-in">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-2">
          Admin Control Center
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
          Hackathon Scenario Simulator
        </h1>
        <p className="text-slate-400 mt-3 max-w-3xl">
          Use this panel to simulate disruption events, inspect claims behavior, and
          demonstrate GigShield’s parametric workflow live.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md p-5 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="text-xs text-slate-500">LIVE</span>
              </div>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold">Scenario Launcher</h2>
              <p className="text-sm text-slate-400 mt-1">
                Trigger mock events for your final demo flow.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Demo Ready
            </span>
          </div>

          <div className="space-y-4">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <div
                  key={scenario.title}
                  className="rounded-xl border border-white/10 bg-slate-950/40 p-4 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{scenario.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{scenario.detail}</p>
                    </div>
                  </div>

                  <button className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-colors">
                    Trigger
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Admin Feed</h2>
          <div className="space-y-3">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-sm text-blue-300 font-medium">Awaiting simulated event</p>
              <p className="text-xs text-slate-300 mt-1">
                No active disruption has been triggered yet.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm font-medium">Fraud Engine</p>
              <p className="text-xs text-slate-400 mt-1">
                Model status: standby, ready to score incoming claims.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm font-medium">Payout Rail</p>
              <p className="text-xs text-slate-400 mt-1">
                Mock UPI payout service connected for live demonstration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
