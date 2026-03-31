import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export default function ChartCard({ title, subtitle, children, className = '', action }: ChartCardProps) {
  return (
    <div className={`glass-card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-white text-base">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
