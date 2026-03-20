import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CloudRain, ShieldAlert, History, User, IndianRupee, MapPin, Activity, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [balance, setBalance] = useState(1250);
  const [riskScore, setRiskScore] = useState(72); // AI Mock score

  // Mock processing buying policy
  const handleBuyPlan = (planName: string, amount: number) => {
     if(balance < amount) return alert("Insufficient wallet balance.");
     setBalance(prev => prev - amount);
     setActivePlan(planName);
     
     // Trigger Confetti or Toast here in real app
     setTimeout(() => {
        alert(`Successfully covered by ${planName} plan for this week!`);
     }, 300);
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Top Navbar */}
      <nav className="bg-dark-800 border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand-500" />
              <span className="font-bold text-lg tracking-wide hidden sm:block">GigShield</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-dark-900 px-4 py-2 rounded-full border border-slate-700">
                <IndianRupee className="w-4 h-4 text-green-400" />
                <span className="font-mono font-bold text-sm tracking-widest">{balance.toFixed(2)}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
                <User className="w-5 h-5 text-slate-300" />
              </div>
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Profile & Risk Score */}
        <div className="space-y-6">
           <div className="glass-card flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4 relative overflow-hidden ring-4 ring-brand-500/20">
                 <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Rider Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold">Raj Kumar</h2>
              <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                 <MapPin className="w-3 h-3" /> Zone 4: Andheri East
              </p>
              
              <div className="w-full h-[1px] bg-slate-700 my-6"></div>
              
              <div className="w-full">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400 flex items-center gap-2"><Activity className="w-4 h-4 text-brand-400"/> AI Risk Score</span>
                    <span className="font-bold text-brand-400">{riskScore}/100</span>
                 </div>
                 <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{ width: `${riskScore}%` }}></div>
                 </div>
                 <div className="mt-3 flex gap-2 items-start bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                   <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                   <p className="text-xs text-yellow-200/70">Warning: High rain probability in your zone this week. Recommend upgrading risk tier.</p>
                 </div>
              </div>
           </div>

           {/* Active Coverage */}
           <div className="glass-card">
               <h3 className="font-bold text-lg mb-4 flex items-center gap-2 opacity-90"><ShieldCheck className="w-5 h-5 text-green-400"/> Active Policy</h3>
               
               {activePlan ? (
                 <div className="bg-brand-900/40 border border-brand-500/30 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500 blur-2xl opacity-20"></div>
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-xs text-brand-300 font-bold tracking-wider mb-1">WEEKLY COVER</p>
                          <h4 className="text-2xl font-black text-white">{activePlan}</h4>
                       </div>
                       <div className="px-2 py-1 text-xs font-bold bg-green-500/20 text-green-400 rounded">ACTIVE</div>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex justify-between"><span>Max Payout</span> <span className="font-bold text-white">₹500/day</span></div>
                      <div className="flex justify-between"><span>Valid Until</span> <span>Sun, 11:59 PM</span></div>
                    </div>
                    <Link to="/admin" className="mt-6 w-full btn-secondary text-sm py-2 bg-dark-900 justify-center flex">Simulate Claim Trigger (Demo)</Link>
                 </div>
               ) : (
                 <div className="border border-dashed border-slate-600 rounded-xl p-6 text-center">
                    <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm text-slate-400">No active coverage for this week.</p>
                    <p className="text-xs mt-1 text-brand-400">Purchase a plan to secure your earnings.</p>
                 </div>
               )}
           </div>
        </div>

        {/* Right Col: Buy UI & History */}
        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-2xl font-bold mb-6">Weekly Protections</h2>
           
           <div className="grid sm:grid-cols-2 gap-4 auto-rows-fr">
              {/* Plan 1 */}
              <div className={`p-6 rounded-2xl border transition-all cursor-pointer hover:border-blue-400/50 ${activePlan === 'Basic Cover' ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-dark-800/60 border-slate-700/50'}`}>
                 <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-800 p-2 rounded-lg">
                      <CloudRain className="text-blue-400 w-6 h-6" />
                    </div>
                    <div className="text-right">
                       <span className="text-2xl font-black">₹39</span><span className="text-sm text-slate-400">/wk</span>
                    </div>
                 </div>
                 <h3 className="font-bold text-lg text-white mb-1">Basic Cover</h3>
                 <p className="text-sm text-slate-400 mb-4 h-10">Covers heavy rainfall disrupting deliveries.</p>
                 <button 
                  onClick={() => handleBuyPlan('Basic Cover', 39)}
                  disabled={activePlan === 'Basic Cover'}
                  className={`w-full py-2 rounded-lg font-medium text-sm transition-all ${activePlan === 'Basic Cover' ? 'bg-blue-500/20 text-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                 >
                   {activePlan === 'Basic Cover' ? 'Current Plan' : 'Buy for ₹39'}
                 </button>
              </div>

              {/* Plan 2 */}
              <div className={`p-6 rounded-2xl border transition-all cursor-pointer hover:border-brand-400/50 ${activePlan === 'Standard Cover' ? 'bg-brand-900/20 border-brand-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-dark-800/60 border-slate-700/50 relative overflow-hidden'}`}>
                 {activePlan !== 'Standard Cover' && <div className="absolute top-0 right-0 py-1 px-3 bg-brand-600 text-[10px] font-black tracking-widest rounded-bl-lg">RECOMMENDED</div>}
                 
                 <div className="flex justify-between items-start mb-4">
                    <div className="bg-brand-900/30 p-2 rounded-lg">
                      <ShieldAlert className="text-brand-400 w-6 h-6" />
                    </div>
                    <div className="text-right">
                       <span className="text-2xl font-black">₹69</span><span className="text-sm text-slate-400">/wk</span>
                    </div>
                 </div>
                 <h3 className="font-bold text-lg text-white mb-1">Standard Cover</h3>
                 <p className="text-sm text-slate-400 mb-4 h-10">Rain + Severe AQI. Up to ₹500/day payout.</p>
                 <button 
                  onClick={() => handleBuyPlan('Standard Cover', 69)}
                  disabled={activePlan === 'Standard Cover'}
                  className={`w-full py-2 rounded-lg font-medium text-sm transition-all ${activePlan === 'Standard Cover' ? 'bg-brand-500/20 text-brand-400 cursor-not-allowed' : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-lg shadow-brand-500/20'}`}
                 >
                   {activePlan === 'Standard Cover' ? 'Current Plan' : 'Buy for ₹69'}
                 </button>
              </div>
           </div>

           <div className="mt-8">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><History className="w-5 h-5" /> Recent Claim History</h3>
             <div className="glass-card !p-0 overflow-hidden text-sm">
                <div className="grid grid-cols-4 gap-4 p-4 bg-slate-800/50 font-semibold text-slate-300">
                   <div>Date</div>
                   <div>Trigger</div>
                   <div>Status</div>
                   <div className="text-right">Amount</div>
                </div>
                <div className="divide-y divide-slate-700/50">
                   <div className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="text-slate-400">Oct 12, 2025</div>
                      <div className="flex items-center gap-2"><CloudRain className="w-4 h-4 text-blue-400"/> Heavy Rain</div>
                      <div><span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded text-xs font-bold">PAID</span></div>
                      <div className="text-right font-mono text-white">+ ₹250.00</div>
                   </div>
                   <div className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div className="text-slate-400">Sep 04, 2025</div>
                      <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-yellow-400"/> Local Strike</div>
                      <div><span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-1 rounded text-xs font-bold">REJECTED</span></div>
                      <div className="text-right text-slate-500">₹0.00</div>
                   </div>
                </div>
             </div>
           </div>

        </div>
      </main>
    </div>
  );
}
