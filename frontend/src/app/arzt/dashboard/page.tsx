'use client';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { PATIENTS } from '@/lib/mock-data';

const RECENT_ACTIVITY = [
  { text: 'Anna Mueller – DNA-Analyse abgeschlossen', time: 'Heute, 14:32' },
  { text: 'Gusti Brosmeli – Neue Laborwerte hochgeladen', time: 'Heute, 11:15' },
  { text: 'Max Müller – Fragebogen ausgefüllt', time: 'Gestern, 16:45' },
  { text: 'Lisa Weber – Empfehlung aktualisiert', time: 'Gestern, 09:20' },
  { text: 'Thomas Schmid – Ersttermin vereinbart', time: '10.03.2026' },
];

export default function ArztDashboard() {
  const stats = [
    { label: 'Total Patienten', value: PATIENTS.length, icon: '👥', color: 'border-[#1B3A6B]' },
    { label: 'Abgeschlossene Analysen', value: 1, icon: '✅', color: 'border-green-500' },
    { label: 'Ausstehende Analysen', value: 1, icon: '⏳', color: 'border-yellow-400' },
    { label: 'Aktive Pakete', value: 2, icon: '📦', color: 'border-[#C9A84C]' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="arzt" userName="Dr. Farkas" />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1B3A6B]">Willkommen, Dr. Farkas</h2>
          <p className="text-gray-500 mt-1">Ihre Patientenübersicht</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${stat.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#1B3A6B] mt-1">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-[#1B3A6B] mb-4">Letzte Aktivitäten</h3>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <p className="text-sm text-gray-700">{activity.text}</p>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schnellzugriff</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/arzt/patients"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 block"
          >
            <div className="text-3xl mb-3">👥</div>
            <h4 className="font-semibold text-[#1B3A6B]">Patientenliste</h4>
            <p className="text-sm text-gray-500 mt-1">Alle Patienten anzeigen und verwalten</p>
          </Link>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 opacity-60">
            <div className="text-3xl mb-3">➕</div>
            <h4 className="font-semibold text-[#1B3A6B]">Neuen Patienten anlegen</h4>
            <p className="text-sm text-gray-500 mt-1">Demnächst verfügbar</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-12">
          🇨🇭 Daten in der Schweiz verarbeitet (Demo) &bull;{' '}
          <a href="#" className="underline">Impressum</a> – Dr. Farkas EVAZ®, Schweiz
        </p>
      </main>
    </div>
  );
}
