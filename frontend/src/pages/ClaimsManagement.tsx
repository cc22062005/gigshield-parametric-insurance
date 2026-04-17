import { Activity, ShieldCheck, AlertTriangle, CloudRain, Wind, ActivitySquare, ShieldAlert, BadgeCheck, CheckCircle2, ChevronRight, XCircle, Search } from 'lucide-react';

const CLAIMS = [
  {
    id: 'CLM-89241',
    date: 'Apr 17, 2026',
    time: '14:22:05',
    trigger: 'Heavy Rain (75mm/hr)',
    zone: 'Bangalore - Koramangala',
    amount: 500,
    status: 'paid',
    mlScore: 0.08,
    mlDecision: 'High Integrity',
    icon: CloudRain,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20'
  },
  {
    id: 'CLM-89240',
    date: 'Apr 16, 2026',
    time: '09:15:30',
    trigger: 'Severe AQI (> 450)',
    zone: 'Delhi - NCR',
    amount: 850,
    status: 'flagged',
    mlScore: 0.88,
    mlDecision: 'Anomaly Detected',
    icon: Wind,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20'
  },
  {
    id: 'CLM-89231',
    date: 'Apr 14, 2026',
    time: '18:45:10',
    trigger: 'Heavy Rain (60mm/hr)',
    zone: 'Mumbai - Andheri',
    amount: 500,
    status: 'paid',
    mlScore: 0.12,
    mlDecision: 'High Integrity',
    icon: CloudRain,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20'
  }
];

export default function ClaimsManagement() {
  return (
    <>
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in min-h-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <ActivitySquare className="w-8 h-8 text-brand-400" /> Payout Intelligence
            </h1>
            <p className="text-slate-400 mt-2 text-sm leading-relaxed">
              Every payout is governed by our hybrid intelligence engine. Meteorological APIs confirm the event, while the Python ML Microservice screens user telemetry to block fraudulent injections in real-time.
            </p>
          </div>
        </div>

        {/* Global Pipeline KPIs */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-dark-800/60 p-6 rounded-2xl border border-white/[0.06] backdrop-blur-xl relative overflow-hidden group hover:border-brand-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500 blur-3xl opacity-[0.15] group-hover:opacity-30 transition-opacity" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Protected Events</p>
            <p className="text-3xl font-bold text-white">1,248</p>
            <p className="text-xs text-brand-400 mt-2 flex items-center gap-1"><BadgeCheck className="w-3.5 h-3.5"/> Parameter Verified</p>
          </div>
          
          <div className="bg-dark-800/60 p-6 rounded-2xl border border-white/[0.06] backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500 blur-3xl opacity-[0.15] group-hover:opacity-30 transition-opacity" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Fraud Block Rate</p>
            <p className="text-3xl font-bold text-white">14.2%</p>
             <p className="text-xs text-amber-400 mt-2 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5"/> Intercepted by ML</p>
          </div>

          <div className="bg-dark-800/60 p-6 rounded-2xl border border-white/[0.06] backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 blur-3xl opacity-[0.15] group-hover:opacity-30 transition-opacity" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Resolution Time</p>
            <p className="text-3xl font-bold text-white">1.8s</p>
            <p className="text-xs text-blue-400 mt-2 flex items-center gap-1"><Activity className="w-3.5 h-3.5"/> Zero-Touch Processing</p>
          </div>
        </div>

        {/* Live Claims Monitoring List */}
        <div className="w-full space-y-6">
           <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Search className="w-4 h-4 text-brand-400"/> Recent Payout Activity
           </h3>

           <div className="space-y-4">
             {CLAIMS.map((claim) => (
                <div key={claim.id} className="bg-dark-800/40 border border-white/[0.06] rounded-2xl p-5 hover:bg-dark-800/60 transition-colors flex flex-col lg:flex-row lg:items-center gap-6 relative overflow-hidden">
                   
                   {/* Left: Event Details */}
                   <div className="flex items-center gap-4 lg:w-1/3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${claim.bg}`}>
                        <claim.icon className={`w-5 h-5 ${claim.color}`} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">{claim.trigger}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{claim.id} • {claim.zone}</p>
                      </div>
                   </div>

                   {/* Middle: ML Pipeline */}
                   <div className="flex-1 flex flex-col justify-center px-4 py-2 lg:py-0 border-y lg:border-y-0 lg:border-x border-white/[0.04]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Fraud Sentinel ML</span>
                        {claim.status === 'paid' ? (
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{claim.mlDecision}</span>
                        ) : (
                          <span className="text-[10px] text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">{claim.mlDecision}</span>
                        )}
                      </div>
                      <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${claim.status === 'paid' ? 'bg-emerald-500' : 'bg-red-500'}`} 
                          style={{ width: `${claim.status === 'paid' ? 10 : 90}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1.5 font-mono">
                         Anomaly Confidence: <span className={claim.status === 'paid' ? 'text-emerald-400' : 'text-red-500'}>{(claim.mlScore).toFixed(2)}</span> / 1.00
                      </p>
                   </div>

                   {/* Right: Payout Result */}
                   <div className="flex items-center justify-between lg:w-1/4 lg:justify-end gap-6">
                      <div className="text-left lg:text-right">
                         <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Impact</p>
                         {claim.status === 'paid' ? (
                            <p className="text-xl font-bold font-mono text-emerald-400">+ ₹{claim.amount}</p>
                         ) : (
                            <p className="text-xl font-bold font-mono text-slate-600 line-through">₹{claim.amount}</p>
                         )}
                      </div>
                      <div>
                        {claim.status === 'paid' ? (
                           <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                             <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                           </div>
                        ) : (
                           <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                             <AlertTriangle className="w-5 h-5 text-amber-500" />
                           </div>
                        )}
                      </div>
                   </div>

                </div>
             ))}
           </div>
        </div>

      </div>
    </>
  );
}
