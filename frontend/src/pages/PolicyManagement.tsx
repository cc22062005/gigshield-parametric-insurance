import { useState } from 'react';
import { ShieldCheck, CloudRain, Wind, Thermometer, AlertTriangle, CloudLightning, ShieldAlert, Zap, Lock, FilterX, HelpCircle, CheckCircle2, Search, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    name: 'Basic Cover',
    price: 49,
    maxPayout: 250,
    features: ['Heavy Rainfall (Cloudbursts)', 'Section 144 / Curfews'],
    exclusions: ['Severe AQI', 'Extreme Heat (Heatwaves)', 'Flash Floods'],
    popular: false,
    color: 'from-blue-500/10 to-blue-500/5',
    buttonClass: 'btn-secondary',
    borderClass: 'border-white/[0.06]',
  },
  {
    name: 'Standard Cover',
    price: 99,
    maxPayout: 500,
    features: ['Heavy Rainfall (Cloudbursts)', 'Severe AQI (> 400)', 'Section 144 / Curfews'],
    exclusions: ['Extreme Heat (Heatwaves)', 'Flash Floods'],
    popular: true,
    color: 'from-brand-500/20 to-brand-600/5',
    buttonClass: 'btn-primary shadow-glow-brand hover:scale-105',
    borderClass: 'border-brand-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-brand-500/20',
  },
  {
    name: 'Pro Cover',
    price: 149,
    maxPayout: 1000,
    features: ['Heavy Rainfall (Cloudbursts)', 'Severe AQI (> 400)', 'Extreme Heat (Heatwaves)', 'Section 144 / Curfews', 'Flash Floods'],
    exclusions: [],
    popular: false,
    color: 'from-amber-500/10 to-amber-500/5',
    buttonClass: 'btn-secondary',
    borderClass: 'border-white/[0.06]',
  }
];

export default function PolicyManagement() {
  const [activeTab, setActiveTab] = useState<'buy' | 'active'>('buy');
  const [selectedZone, setSelectedZone] = useState('Bangalore - Koramangala');

  return (
    <>
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in min-h-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-brand-400" /> Loss-of-Income Protection
            </h1>
            <p className="text-slate-400 mt-2 text-sm leading-relaxed">
              Secure your daily earnings against external disruptions. If a verified environmental or civil event stops you from working,
              the GigShield Smart Contract pays you instantly based on fixed parametric triggers. Zero claims adjusters, zero paperwork.
            </p>
          </div>
          
          <div className="flex bg-dark-800 p-1 rounded-xl border border-white/[0.04]">
            <button 
              onClick={() => setActiveTab('buy')}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'buy' ? 'bg-brand-500/20 text-brand-400' : 'text-slate-400 hover:text-white'}`}
            >
              Browse Plans
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'active' ? 'bg-brand-500/20 text-brand-400' : 'text-slate-400 hover:text-white'}`}
            >
              Active Policies
            </button>
          </div>
        </div>

        {activeTab === 'buy' ? (
          <div className="space-y-10">
            
            {/* Zone Selector */}
            <div className="flex items-center gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl w-full max-w-md">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Operating Zone</p>
                <select 
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full bg-transparent border-none text-white font-medium text-sm focus:ring-0 p-0 cursor-pointer outline-none"
                >
                  <option className="bg-dark-900 text-white">Bangalore - Koramangala</option>
                  <option className="bg-dark-900 text-white">Mumbai - Andheri</option>
                  <option className="bg-dark-900 text-white">Delhi - NCR</option>
                </select>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              {PLANS.map((plan, i) => (
                <div key={i} className={`relative bg-dark-800/60 backdrop-blur-xl rounded-3xl p-8 border ${plan.borderClass} transition-all duration-300 ${plan.popular ? 'lg:scale-105 z-10' : 'hover:border-white/[0.15]'}`}>
                  
                  {plan.popular && (
                    <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                      <span className="bg-brand-500 text-dark-900 text-[10px] font-extrabold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-glow-brand">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${plan.color} blur-3xl rounded-full opacity-60 pointer-events-none`} />

                  <div className="relative">
                    <h3 className="text-lg font-medium text-white">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-4xl font-bold tracking-tight text-white">₹{plan.price}</span>
                      <span className="text-slate-400 text-sm">/ week</span>
                    </div>
                    <p className="mt-2 text-sm text-brand-400 font-medium">Up to ₹{plan.maxPayout}/day payout</p>

                    <button className={`w-full mt-8 py-3 rounded-xl transition-all font-semibold ${plan.buttonClass}`}>
                      Select Plan <ArrowRight className="w-4 h-4 ml-1 inline" />
                    </button>

                    <div className="mt-8 space-y-6">
                      {/* Included */}
                      <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Covered Triggers</p>
                        <ul className="space-y-3">
                          {plan.features.map(f => (
                            <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Excluded */}
                      {plan.exclusions.length > 0 && (
                        <div>
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-t border-white/[0.04] pt-4">Not Covered</p>
                           <ul className="space-y-3 opacity-60">
                            {plan.exclusions.map(f => (
                              <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                                <FilterX className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Trust Footer */}
            <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="w-4 h-4 text-slate-400" /> Guaranteed instant UPI payout when meteorological parametric thresholds are met.
            </div>

          </div>
        ) : (
          <div className="space-y-6">
             {/* Active Policies View */}
             <div className="bg-gradient-to-r from-brand-500/10 to-transparent border-l-4 border-brand-500 p-6 rounded-r-2xl bg-dark-800/40">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-2.5 py-1 rounded bg-brand-500/20 text-brand-400 text-[10px] font-bold uppercase tracking-widest border border-brand-500/20">Active</span>
                       <h3 className="text-xl font-bold text-white">Standard Cover</h3>
                    </div>
                    <p className="text-slate-400 text-sm flex items-center gap-2"><Search className="w-3.5 h-3.5"/> Bangalore - Koramangala Zone</p>
                  </div>
                  <div className="text-left md:text-right">
                     <p className="text-slate-400 text-xs uppercase mb-1">Max Payout Limit</p>
                     <p className="text-2xl font-mono text-white">₹500 <span className="text-sm font-sans text-slate-500">/ day</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-white/[0.04] pt-6">
                   <div>
                     <p className="text-xs text-slate-500 mb-1">Premium</p>
                     <p className="text-sm font-semibold text-white">₹99/week</p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 mb-1">Coverage Start</p>
                     <p className="text-sm font-semibold text-white">Apr 10, 2026</p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 mb-1">Valid Until</p>
                     <p className="text-sm font-semibold text-white">Apr 17, 2026</p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 mb-1">Status</p>
                     <p className="text-sm font-semibold text-brand-400 flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-brand-400" fill="currentColor"/> Monitoring API</p>
                   </div>
                </div>
             </div>

             <div className="border border-white/[0.06] bg-dark-800/40 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                   <ShieldAlert className="w-4 h-4 text-brand-400"/> General Policy Exclusions
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Health & Medical', 'Accidents / Collisions', 'Vehicle Maintenance', 'Personal Liability'].map(ex => (
                    <div key={ex} className="p-3 bg-dark-900 border border-white/[0.04] rounded-xl flex items-center gap-2.5">
                       <div className="w-6 h-6 rounded bg-red-500/10 flex items-center justify-center shrink-0">
                         <FilterX className="w-3.5 h-3.5 text-red-400" />
                       </div>
                       <span className="text-xs text-slate-400 font-medium">{ex}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

      </div>
    </>
  );
}
