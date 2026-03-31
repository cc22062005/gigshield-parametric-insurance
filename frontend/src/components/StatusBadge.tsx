import React from 'react';

const STATUS_MAP: Record<string, { className: string; label: string }> = {
  active: { className: 'badge-active', label: 'ACTIVE' },
  pending: { className: 'badge-pending', label: 'PENDING' },
  paid: { className: 'badge-paid', label: 'PAID' },
  approved: { className: 'badge-paid', label: 'APPROVED' },
  flagged: { className: 'badge-flagged', label: 'FLAGGED' },
  rejected: { className: 'badge-rejected', label: 'REJECTED' },
  expired: { className: 'badge-expired', label: 'EXPIRED' },
};

export default function StatusBadge({ status, size = 'sm', children }: any) {
  if (children) {
    return <span className={`bg-dark-800 text-slate-300 px-2 py-1 rounded border border-white/[0.04] font-semibold ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>{children}</span>;
  }
  const statusStr = typeof status === 'string' ? status.toLowerCase() : 'unknown';
  const config = STATUS_MAP[statusStr] || { className: 'badge-expired', label: String(status).toUpperCase() };

  return (
    <span className={`${config.className} ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : ''}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        config.className === 'badge-active' ? 'bg-emerald-400' :
        config.className === 'badge-paid' ? 'bg-emerald-400' :
        config.className === 'badge-flagged' ? 'bg-amber-400' :
        config.className === 'badge-pending' ? 'bg-blue-400' :
        config.className === 'badge-rejected' ? 'bg-red-400' :
        'bg-slate-400'
      }`} />
      {config.label}
    </span>
  );
}
