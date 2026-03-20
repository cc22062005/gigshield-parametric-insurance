import { Link } from 'react-router-dom';
import { CloudRain, CloudLightning, ShieldCheck, ArrowRight, ShieldAlert, Bike } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-dark-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-brand-500 p-2 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-brand-500">
                GigShield AI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                Admin Demo
              </Link>
              <Link to="/dashboard" className="btn-primary text-sm px-5 py-2">
                Rider Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/30 text-brand-400 text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Protecting 10,000+ Riders Daily
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Ride Fearless. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-500 to-accent-500">
              We Cover the Losses.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            AI-powered parametric insurance for delivery partners. Get instant payouts when extreme weather, pollution, or curfews stop you from earning.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2 text-lg">
              Get Covered Weekly <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="btn-secondary flex items-center justify-center gap-2 text-lg">
              See How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Value Props & Tiers */}
      <div id="how-it-works" className="py-24 bg-dark-800 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Coverage That Makes Sense</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">No long forms, no waiting for claim approvals. Our AI monitors the city and pays out automatically when events hit your zone.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="glass-card flex flex-col items-center text-center group hover:border-brand-500/50 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudRain className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Basic Cover</h3>
              <p className="text-slate-400 mb-6 text-sm">Protection against severe rainfall that halts your deliveries.</p>
              <div className="text-3xl font-bold mb-1 text-white">₹39<span className="text-sm font-normal text-slate-400">/week</span></div>
              <p className="text-xs text-brand-400 mb-6">Pays up to ₹250/day</p>
              <Link to="/dashboard" className="w-full btn-secondary mt-auto">Choose Plan</Link>
            </div>

            {/* Tier 2 */}
            <div className="glass-card flex flex-col items-center text-center border-brand-500/40 relative transform md:-translate-y-4">
              <div className="absolute -top-4 bg-gradient-to-r from-brand-600 to-brand-400 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
              <div className="w-16 h-16 rounded-2xl bg-brand-900/30 flex items-center justify-center mb-6">
                <ShieldAlert className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Standard Cover</h3>
              <p className="text-slate-400 mb-6 text-sm">Heavy Rain + Severe Air Pollution (AQI {'>'} 400) coverage.</p>
<div className="text-3xl font-bold mb-1 text-white">₹69<span className="text-sm font-normal text-slate-400">/week</span></div>
              <p className="text-xs text-brand-400 mb-6">Pays up to ₹500/day</p>
              <Link to="/dashboard" className="w-full btn-primary mt-auto">Choose Plan</Link>
            </div>

            {/* Tier 3 */}
            <div className="glass-card flex flex-col items-center text-center group hover:border-accent-500/50 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudLightning className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pro Cover</h3>
              <p className="text-slate-400 mb-6 text-sm">Comprehensive: Rain, AQI, and Local Curfews/Strikes.</p>
              <div className="text-3xl font-bold mb-1 text-white">₹99<span className="text-sm font-normal text-slate-400">/week</span></div>
              <p className="text-xs text-brand-400 mb-6">Pays up to ₹750/day</p>
              <Link to="/dashboard" className="w-full btn-secondary mt-auto border-accent-500/20 hover:border-accent-500/50">Choose Plan</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for the Gig Economy</h2>
                <p className="text-slate-400 text-lg mb-8">
                  "When the monsoon hits Mumbai, roads flood and I used to lose 3-4 days of earnings. With GigShield, I just press the trigger claim button during heavy rain, and ₹500 drops into my wallet by evening. It pays my bike EMI."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                    <Bike className="w-6 h-6 text-slate-300" />
                  </div>
                  <div>
                    <div className="font-bold">Rahul M.</div>
                    <div className="text-sm text-brand-400">Zomato Rider, Mumbai</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full relative">
                 <div className="absolute inset-0 bg-brand-500/20 filter blur-3xl rounded-full"></div>
                 <div className="glass-card relative border-white/10 p-8 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-8">
                       <span className="text-sm text-slate-400">Payout Confirmed</span>
                       <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">SUCCESS</span>
                    </div>
                    <div className="text-5xl font-black mb-2">₹500.00</div>
                    <p className="text-slate-400 text-sm mb-6">Trigger: Heavy Rainfall {'>'} 15mm/hr in Zone 4 (Andheri)</p>
<div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-gradient-to-r from-green-500 to-brand-500 w-full animate-pulse"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
