import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, CloudRain, Activity, MapPin, AlertCircle, Wallet,
  Clock, TrendingUp, Zap, FileText, ChevronRight, CloudLightning,
  Wind, Thermometer, AlertTriangle, Ban, Check, CheckCircle2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import ChartCard from '../components/ChartCard';
import api from '../services/api';

// Mock data for charts
const riskTrend = [
  { day: 'Mon', score: 65 }, { day: 'Tue', score: 68 }, { day: 'Wed', score: 78 },
  { day: 'Thu', score: 72 }, { day: 'Fri', score: 70 }, { day: 'Sat', score: 82 }, { day: 'Sun', score: 75 },
];

const triggerDist = [
  { name: 'Rain', value: 45, color: '#3b82f6' },
  { name: 'AQI', value: 25, color: '#a855f7' },
  { name: 'Heat', value: 15, color: '#f97316' },
  { name: 'Curfew', value: 10, color: '#eab308' },
  { name: 'Flood', value: 5, color: '#06b6d4' },
];

const initialClaimHistory = [
  { id: 'clm-001', date: 'Mar 26, 2026', trigger: 'Heavy Rain', triggerIcon: CloudRain, iconColor: 'text-blue-400', status: 'paid', amount: 250, fraudScore: 95 },
  { id: 'clm-002', date: 'Mar 31, 2026', trigger: 'Severe AQI', triggerIcon: Wind, iconColor: 'text-purple-400', status: 'approved', amount: 500, fraudScore: 91 },
  { id: 'clm-004', date: 'Mar 28, 2026', trigger: 'Heavy Rain', triggerIcon: CloudRain, iconColor: 'text-blue-400', status: 'rejected', amount: 0, fraudScore: null },
];

const triggers = [
  { name: 'Rainfall', icon: CloudRain, value: '8.2mm/hr', threshold: '15mm/hr', color: 'text-blue-400', bg: 'bg-blue-500/10', active: false },
  { name: 'AQI Level', icon: Wind, value: 'AQI 342', threshold: 'AQI 400', color: 'text-purple-400', bg: 'bg-purple-500/10', active: false },
  { name: 'Temperature', icon: Thermometer, value: '38°C', threshold: '45°C', color: 'text-orange-400', bg: 'bg-orange-500/10', active: false },
  { name: 'Curfew', icon: AlertTriangle, value: 'Inactive', threshold: 'Active', color: 'text-amber-400', bg: 'bg-amber-500/10', active: false },
];

