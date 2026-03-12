'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const patientLinks = [
  { href: '/patient/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/patient/dna-results', label: 'DNA-Resultate', icon: '🧬' },
  { href: '/patient/recommendations', label: 'Empfehlungen', icon: '⭐' },
  { href: '/patient/questionnaire', label: 'Fragebogen', icon: '📝' },
  { href: '/patient/documents', label: 'Dokumente', icon: '📄' },
];

const arztLinks = [
  { href: '/arzt/dashboard', label: 'Dashboard', icon: '🏥' },
  { href: '/arzt/patients', label: 'Patienten', icon: '👥' },
];

interface SidebarProps {
  role: 'patient' | 'arzt';
  userName?: string;
  onLogout?: () => void;
}

export default function Sidebar({ role, userName, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const links = role === 'arzt' ? arztLinks : patientLinks;

  return (
    <div className="w-64 min-h-screen bg-[#1B3A6B] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-lg font-bold text-white">Swiss DNA Code</h1>
        <p className="text-xs text-blue-300 mt-1">EVAZ® Plattform</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? 'bg-[#C9A84C] text-white font-semibold'
                  : 'text-blue-100 hover:bg-blue-700'
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-6 border-t border-blue-700">
        {userName && <p className="text-sm text-blue-200 mb-3 truncate">{userName}</p>}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full text-left text-sm text-blue-300 hover:text-white transition-colors"
          >
            🚪 Abmelden
          </button>
        )}
        <p className="text-xs text-blue-400 mt-4">🇨🇭 Daten in der Schweiz verarbeitet (Demo)</p>
      </div>
    </div>
  );
}
