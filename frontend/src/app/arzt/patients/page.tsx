'use client';
import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth';
import { PATIENTS } from '@/lib/mock-data';

export default function ArztPatientsPage() {
  const [search, setSearch] = useState('');
  const { user, logout } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Laden...';

  const filtered = PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="arzt" userName={userName} onLogout={logout} />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1B3A6B]">Patientenliste</h2>
            <p className="text-gray-500 mt-1">{PATIENTS.length} Patienten registriert</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Suche nach Name oder E-Mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Patient Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Name</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">E-Mail</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Paket</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Letzte Aktivität</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Ausstehend</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{patient.name}</td>
                      <td className="px-6 py-4 text-gray-500">{patient.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#1B3A6B]">
                          {patient.paket}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            patient.status === 'Aktiv'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{patient.letzteAktivitaet}</td>
                      <td className="px-6 py-4">
                        {patient.ausstehend > 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            {patient.ausstehend}
                          </span>
                        ) : (
                          <span className="text-gray-400">–</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/arzt/patients/${patient.id}`}
                          className="text-[#1B3A6B] hover:text-[#C9A84C] font-medium transition-colors"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                        Keine Patienten gefunden.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-400 mt-12">
            🇨🇭 Daten in der Schweiz verarbeitet (Demo) &bull;{' '}
            <a href="#" className="underline">Impressum</a> – Dr. Farkas EVAZ®, Schweiz
          </p>
        </main>
      </div>
    </ProtectedRoute>
  );
}