export default function Dashboard() {
  const [activePlan] = useState<string>('Standard Cover');
  const [balance, setBalance] = useState(1250);
  const [riskScore] = useState(72);
  const [claimHistory, setClaimHistory] = useState(initialClaimHistory);
  
  // Notification States
  const [notification, setNotification] = useState<{title: string, desc: string, show: boolean, type: 'alert'|'success'}>({title: '', desc: '', show: false, type: 'alert'});

  const triggerInstantPayoutDemo = async () => {
    // 1. Alert event matched
    setNotification({ title: 'Rainfall Event Detected', desc: 'Validating zone data against active policy...', show: true, type: 'alert' });
    
    setTimeout(async () => {
      // 2. ML Fraud Verify
      setNotification({ title: 'ML Fraud Check', desc: 'Evaluating telemetry integrity...', show: true, type: 'alert' });
      const mlRes = await api.post('/claims/fraud-check', { claimId: 'clm_demo' });
      
      setTimeout(() => {
        // 3. Paid
        setBalance(prev => prev + 500);
        setClaimHistory(prev => [{
            id: `clm-demo-${Date.now()}`, date: 'Now', trigger: 'Cloudburst Demo', triggerIcon: CloudRain, iconColor: 'text-blue-400', status: 'paid', amount: 500, fraudScore: 98
          }, ...prev]);
        setNotification({ title: 'Payout Successful', desc: '₹500 automatically credited to your wallet via UPI.', show: true, type: 'success' });
        
        // Hide notification after 4s
        setTimeout(() => setNotification({ ...notification, show: false }), 4000);
      }, 1500);
    }, 2000);
  };

  return (
    <>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in relative z-0 min-h-full">
        
        {/* Floating Notification Panel */}
        {notification.show && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce-in w-full max-w-sm">
            <div className={`p-4 rounded-xl border shadow-2xl backdrop-blur-md ${notification.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-100' : 'bg-blue-500/20 border-blue-500/40 text-blue-100'} flex items-start gap-4`}>
              {notification.type === 'success' ? <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400"/> : <Zap className="w-6 h-6 shrink-0 text-blue-400 animate-pulse"/>}
              <div>
                <h4 className="font-bold">{notification.title}</h4>
                <p className="text-sm opacity-90 mt-1">{notification.desc}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Header ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, Raj</h1>
            <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400" /> Zone 4: Andheri East, Mumbai
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 bg-dark-800 px-4 py-2 rounded-xl border transition-all duration-500 ${notification.type === 'success' ? 'border-brand-500 shadow-glow-green scale-105' : 'border-dark-600'}`}>
              <Wallet className="w-4 h-4 text-brand-400" />
              <span className="font-mono font-semibold text-sm text-white">₹{balance.toFixed(2)}</span>
            </div>
            <Link to="/policies" className="btn-primary text-sm !py-2">
              Buy Policy <ChevronRight className="w-4 h-4 ml-1 inline" />
            </Link>
          </div>
        </div>

        {/* ── KPI Row ─────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard icon={ShieldCheck} label="Active Policy" value={activePlan} trend={{ value: '7d left', positive: true }} />
          <KPICard icon={Wallet} label="Weekly Premium" value="₹97" iconColor="text-emerald-400" iconBg="bg-emerald-500/10" />
          <KPICard icon={Clock} label="Coverage Hours" value="168h" trend={{ value: '24/7', positive: true }} iconColor="text-blue-400" iconBg="bg-blue-500/10" />
          <KPICard icon={TrendingUp} label="Total Protected" value="₹47,500" trend={{ value: '+12%', positive: true }} iconColor="text-amber-400" iconBg="bg-amber-500/10" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Left Column ───────────────────── */}
          <div className="space-y-6">
            {/* Active Policy Card */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-400" /> Active Policy
                </h3>
                <StatusBadge status="active" />
              </div>
              <div className="bg-brand-500/5 border border-brand-500/15 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-500 blur-3xl opacity-10" />
                <p className="text-xs text-brand-300 font-semibold tracking-wider mb-1">WEEKLY COVER</p>
                <h4 className="text-xl font-bold text-white mb-3">{activePlan}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Premium</span> <span className="text-white font-semibold">₹97/week</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Max Payout</span> <span className="text-white font-semibold">₹500/day</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Valid Until</span> <span className="text-slate-300">Apr 06, 11:59 PM</span></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Rain', 'AQI'].map(t => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">{t}</span>
                  ))}
                </div>
              </div>
              <button onClick={triggerInstantPayoutDemo} disabled={notification.show} className="mt-4 w-full btn-secondary text-xs flex items-center justify-center gap-2 !py-2 disabled:opacity-50">
                <Zap className="w-3.5 h-3.5" /> Simulate Instant Payout Push
              </button>
            </div>

            {/* Risk Score */}
            <div className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-400" /> Insurer Risk Score
                </h3>
                <span className="text-lg font-bold text-brand-400">{riskScore}/100</span>
              </div>
              <div className="h-2.5 w-full bg-dark-700 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 via-amber-500 to-red-500 transition-all duration-1000"
                  style={{ width: `${riskScore}%` }}
                />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Weather Risk</span> <span className="text-slate-300">82/100</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Pollution</span> <span className="text-slate-300">60/100</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Disruptions</span> <span className="text-slate-300">70/100</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Claim History</span> <span className="text-slate-300">50/100</span></div>
              </div>
              <div className="mt-4 flex gap-2 items-start bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/70">High rain probability this week. Pro Cover recommended.</p>
              </div>
            </div>
          </div>

          {/* ── Middle Column ─────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Trigger Status */}
            <div className="glass-card">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-400" /> Live Trigger Monitor
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-brand-500/10 text-brand-400">REAL-TIME</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {triggers.map((t, i) => (
                  <div key={i} className={`rounded-xl p-3 border ${t.active ? 'border-red-500/30 bg-red-500/5' : 'border-white/[0.04] bg-dark-800/40'}`}>
                    <div className={`w-8 h-8 rounded-lg ${t.bg} flex items-center justify-center mb-2`}>
                      <t.icon className={`w-4 h-4 ${t.color}`} />
                    </div>
                    <p className="text-xs text-slate-400">{t.name}</p>
                    <p className="text-sm font-semibold text-white">{t.value}</p>
                    <p className="text-[10px] text-slate-500">Threshold: {t.threshold}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid sm:grid-cols-2 gap-6">
              <ChartCard title="Risk Score Trend" subtitle="Last 7 days">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={riskTrend}>
                      <defs>
                        <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#475569" tick={{ fontSize: 11 }} domain={[50, 100]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} fill="url(#riskGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard title="Trigger Distribution" subtitle="Your zone past 30 days">
                <div className="h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={triggerDist} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                        {triggerDist.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {triggerDist.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name} {d.value}%
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Claims History Table */}
            <div className="glass-card !p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-400" /> Recent Claims
                </h3>
                <Link to="/claims" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                  View All →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-dark-800/50">
                      <th className="table-header text-left px-6 py-3">Date</th>
                      <th className="table-header text-left px-6 py-3">Trigger</th>
                      <th className="table-header text-left px-6 py-3">Status</th>
                      <th className="table-header text-left px-6 py-3">Fraud Integrity</th>
                      <th className="table-header text-right px-6 py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claimHistory.map(claim => (
                      <tr key={claim.id} className="table-row transition-all duration-300">
                        <td className="px-6 py-3.5 text-slate-400">{claim.date}</td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2">
                            <claim.triggerIcon className={`w-4 h-4 ${claim.iconColor}`} />
                            <span className="text-white">{claim.trigger}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5"><StatusBadge status={claim.status} /></td>
                        <td className="px-6 py-3.5">
                          {claim.fraudScore ? (
                            <span className="text-xs font-mono text-brand-400">Score Verified ✓</span>
                          ) : (
                            <span className="text-xs text-slate-500">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          {claim.amount > 0 ? (
                           <span className="font-mono text-brand-400 font-semibold">+ ₹{claim.amount}</span>
                          ) : (
                            <span className="text-slate-500">₹0</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
