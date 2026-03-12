'use client';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth';

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Laden...';

  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="patient" userName={userName} onLogout={logout} />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B3A6B]">Willkommen, {userName} 👋</h2>
            <p className="text-gray-500 mt-1">Ihre persönliche DNA-Analyse-Übersicht</p>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
              <p className="text-sm text-gray-500">DNA-Analyse</p>
              <p className="text-xl font-bold text-green-600 mt-1">Abgeschlossen</p>
              <p className="text-xs text-gray-400 mt-1">5 Kategorien analysiert</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-yellow-400">
              <p className="text-sm text-gray-500">Laborwerte</p>
              <p className="text-xl font-bold text-yellow-600 mt-1">Ausstehend</p>
              <p className="text-xs text-gray-400 mt-1">Ergebnis in ~3 Tagen</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
              <p className="text-sm text-gray-500">Empfehlungen</p>
              <p className="text-xl font-bold text-blue-600 mt-1">8 verfügbar</p>
              <p className="text-xs text-gray-400 mt-1">Von Dr. Farkas geprüft</p>
            </div>
          </div>

          {/* Navigation Cards */}
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Ihr Bereich</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/patient/dna-results" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 block">
              <div className="text-3xl mb-3">🧬</div>
              <h4 className="font-semibold text-[#1B3A6B]">DNA-Resultate</h4>
              <p className="text-sm text-gray-500 mt-1">Diet, Sport, Health, Mind, Resilience</p>
            </Link>
            <Link href="/patient/recommendations" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 block">
              <div className="text-3xl mb-3">⭐</div>
              <h4 className="font-semibold text-[#1B3A6B]">Empfehlungen</h4>
              <p className="text-sm text-gray-500 mt-1">Ernährung, Training, Supplements</p>
            </Link>
            <Link href="/patient/questionnaire" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 block">
              <div className="text-3xl mb-3">📝</div>
              <h4 className="font-semibold text-[#1B3A6B]">Fragebogen</h4>
              <p className="text-sm text-gray-500 mt-1">Anamnese ausfüllen</p>
            </Link>
            <Link href="/patient/documents" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 block">
              <div className="text-3xl mb-3">📄</div>
              <h4 className="font-semibold text-[#1B3A6B]">Dokumente</h4>
              <p className="text-sm text-gray-500 mt-1">DNA Reports herunterladen</p>
            </Link>
          </div>

          {/* Footer badge */}
          <p className="text-xs text-gray-400 mt-12">🇨🇭 Daten in der Schweiz verarbeitet (Demo) • <a href="#" className="underline">Impressum</a> – Dr. Farkas EVAZ®, Schweiz</p>
        </main>
      </div>
    </ProtectedRoute>
  );
}
