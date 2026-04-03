import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ArrowRight, CloudRain, CloudLightning, Wind, Thermometer,
  AlertTriangle, Ban, Zap, Wallet, Check, X,
  Shield, Activity, MapPin, Eye, FileSearch, Fingerprint, Radio,
  Gauge, Flag, UserCheck, Settings, Search,
  CalendarDays, Users,
  CheckCircle2, AlertCircle, XCircle, Monitor, Smartphone
} from 'lucide-react';

/* ─── Animation Variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Reusable Chip ──────────────────────────────────── */
function Chip({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'green' | 'amber' | 'red' | 'blue' | 'purple' }) {
  const colors: Record<string, string> = {
    default: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${colors[variant]}`}>
      {children}
    </span>
  );
}

/* ─── Section Wrapper ────────────────────────────────── */
function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionHeader({ label, title, subtitle }: { label?: string; title: string; subtitle: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="mb-14 max-w-3xl">
      {label && <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-400 mb-3">{label}</p>}
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{title}</h2>
      <p className="text-base text-slate-400 leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

/* ─── Data ───────────────────────────────────────────── */
const PIPELINE_STEPS = [
  { num: '01', label: 'Event Detected', detail: 'Rainfall >15mm/hr detected in Zone 4 via IMD radar feed.', status: 'signal', statusLabel: 'Signal', icon: Radio, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { num: '02', label: 'Source Cross-Check', detail: 'IMD + OpenWeather agreement confirmed. Confidence: 94%.', status: 'verified', statusLabel: 'Verified', icon: Search, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { num: '03', label: 'Worker Impact Validated', detail: 'Rider active in affected zone. GPS + platform activity confirmed.', status: 'verified', statusLabel: 'Confirmed', icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { num: '04', label: 'Payout Estimated', detail: '₹500 based on disruption duration × tier daily cap.', status: 'computed', statusLabel: 'Computed', icon: Gauge, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { num: '05', label: 'Fraud & Spoof Check', detail: '5-signal check passed. Integrity score: 95/100.', status: 'passed', statusLabel: 'Passed', icon: Fingerprint, color: 'text-brand-400', bg: 'bg-brand-500/10' },
  { num: '06', label: 'Wallet Credited', detail: '₹500 credited to UPI wallet. Evidence trail logged.', status: 'completed', statusLabel: 'Completed', icon: Wallet, color: 'text-brand-400', bg: 'bg-brand-500/10' },
];

const FRAUD_SIGNALS = [
  { label: 'GPS Consistency', desc: 'Device movement matches claimed zone and route history.', metric: 'Route coherence: 97%', icon: MapPin, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Velocity Check', desc: 'No impossible speed jumps or location teleportation detected.', metric: 'Max δ: 12km/hr ✓', icon: Gauge, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { label: 'Duplicate Check', desc: 'No overlapping claim for same event window from same rider.', metric: 'Unique window ✓', icon: FileSearch, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Activity Correlation', desc: 'Platform delivery activity matches reported zone presence.', metric: '3 orders before event ✓', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Device Integrity', desc: 'No root/jailbreak or mock location apps detected on device.', metric: 'Integrity: Clean ✓', icon: Smartphone, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const COVERAGE_TRIGGERS = [
  { trigger: 'Heavy Rainfall', threshold: '>15mm/hr', source: 'IMD Radar', crossVerify: 'OpenWeather API', approval: 'Auto', approvalColor: 'text-emerald-400', icon: CloudRain, color: 'text-blue-400' },
  { trigger: 'Flood Alert', threshold: 'NDMA Level 3+', source: 'NDMA Feed', crossVerify: 'State disaster portal', approval: 'Review', approvalColor: 'text-amber-400', icon: CloudLightning, color: 'text-cyan-400' },
  { trigger: 'Extreme Heat', threshold: '>45°C sustained', source: 'IMD Station', crossVerify: 'OpenWeather + historical', approval: 'Auto', approvalColor: 'text-emerald-400', icon: Thermometer, color: 'text-orange-400' },
  { trigger: 'Severe AQI', threshold: '>400 NAQI', source: 'CPCB CAAQMS', crossVerify: 'IQAir secondary', approval: 'Auto', approvalColor: 'text-emerald-400', icon: Wind, color: 'text-purple-400' },
  { trigger: 'Curfew / Section 144', threshold: 'Official notification', source: 'Govt gazette API', crossVerify: 'News verification', approval: 'Review', approvalColor: 'text-amber-400', icon: AlertTriangle, color: 'text-amber-400' },
  { trigger: 'Zone Shutdown', threshold: 'Platform zone offline', source: 'Platform status API', crossVerify: 'Volume drop correlation', approval: 'Auto', approvalColor: 'text-emerald-400', icon: Ban, color: 'text-red-400' },
];

const EXCLUSIONS = [
  'Health insurance or medical bills',
  'Life insurance or death benefits',
  'Accident or bodily injury coverage',
  'Vehicle repair or breakdown costs',
];

const DESIGN_DECISIONS = [
  { title: 'Explainability over black-box automation', desc: 'Every payout includes an evidence trail. Workers and admins can see exactly why compensation was triggered and which signals contributed.', icon: Eye },
  { title: 'Flagging over instant universal approval', desc: 'Low-confidence claims are held for review instead of auto-approved. This protects the risk pool and maintains actuarial sustainability.', icon: Flag },
  { title: 'Zone validation over raw event detection', desc: 'A citywide weather alert doesn\'t mean every rider was affected. GigShield confirms worker presence in the disrupted zone before triggering payouts.', icon: MapPin },
  { title: 'Weekly pricing for gig income cycles', desc: 'Gig workers earn daily, not monthly. Weekly premiums reduce financial friction and let riders adjust coverage based on their work schedule.', icon: CalendarDays },
  { title: 'Dual visibility: workers + admins', desc: 'Both sides see the same evidence. Workers can inspect and dispute. Admins can override and audit. Transparency builds systemic trust.', icon: Users },
];

/* ================================================================ */
/*  LANDING PAGE                                                     */
/* ================================================================ */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden font-sans text-white">

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav className="fixed w-full z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-glow-green">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">GigShield</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#how-it-works" className="btn-ghost text-sm hidden md:block">How It Works</a>
              <Link to="/dashboard" className="btn-ghost text-sm hidden sm:block">Worker Demo</Link>
              <Link to="/admin" className="btn-ghost text-sm hidden sm:block">Admin Panel</Link>
              <Link to="/dashboard" className="btn-primary text-sm !py-2 !px-5">
                View Prototype <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 1 · HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-500 rounded-full mix-blend-multiply filter blur-[140px] opacity-[0.06]" />
          <div className="absolute top-60 -left-20 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.04]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800 border border-white/[0.06] text-slate-400 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                Guidewire DEVTrails 2026 · Simulated Demo
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                Auditable Income{' '}
                <span className="text-gradient">Protection</span>
                <br />for Delivery Workers.
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
                When rain, pollution, curfews, or platform shutdowns disrupt work —
                GigShield validates the disruption, confirms rider impact, and explains
                every payout decision. No black boxes. No blind approvals.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2 text-base">
                  View Live Demo <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#evidence" className="btn-secondary flex items-center justify-center gap-2 text-base">
                  See How Payouts Are Verified
                </a>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2">
                <Chip variant="green">Parametric</Chip>
                <Chip variant="green">Explainable Payouts</Chip>
                <Chip variant="blue">Anti-Spoof Validated</Chip>
                <Chip>Audit-Ready</Chip>
              </div>
            </motion.div>

            {/* Right — Evidence Snippet */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-500/8 filter blur-[60px] rounded-full" />
                <div className="relative bg-dark-800/80 border border-white/[0.06] rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center">
                        <FileSearch className="w-3.5 h-3.5 text-brand-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-300">Payout Evidence Trail</span>
                    </div>
                    <Chip variant="green">Auto-Approved</Chip>
                  </div>

                  <div className="space-y-3 text-sm font-mono">
                    {[
                      { label: 'Event', value: 'Rainfall 22mm/hr — Andheri East', dot: 'bg-blue-400' },
                      { label: 'Source', value: 'IMD + OpenWeather (cross-verified)', dot: 'bg-cyan-400' },
                      { label: 'Worker', value: 'Zone 4 activity confirmed via GPS', dot: 'bg-emerald-400' },
                      { label: 'Confidence', value: '94% — Above auto-approve threshold', dot: 'bg-brand-400' },
                      { label: 'Payout', value: '₹500 → UPI wallet (4hr × ₹125 cap)', dot: 'bg-brand-400' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-start gap-3 py-1.5 border-b border-white/[0.03] last:border-0">
                        <span className={`w-2 h-2 rounded-full ${row.dot} mt-1.5 shrink-0`} />
                        <span className="text-slate-500 w-20 shrink-0">{row.label}</span>
                        <span className="text-slate-300">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    <Chip variant="green">IMD Verified</Chip>
                    <Chip variant="blue">GPS Confirmed</Chip>
                    <Chip>No Anomalies</Chip>
                    <Chip variant="green">Cross-Source Match</Chip>
                  </div>

                  <p className="text-[10px] text-slate-600 mt-4 text-center">Simulated demo environment · Not real claim data</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2 · DISRUPTION-TO-PAYOUT FLOW                                 */}
      {/* ============================================================ */}
      <Section id="how-it-works" className="bg-dark-800/40 border-y border-white/[0.04]">
        <SectionHeader
          label="How It Works"
          title="From Disruption Signal to Verified Payout"
          subtitle="Six validation stages. Each logged. Each explainable. Low-confidence cases are flagged for human review — not blindly auto-approved."
        />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PIPELINE_STEPS.map((step) => (
            <motion.div key={step.num} variants={fadeUp} className="relative bg-dark-800/60 border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-600 font-mono">{step.num}</span>
                <Chip variant={step.status === 'passed' || step.status === 'completed' || step.status === 'verified' ? 'green' : step.status === 'computed' ? 'purple' : step.status === 'signal' ? 'blue' : 'amber'}>
                  {step.statusLabel}
                </Chip>
              </div>
              <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                <step.icon className={`w-5 h-5 ${step.color}`} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">{step.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Flagged branch callout */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-6 bg-amber-500/5 border border-amber-500/15 rounded-xl p-5 flex items-start gap-4 max-w-3xl">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-300 mb-1">Not everything is auto-approved.</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              If confidence drops below 70% — due to GPS anomalies, missing activity data, or source disagreement —
              the claim is routed to manual review. Admins can inspect evidence, override, or reject before any payout occurs.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 3 · TRIGGER EVIDENCE PANEL                                    */}
      {/* ============================================================ */}
      <Section id="evidence">
        <SectionHeader
          label="Explainability"
          title="Why This Payout Was Triggered"
          subtitle="Every payout comes with an evidence trail. Workers and admins can inspect what happened, what was verified, and how the amount was computed."
        />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-dark-800/60 border border-white/[0.06] rounded-2xl overflow-hidden max-w-4xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center">
                <Eye className="w-4 h-4 text-brand-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Evidence Trail — CLM-2026-0042</p>
                <p className="text-[11px] text-slate-500">Mar 31, 2026 · 14:32 IST</p>
              </div>
            </div>
            <Chip variant="green">Auto-Approved</Chip>
          </div>

          {/* Evidence rows */}
          <div className="divide-y divide-white/[0.03]">
            {[
              { label: 'Trigger', value: 'Heavy Rainfall >15mm/hr', extra: null },
              { label: 'Actual Value', value: '22.4mm/hr at 14:32 IST', extra: null },
              { label: 'Primary Source', value: 'IMD Doppler Radar — Mumbai Station', extra: null },
              { label: 'Cross-Verification', value: 'OpenWeather API — Agreement confirmed', extra: null },
              { label: 'Zone', value: 'Andheri East — Zone 4', extra: null },
              { label: 'Worker Activity', value: '3 deliveries completed in zone before event onset', extra: null },
              { label: 'Confidence Score', value: '94%', extra: 'bar' },
              { label: 'Decision', value: 'Auto-approved (confidence > 85% threshold)', extra: null },
              { label: 'Payout Calculation', value: '4hr disruption × ₹125/hr cap = ₹500', extra: null },
            ].map((row) => (
              <div key={row.label} className="flex items-center px-6 py-3 text-sm">
                <span className="w-40 shrink-0 text-slate-500 text-xs font-medium">{row.label}</span>
                <span className="text-slate-200 flex-1">{row.value}</span>
                {row.extra === 'bar' && (
                  <div className="w-32 h-2 bg-dark-700 rounded-full overflow-hidden ml-3">
                    <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full" style={{ width: '94%' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Signal chips */}
          <div className="px-6 py-4 border-t border-white/[0.04] flex flex-wrap gap-2">
            <Chip variant="green">IMD Verified</Chip>
            <Chip variant="blue">GPS Confirmed</Chip>
            <Chip>No Anomalies</Chip>
            <Chip variant="green">Cross-Source Match</Chip>
          </div>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 4 · ANTI-FRAUD / ANTI-SPOOFING                                */}
      {/* ============================================================ */}
      <Section id="anti-fraud" className="bg-dark-800/40 border-y border-white/[0.04]">
        <SectionHeader
          label="Fraud Defense"
          title="Spoof-Resistant. Multi-Signal Validated."
          subtitle="GigShield does not blindly trust location or event reports. Every claim passes through five fraud-defense signals before approval."
        />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {FRAUD_SIGNALS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="bg-dark-800/60 border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-colors">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{s.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{s.desc}</p>
              <span className="text-xs font-mono text-brand-400">{s.metric}</span>
            </motion.div>
          ))}

          {/* Flagged case example */}
          <motion.div variants={fadeUp} className="bg-red-500/[0.04] border border-red-500/15 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Flag className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-red-300 mb-1">Flagged for Review</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              CLM-2026-0051 · GPS anomaly detected — location jump of 14km in 2 minutes. Held for manual inspection.
            </p>
            <div className="flex items-center gap-2">
              <Chip variant="red">Score: 42/100</Chip>
              <Chip variant="amber">Pending Review</Chip>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-xs text-slate-500 max-w-2xl">
            Low-confidence cases (score &lt; 70) are automatically flagged. Admins review evidence before any payout. GigShield never auto-approves a suspicious claim.
          </p>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 5 · COVERAGE + DATA SOURCES                                   */}
      {/* ============================================================ */}
      <Section id="coverage">
        <SectionHeader
          label="Policy Logic"
          title="Coverage Triggers &amp; Data Sources"
          subtitle="Each trigger has a defined threshold, a verified data source, and clear payout implications. This is parametric insurance — payouts are triggered by data, not damage assessments."
        />

        {/* Trigger table */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-x-auto mb-10">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 pr-4">Trigger</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 pr-4">Threshold</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 pr-4">Source</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 pr-4">Cross-Verification</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Approval</th>
              </tr>
            </thead>
            <tbody>
              {COVERAGE_TRIGGERS.map((t) => (
                <tr key={t.trigger} className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <t.icon className={`w-4 h-4 ${t.color} shrink-0`} />
                      <span className="text-white font-medium">{t.trigger}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-400 font-mono text-xs">{t.threshold}</td>
                  <td className="py-3.5 pr-4 text-slate-400">{t.source}</td>
                  <td className="py-3.5 pr-4 text-slate-400">{t.crossVerify}</td>
                  <td className="py-3.5">
                    <span className={`text-xs font-semibold ${t.approvalColor}`}>{t.approval}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Exclusions */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-red-500/[0.04] border border-red-500/15 rounded-xl p-5 max-w-2xl">
          <h3 className="text-xs font-bold text-red-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Ban className="w-3.5 h-3.5" /> Not Covered
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {EXCLUSIONS.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs">
                <X className="w-3 h-3 text-red-400/60 shrink-0" />
                <span className="text-slate-400">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 6 · WORKER DASHBOARD PREVIEW                                  */}
      {/* ============================================================ */}
      <Section className="bg-dark-800/40 border-y border-white/[0.04]">
        <SectionHeader
          label="Worker Experience"
          title="What Workers See"
          subtitle="Full visibility into active policies, payout history, and evidence — not just a balance number. Workers can inspect evidence and dispute any decision."
        />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-dark-800/60 border border-white/[0.06] rounded-2xl overflow-hidden max-w-4xl">
          {/* Mock header */}
          <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-brand-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Raj Kumar · Rider Dashboard</p>
                <p className="text-[11px] text-slate-500">Zone 4: Andheri East · Zomato</p>
              </div>
            </div>
            <Chip variant="green">Policy Active</Chip>
          </div>

          <div className="p-6 grid sm:grid-cols-3 gap-4 border-b border-white/[0.04]">
            <div className="bg-dark-700/50 rounded-xl p-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Active Plan</p>
              <p className="text-sm font-bold text-white">Standard Cover</p>
              <p className="text-xs text-slate-400">₹69/week · Rain + AQI</p>
            </div>
            <div className="bg-dark-700/50 rounded-xl p-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Week Payout</p>
              <p className="text-sm font-bold text-brand-400">₹750</p>
              <p className="text-xs text-slate-400">2 events this week</p>
            </div>
            <div className="bg-dark-700/50 rounded-xl p-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Valid Until</p>
              <p className="text-sm font-bold text-white">Apr 06</p>
              <p className="text-xs text-slate-400">11:59 PM IST</p>
            </div>
          </div>

          {/* Payout history */}
          <div className="p-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent Payouts</p>
            <div className="space-y-3">
              {[
                { date: 'Mar 31', trigger: 'Severe AQI', zone: 'Zone 4', amount: '₹500', status: 'paid', icon: CheckCircle2, statusColor: 'text-emerald-400' },
                { date: 'Mar 26', trigger: 'Heavy Rain', zone: 'Zone 4', amount: '₹250', status: 'paid', icon: CheckCircle2, statusColor: 'text-emerald-400' },
              ].map((p) => (
                <div key={p.date} className="flex items-center justify-between py-2.5 px-4 bg-dark-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <p.icon className={`w-4 h-4 ${p.statusColor} shrink-0`} />
                    <div>
                      <p className="text-sm text-white">{p.date} · {p.trigger} · {p.zone}</p>
                      <p className="text-[11px] text-slate-500">Trigger verified · Evidence available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-semibold text-brand-400">{p.amount}</span>
                    <button className="text-[10px] font-semibold text-slate-400 hover:text-white border border-white/[0.08] rounded-lg px-2.5 py-1 transition-colors">View Evidence</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <button className="text-xs font-semibold text-slate-400 hover:text-white border border-white/[0.08] rounded-lg px-4 py-2 transition-colors flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Dispute a Payout
              </button>
              <button className="text-xs font-semibold text-brand-400 hover:text-brand-300 border border-brand-500/20 rounded-lg px-4 py-2 transition-colors">
                Renew Policy
              </button>
            </div>
          </div>
          <div className="px-6 py-3 bg-dark-900/40 text-center">
            <p className="text-[10px] text-slate-600">Simulated demo environment · Not real rider data</p>
          </div>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 7 · ADMIN / RISK OPS PREVIEW                                  */}
      {/* ============================================================ */}
      <Section>
        <SectionHeader
          label="Risk Operations"
          title="What Risk Ops Sees"
          subtitle="Live trigger monitoring, confidence-scored payouts, flagged cases, and manual override capability. Judges: this is the admin side."
        />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-dark-800/60 border border-white/[0.06] rounded-2xl overflow-hidden max-w-5xl">
          {/* Mock header */}
          <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center">
                <Monitor className="w-4 h-4 text-brand-400" />
              </div>
              <p className="text-sm font-semibold text-white">GigShield — Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              <span className="text-xs text-slate-400">Live Monitoring</span>
            </div>
          </div>

          {/* Zone alert */}
          <div className="mx-6 mt-4 bg-amber-500/[0.06] border border-amber-500/15 rounded-lg px-4 py-3 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-200/80 flex-1">
              <span className="font-semibold text-amber-300">Zone 4 — Rainfall Alert:</span> 22mm/hr detected. 3 auto-payouts triggered. 1 claim flagged for GPS anomaly.
            </p>
            <Chip variant="amber">Active</Chip>
          </div>

          {/* Stats row */}
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-white/[0.04]">
            {[
              { label: 'Active Policies', value: '847', color: 'text-white' },
              { label: 'Pending Review', value: '3', color: 'text-amber-400' },
              { label: 'Loss Ratio', value: '34%', color: 'text-brand-400' },
              { label: 'Avg Confidence', value: '89%', color: 'text-brand-400' },
            ].map((s) => (
              <div key={s.label} className="bg-dark-700/50 rounded-xl p-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{s.label}</p>
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Flagged case */}
          <div className="p-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Flagged for Review</p>
            <div className="bg-red-500/[0.04] border border-red-500/15 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">CLM-2026-0051 · Vikram S. · Zone 7</p>
                  <p className="text-xs text-slate-400">GPS anomaly: 14km jump in 2min · Duplicate window overlap · Score: 42/100</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="text-[10px] font-semibold text-slate-400 hover:text-white border border-white/[0.08] rounded-lg px-3 py-1.5 transition-colors">Review</button>
                <button className="text-[10px] font-semibold text-red-400 hover:text-red-300 border border-red-500/20 rounded-lg px-3 py-1.5 transition-colors">Override</button>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-dark-900/40 text-center">
            <p className="text-[10px] text-slate-600">Simulated demo environment · Not real operational data</p>
          </div>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 8 · PRICING WITH RATIONALE                                    */}
      {/* ============================================================ */}
      <Section id="pricing" className="bg-dark-800/40 border-y border-white/[0.04]">
        <SectionHeader
          label="Pricing"
          title="Weekly Pricing — Calibrated, Not Arbitrary"
          subtitle="Premiums reflect zone risk, disruption frequency, and earnings exposure. Payouts are capped by tier and duration. No annual lock-in."
        />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="grid md:grid-cols-3 gap-5 max-w-4xl">
          {[
            {
              tier: 'Basic Cover', price: '₹39', payout: 'Up to ₹250/day',
              triggers: ['Heavy Rain (>15mm/hr)'],
              excluded: ['AQI / Pollution', 'Curfew / Strikes'],
              rationale: 'Calibrated for riders earning ₹800–1200/day in moderate rain-risk zones.',
              icon: CloudRain, iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10',
              borderColor: 'hover:border-blue-500/20',
            },
            {
              tier: 'Standard Cover', price: '₹69', payout: 'Up to ₹500/day',
              triggers: ['Heavy Rain (>15mm/hr)', 'Severe AQI (>400)'],
              excluded: ['Curfew / Strikes'],
              rationale: 'Balanced for city riders facing both monsoon and pollution disruptions.',
              icon: Shield, iconColor: 'text-brand-400', iconBg: 'bg-brand-500/10',
              borderColor: 'hover:border-brand-500/20',
              featured: true,
            },
            {
              tier: 'Pro Cover', price: '₹99', payout: 'Up to ₹750/day',
              triggers: ['Heavy Rain', 'Severe AQI', 'Extreme Heat, Flood, Curfew'],
              excluded: [],
              rationale: 'Comprehensive protection for high-exposure zones. All trigger types covered.',
              icon: Zap, iconColor: 'text-amber-400', iconBg: 'bg-amber-500/10',
              borderColor: 'hover:border-amber-500/20',
            },
          ].map((plan) => (
            <motion.div key={plan.tier} variants={fadeUp} className={`bg-dark-800/60 border border-white/[0.06] rounded-xl p-6 flex flex-col ${plan.borderColor} transition-colors ${plan.featured ? 'ring-1 ring-brand-500/20' : ''}`}>
              <div className={`w-11 h-11 rounded-xl ${plan.iconBg} flex items-center justify-center mb-4`}>
                <plan.icon className={`w-5 h-5 ${plan.iconColor}`} />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{plan.tier}</h3>
              <div className="text-3xl font-extrabold text-white mb-0.5">{plan.price}<span className="text-sm font-normal text-slate-400">/week</span></div>
              <p className="text-xs text-brand-400 mb-4">{plan.payout}</p>

              <ul className="space-y-2 text-sm mb-4 flex-1">
                {plan.triggers.map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400 shrink-0" /><span className="text-slate-300">{t}</span></li>
                ))}
                {plan.excluded.map((t) => (
                  <li key={t} className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-slate-600 shrink-0" /><span className="text-slate-500">{t}</span></li>
                ))}
              </ul>

              <p className="text-[11px] text-slate-500 leading-relaxed mb-5 border-t border-white/[0.04] pt-4">{plan.rationale}</p>
              <Link to="/dashboard" className={`text-sm font-semibold text-center py-2.5 rounded-xl transition-colors ${plan.featured ? 'bg-brand-500/15 text-brand-400 hover:bg-brand-500/25 border border-brand-500/20' : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]'}`}>
                Select Plan
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-xs text-slate-500 mt-6 max-w-2xl">
          Premiums are dynamically adjusted based on zone risk score, historical disruption frequency, and claim history. All values shown are baseline rates.
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 9 · DESIGN DECISIONS                                          */}
      {/* ============================================================ */}
      <Section id="decisions">
        <SectionHeader
          label="Product Thinking"
          title="Why We Built It This Way"
          subtitle="Five deliberate trade-offs that define GigShield's architecture. These are the decisions we made — and why."
        />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="space-y-4 max-w-3xl">
          {DESIGN_DECISIONS.map((d, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-dark-800/60 border border-white/[0.06] rounded-xl p-5 flex items-start gap-4 hover:border-white/[0.12] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                <d.icon className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{d.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{d.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 10 · FINAL CTA                                                */}
      {/* ============================================================ */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">See the Full Product in Action</h2>
            <p className="text-slate-400 mb-8">
              Explore the worker dashboard, admin panel, and payout logic — built as a working prototype for Guidewire DEVTrails 2026.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2">
                Explore Worker Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/admin" className="btn-secondary flex items-center justify-center gap-2">
                Open Admin Panel <Settings className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed max-w-lg mx-auto">
              GigShield is a parametric income protection prototype built for Guidewire DEVTrails 2026.
              It covers income disruption only — not health, life, accident, or vehicle.
              All data shown is simulated for demonstration purposes.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
