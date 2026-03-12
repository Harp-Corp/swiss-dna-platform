'use client';
import { useState } from 'react';

const DEMO_PATIENTS = [
  { id: '1', name: 'Anna Mueller', email: 'anna@example.ch', status: 'completed', lastAnalysis: '2026-03-10', dietScore: 82, healthScore: 75, sportScore: 90 },
  { id: '2', name: 'Thomas Weber', email: 'thomas@example.ch', status: 'processing', lastAnalysis: '2026-03-12', dietScore: 0, healthScore: 0, sportScore: 0 },
  { id: '3', name: 'Sarah Brunner', email: 'sarah@example.ch', status: 'completed', lastAnalysis: '2026-03-08', dietScore: 71, healthScore: 68, sportScore: 85 },
  { id: '4', name: 'Michael Keller', email: 'michael@example.ch', status: 'completed', lastAnalysis: '2026-02-28', dietScore: 65, healthScore: 80, sportScore: 72 },
  { id: '5', name: 'Laura Fischer', email: 'laura@example.ch', status: 'pending', lastAnalysis: null, dietScore: 0, healthScore: 0, sportScore: 0 },
];

const statusBadge: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  processing: 'bg-yellow-100 text-yellow-700',
  pending: 'bg-gray-100 text-gray-600',
};

const statusLabel: Record<string, string> = {
  completed: 'Abgeschlossen',
  processing: 'In Analyse',
  pending: 'Ausstehend',
};

export default function DoctorDashboard() {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const filtered = DEMO_PATIENTS.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()),
  );

  const patient = selectedPatient ? DEMO_PATIENTS.find((p) => p.id === selectedPatient) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-emerald-700">Swiss DNA Code - Arzt Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Dr. Farkas (EVAZ)</span>
            <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }} className="text-sm text-red-500 hover:text-red-700">Abmelden</button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Patientenuebersicht</h2>
            <p className="text-gray-500">{DEMO_PATIENTS.length} Patienten registriert</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 px-4 py-2 text-center">
              <div className="text-2xl font-bold text-emerald-700">{DEMO_PATIENTS.filter(p => p.status === 'completed').length}</div>
              <div className="text-xs text-emerald-600">Abgeschlossen</div>
            </div>
            <div className="rounded-lg bg-yellow-50 px-4 py-2 text-center">
              <div className="text-2xl font-bold text-yellow-700">{DEMO_PATIENTS.filter(p => p.status === 'processing').length}</div>
              <div className="text-xs text-yellow-600">In Analyse</div>
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Patient suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Letzte Analyse</th>
                    <th className="px-4 py-3">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className={`border-b hover:bg-gray-50 cursor-pointer ${selectedPatient === p.id ? 'bg-emerald-50' : ''}`} onClick={() => setSelectedPatient(p.id)}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.email}</div>
                      </td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-medium ${statusBadge[p.status]}`}>{statusLabel[p.status]}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.lastAnalysis || '-'}</td>
                      <td className="px-4 py-3"><button className="text-sm text-emerald-600 hover:underline">Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            {patient ? (
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{patient.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{patient.email}</p>
                {patient.status === 'completed' ? (
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-sm text-gray-600">Ernaehrung</span><span className="font-bold text-gray-800">{patient.dietScore}/100</span></div>
                    <div className="h-2 rounded-full bg-gray-200"><div className="h-2 rounded-full bg-green-500" style={{ width: `${patient.dietScore}%` }} /></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">Gesundheit</span><span className="font-bold text-gray-800">{patient.healthScore}/100</span></div>
                    <div className="h-2 rounded-full bg-gray-200"><div className="h-2 rounded-full bg-red-500" style={{ width: `${patient.healthScore}%` }} /></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">Sport</span><span className="font-bold text-gray-800">{patient.sportScore}/100</span></div>
                    <div className="h-2 rounded-full bg-gray-200"><div className="h-2 rounded-full bg-orange-500" style={{ width: `${patient.sportScore}%` }} /></div>
                    <button className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2 text-white text-sm hover:bg-emerald-700">Vollstaendigen Report anzeigen</button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <span className={`rounded-full px-3 py-1 text-sm ${statusBadge[patient.status]}`}>{statusLabel[patient.status]}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-6 shadow-md text-center text-gray-400">
                <p>Waehlen Sie einen Patienten aus der Liste</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
