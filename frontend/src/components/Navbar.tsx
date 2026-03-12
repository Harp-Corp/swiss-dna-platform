'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const isDoctor = user.role === 'DOCTOR';
  const isPatient = user.role === 'PATIENT';

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href={isDoctor ? '/doctor' : '/dashboard'} className="text-xl font-bold text-emerald-700">
          Swiss DNA Platform
        </Link>

        <div className="flex items-center gap-6">
          {isPatient && (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-emerald-700 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard/upload" className="text-gray-600 hover:text-emerald-700 text-sm font-medium">
                DNA Upload
              </Link>
              <Link href="/dashboard/recommendations" className="text-gray-600 hover:text-emerald-700 text-sm font-medium">
                Empfehlungen
              </Link>
            </>
          )}
          {isDoctor && (
            <Link href="/doctor" className="text-gray-600 hover:text-emerald-700 text-sm font-medium">
              Patienten
            </Link>
          )}

          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
            <Link href="/profile" className="text-sm text-gray-500 hover:text-emerald-700">
              {user.firstName} {user.lastName}
            </Link>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              {user.role}
            </span>
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
