import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: { value: string; positive: boolean };
  iconColor?: string;
  iconBg?: string;
}

export default function KPICard({ icon: Icon, label, value, trend, iconColor = 'text-brand-400', iconBg = 'bg-brand-500/10' }: any) {
  return (
    <div className="kpi-card group border border-white/[0.04]">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-xl`}>
          {typeof Icon === 'string' ? Icon : (Icon && <Icon className={`w-5 h-5 ${iconColor}`} />)}
        </div>
        {trend && typeof trend === 'string' && (
           <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400">
             {trend}
           </span>
        )}
        {trend && typeof trend !== 'string' && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            trend.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}
