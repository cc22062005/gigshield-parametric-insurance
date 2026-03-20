import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Crosshair, AlertTriangle, CloudRain, Activity, Map, Fingerprint, RefreshCcw } from 'lucide-react';

const mockData = [
  { day: 'Mon', claims: 45, triggers: 12 },
  { day: 'Tue', claims: 52, triggers: 15 },
  { day: 'Wed', claims: 300, triggers: 85 }, // Rain day
  { day: 'Thu', claims: 48, triggers: 10 },
  { day: 'Fri', claims: 61, triggers: 18 },
  { day: 'Sat', claims: 120, triggers: 45 },
  { day: 'Sun', claims: 55, triggers: 14 },
];

export default function AdminSimulator() {
  const [fraudMode, setFraudMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<{message: string, type: 'info'|'success'|'error'}[]>([]);

  const addLog = (msg: string, type: 'info'|'success'|'error' = 'info') => {
    setLog(prev => [{message: msg, type}, ...prev.slice(0, 4)]);
  };

  const simulateTrigger = (eventName: string) => {
    setLoading(true);
    addLog(`INIT: Polling Oracle for ${eventName}...`, 'info');
    
    setTimeout(() => {
      addLog(`API MATCH: Threshold exceeded for ${eventName} in Zone 4.`, 'info');
      
      setTimeout(() => {
        addLog(`PROCESSING: Running 1,240 active policies through rules engine...`, 'info');
        
        setTimeout(() => {
           if(fraudMode) {
              addLog(`🛑 FRAUD DETECTED (Raj K.): GPS Mocking Software signal found. Claim ID #8841 REJECTED.`, 'error');
           } else {
              addLog(`✅ SUCCESS: Instant Payouts processed. ₹500 sent to Raj K. via Wallet.`, 'success');
           }
           setLoading(false);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20 font-sans">
      <nav className="bg-dark-800 border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand-500" />
              <span className="font-bold text-lg tracking-wide hidden sm:block text-slate-300">GigShield <span className="text-white">Admin / Oracle Demo</span></span>
            </Link>
            <div className="flex gap-4">
               <Link to="/dashboard" className="text-sm border border-slate-600 px-4 py-1.5 rounded-lg hover:bg-slate-700 transition">Rider UI</Link>
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* System Logs & Actions - Span 4 */}
         <div className="lg:col-span-4 space-y-6">
            <div className="glass-card border-brand-500/20">
               <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Crosshair className="w-5 h-5 text-brand-400"/> Trigger Simulator</h2>
               <p className="text-sm text-slate-400 mb-6">Manually fire an oracle event to test the smart contracts and rules engine.</p>
               
               <div className="space-y-3">
                  <button 
                    onClick={() => simulateTrigger('Continuous Rain >15mm/hr')}
                    disabled={loading}
                    className="w-full btn-secondary flex items-center justify-between group disabled:opacity-50"
                  >
                    <span className="flex items-center gap-2"><CloudRain className="w-4 h-4 text-blue-400" /> Simulate Rain Storm</span>
                    <ArrowIcon />
                  </button>
                  <button 
                    onClick={() => simulateTrigger('Curfew / Sec 144')}
                    disabled={loading}
                    className="w-full btn-secondary flex items-center justify-between group disabled:opacity-50"
                  >
                    <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-accent-500" /> Simulate Local Curfew</span>
                    <ArrowIcon />
                  </button>
                  <button 
                     onClick={() => simulateTrigger('Severe AQI > 400')}
                     disabled={loading}
                     className="w-full btn-secondary flex items-center justify-between group disabled:opacity-50"
                   >
                     <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-slate-400" /> Simulate Smog/Pollution</span>
                     <ArrowIcon />
                   </button>
               </div>
            </div>

            <div className="glass-card border-red-500/20">
               <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Fingerprint className="w-5 h-5 text-red-400"/> Fraud Defense Demo</h2>
               <p className="text-sm text-slate-400 mb-6">Toggle adversarial attacks to see GigShield's anti-spoofing mechanism reject bad actors.</p>
               
               <label className="flex items-center cursor-pointer p-4 bg-dark-900 rounded-xl border border-slate-700">
                  <div className="relative">
                     <input type="checkbox" className="sr-only" checked={fraudMode} onChange={() => setFraudMode(!fraudMode)} />
                     <div className={`block w-14 h-8 rounded-full ${fraudMode ? 'bg-red-500' : 'bg-slate-600'} transition-colors`}></div>
                     <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${fraudMode ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <div className="ml-4">
                     <div className="font-bold text-sm text-white">Device GPS Spoofing</div>
                     <div className="text-xs text-slate-400">Mock Location Enabled on device</div>
                  </div>
               </label>
            </div>
         </div>

         {/* Maps & Graphs - Span 8 */}
         <div className="lg:col-span-8 space-y-6">
            
            {/* Live Terminal */}
            <div className="bg-black border border-slate-800 rounded-2xl p-4 font-mono text-sm relative overflow-hidden h-64 flex flex-col">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Map className="w-32 h-32" /></div>
               <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
                 <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-500' : ''}`} /> Oracle Sync Terminal
               </div>
               <div className="flex-1 overflow-y-auto space-y-2 relative z-10 flex flex-col justify-end">
                  {[...log].reverse().map((l, i) => (
                    <div key={i} className={`flex items-start gap-2 ${l.type === 'error' ? 'text-red-400' : l.type === 'success' ? 'text-green-400' : 'text-slate-300'}`}>
                       <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                       <span>{l.message}</span>
                    </div>
                  ))}
                  {log.length === 0 && <span className="text-slate-600">Waiting for trigger events...</span>}
               </div>
            </div>

            {/* Analytics Dashboard */}
            <div className="glass-card">
               <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Activity className="w-5 h-5"/> Live Claims Analytics (7 Days)</h3>
               <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="day" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                         itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="claims" stroke="#3B82F6" fillOpacity={1} fill="url(#colorClaims)" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

         </div>

      </main>
    </div>
  );
}

function ArrowIcon() {
  return <span className="group-hover:translate-x-1 transition-transform">→</span>
}
