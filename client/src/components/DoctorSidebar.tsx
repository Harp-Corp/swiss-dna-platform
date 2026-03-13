import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { DnaLogo } from "./DnaLogo";
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/arzt/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/arzt/patienten", label: "Patienten", icon: Users },
  { href: "/arzt/analysen", label: "Analysen", icon: FlaskConical },
  { href: "/arzt/einstellungen", label: "Einstellungen", icon: Settings },
];

export function DoctorSidebar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-[#1B3A6B] text-white flex flex-col shrink-0" data-testid="doctor-sidebar">
      {/* Logo area */}
      <div className="p-5 border-b border-white/10">
        <Link href="/arzt/dashboard" className="flex items-center gap-3">
          <DnaLogo size={36} />
          <div>
            <div className="font-bold text-sm tracking-wide">Swiss DNA Code</div>
            <div className="text-[11px] text-white/60">Arzt-Portal</div>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href === "/arzt/patienten" && location.startsWith("/arzt/patients"));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-sm font-bold text-[#1B3A6B]">
            F
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</div>
            <div className="text-[11px] text-white/50 truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            window.location.hash = "/";
          }}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors w-full"
          data-testid="button-logout-doctor"
        >
          <LogOut size={16} />
          Abmelden
        </button>
      </div>
    </aside>
  );
}
