import { Link } from 'react-router-dom';
import {
  ShieldCheck, ArrowRight, CloudRain, CloudLightning, Wind, Thermometer,
  AlertTriangle, Ban, Zap, Clock, Wallet, ChevronRight, Check, X,
  Shield, Activity, MapPin, Star
} from 'lucide-react';

const COVERAGE_ITEMS = [
  { icon: CloudRain, label: 'Heavy Rainfall', desc: '>15mm/hr disruptions', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: CloudLightning, label: 'Flood Alerts', desc: 'NDMA level triggers', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: Thermometer, label: 'Extreme Heat', desc: '>45°C heatwave', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: Wind, label: 'Severe AQI', desc: '>400 pollution level', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: AlertTriangle, label: 'Curfew / Strikes', desc: 'Section 144 orders', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Ban, label: 'Zone Closures', desc: 'App zone shutdowns', color: 'text-red-400', bg: 'bg-red-500/10' },
];

const EXCLUSIONS = [
  'Health insurance or medical bills',
  'Life insurance or death benefits',
  'Accident or bodily injury coverage',
  'Vehicle repair or breakdown costs',
];

const HOW_STEPS = [
  { num: '01', title: 'Subscribe Weekly', desc: 'Choose a plan from ₹39/week. No lock-in, no paperwork.', icon: Wallet },
  { num: '02', title: 'AI Monitors Events', desc: 'Our oracle watches weather, AQI, curfews in your zone 24/7.', icon: Activity },
  { num: '03', title: 'Instant Auto-Payout', desc: 'Threshold crossed? Payout hits your wallet in 30 minutes.', icon: Zap },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden font-sans">
      {/* ── Navbar ─────────────────────────────────── */}
      <nav className="fixed w-full z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-glow-green">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                GigShield<span className="text-brand-400"> AI</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/admin" className="btn-ghost text-sm hidden sm:block">
                Admin Demo
              </Link>
              <Link to="/dashboard" className="btn-primary text-sm !py-2 !px-5">
                Rider Login <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.07] animate-blob" />
          <div className="absolute top-60 -left-20 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.05] animate-blob animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                </span>
                Protecting 10,000+ Riders Daily
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                Protect Your{' '}
                <span className="text-gradient">Earnings.</span>
                <br />
                Not Your Health.
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                AI-powered <strong className="text-white">parametric insurance</strong> for delivery partners.
                Get <strong className="text-brand-400">instant payouts</strong> when rain, floods, pollution, or curfews
                stop your deliveries. <span className="text-slate-500">Starting ₹39/week.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2 text-base">
                  Get Covered This Week <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#how-it-works" className="btn-secondary flex items-center justify-center gap-2 text-base">
                  How It Works
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-500" />
                  <span>IRDAI Sandbox</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-brand-500" />
                  <span>₹2Cr+ Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <span>8 Cities</span>
                </div>
              </div>
            </div>

            {/* Right: Payout Card Mock */}
            <div className="relative animate-slide-up hidden lg:block">
              <div className="absolute inset-0 bg-brand-500/10 filter blur-[60px] rounded-full" />
              <div className="relative">
                {/* Main card */}
                <div className="glass-card border-brand-500/20 p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-brand-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-300">Auto-Payout Confirmed</span>
                    </div>
                    <span className="badge-paid">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                      PAID
                    </span>
                  </div>
                  <div className="text-5xl font-black text-white mb-2">₹500<span className="text-slate-500 text-lg">.00</span></div>
                  <p className="text-sm text-slate-400 mb-6">
                    Trigger: Heavy Rainfall &gt;15mm/hr in Zone 4 (Andheri East)
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Fraud Score</span>
                      <span className="text-brand-400 font-semibold">95/100 ✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Processing Time</span>
                      <span className="text-white font-mono">4m 32s</span>
                    </div>
                    <div className="h-1.5 w-full bg-dark-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 w-full rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-dark-800 border border-white/10 rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Payout Speed</p>
                    <p className="text-sm font-bold text-white">Under 30 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-dark-800/50 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Zero-Touch Claims in 3 Steps</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">No forms, no calls, no waiting. Our AI oracle monitors your zone and pays out automatically.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="relative glass-card group hover:border-brand-500/30 transition-all">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center text-xs font-black text-white shadow-glow-green">
                  {step.num}
                </div>
                <div className="pt-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage Scope ─────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Cover</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Income loss from verified external disruptions only. This is parametric insurance — payouts are triggered by data, not damage assessments.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {COVERAGE_ITEMS.map((item, i) => (
              <div key={i} className="glass-card-hover flex items-center gap-4 !p-4">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <Check className="w-4 h-4 text-brand-400 ml-auto shrink-0" />
              </div>
            ))}
          </div>

          {/* Exclusions */}
          <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
              <Ban className="w-4 h-4" /> Not Covered (Exclusions)
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {EXCLUSIONS.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <X className="w-3.5 h-3.5 text-red-400/60 shrink-0" />
                  <span className="text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Tiers ──────────────────────────── */}
      <section className="py-20 bg-dark-800/50 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Weekly Pricing</h2>
            <p className="text-slate-400">No annual commitment. Pay weekly, cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Basic */}
            <div className="glass-card flex flex-col text-center group hover:border-brand-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CloudRain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Basic Cover</h3>
              <p className="text-xs text-slate-400 mb-6 h-10">Heavy rainfall protection for your deliveries.</p>
              <div className="text-4xl font-extrabold text-white mb-1">₹39<span className="text-sm font-normal text-slate-400">/week</span></div>
              <p className="text-xs text-brand-400 mb-6">Up to ₹250/day payout</p>
              <ul className="text-left space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> Heavy Rain (&gt;15mm/hr)</li>
                <li className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-slate-600" /> AQI / Pollution</li>
                <li className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-slate-600" /> Curfew / Strikes</li>
              </ul>
              <Link to="/dashboard" className="btn-secondary mt-auto text-sm">Choose Plan</Link>
            </div>

            {/* Standard - Featured */}
            <div className="glass-card flex flex-col text-center border-brand-500/30 relative transform md:-translate-y-3 shadow-glow-green">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-400 text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">MOST POPULAR</div>
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Standard Cover</h3>
              <p className="text-xs text-slate-400 mb-6 h-10">Rain + severe AQI coverage for city riders.</p>
              <div className="text-4xl font-extrabold text-white mb-1">₹69<span className="text-sm font-normal text-slate-400">/week</span></div>
              <p className="text-xs text-brand-400 mb-6">Up to ₹500/day payout</p>
              <ul className="text-left space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> Heavy Rain (&gt;15mm/hr)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> Severe AQI (&gt;400)</li>
                <li className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-slate-600" /> Curfew / Strikes</li>
              </ul>
              <Link to="/dashboard" className="btn-primary mt-auto text-sm">Choose Plan</Link>
            </div>

            {/* Pro */}
            <div className="glass-card flex flex-col text-center group hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CloudLightning className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Pro Cover</h3>
              <p className="text-xs text-slate-400 mb-6 h-10">Comprehensive: Rain, AQI, heat, floods, curfews.</p>
              <div className="text-4xl font-extrabold text-white mb-1">₹99<span className="text-sm font-normal text-slate-400">/week</span></div>
              <p className="text-xs text-brand-400 mb-6">Up to ₹750/day payout</p>
              <ul className="text-left space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> Heavy Rain (&gt;15mm/hr)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> Severe AQI (&gt;400)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> Extreme Heat, Flood, Curfew</li>
              </ul>
              <Link to="/dashboard" className="btn-outline mt-auto text-sm !border-amber-500/30 !text-amber-400 hover:!bg-amber-500/10">Choose Plan</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card max-w-3xl mx-auto text-center !py-12 !px-8">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-brand-400 fill-brand-400" />
              ))}
            </div>
            <blockquote className="text-lg text-slate-300 leading-relaxed mb-6">
              "When the monsoon hits Mumbai, roads flood and I used to lose 3-4 days of earnings.
              With GigShield, ₹500 drops into my wallet within 30 minutes of heavy rain. It pays my bike EMI."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                <span className="text-sm font-bold text-brand-400">RM</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Rahul M.</p>
                <p className="text-xs text-brand-400">Zomato Rider, Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Footer ─────────────────────────────── */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to protect your income?</h2>
          <p className="text-slate-400 mb-8">Start for just ₹39/week. No documents. Instant activation.</p>
          <Link to="/dashboard" className="btn-primary text-lg inline-flex items-center gap-2">
            Get Started Now <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-slate-600 mt-6">
            GigShield is a parametric insurance product covering income loss only.<br />
            Not applicable for health, life, accident, or vehicle coverage. IRDAI Sandbox participant.
          </p>
        </div>
      </section>
    </div>
  );
}
