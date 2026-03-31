import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck, LayoutDashboard, FileText, ClipboardList,
  Settings, LogOut, Menu, X, User, ChevronRight
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/policies', label: 'Policies', icon: FileText },
  { path: '/claims', label: 'Claims', icon: ClipboardList },
  { path: '/admin', label: 'Admin Panel', icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      {/* ── Sidebar (Desktop) ──────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar-900 border-r border-white/[0.04] relative">
        {/* Glow effect */}
        <div className="absolute -right-20 top-1/4 w-40 h-80 bg-brand-500/5 blur-3xl rounded-full pointer-events-none" />

        {/* Logo */}
        <div className="p-6 pb-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-glow-green group-hover:shadow-glow-green-lg transition-shadow">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">GigShield</span>
              <span className="block text-[10px] text-brand-400 font-medium tracking-widest">PARAMETRIC AI</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive ? 'sidebar-item-active' : 'sidebar-item'}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-brand-400" />}
              </Link>
            );
          })}
        </nav>

        {/* User pill */}
        <div className="p-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03]">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
              <User className="w-4 h-4 text-brand-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Raj Kumar</p>
              <p className="text-[10px] text-slate-500">Zone 4 · Zomato</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-500 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* ── Mobile Header ──────────────────────────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-sidebar-900 border-b border-white/[0.04] px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">GigShield</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar-900 pt-16 animate-slide-right">
            <nav className="px-3 py-4 space-y-1">
              {NAV_ITEMS.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={isActive ? 'sidebar-item-active' : 'sidebar-item'}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* ── Main Content ───────────────────────────── */}
      <main className="flex-1 overflow-y-auto lg:pt-0 pt-14">
        <div className="min-h-full bg-dark-900 lg:rounded-tl-3xl">
          {children}
        </div>
      </main>
    </div>
  );
}
