'use client';
import { useEffect, useState } from 'react';

const DEMO_DNA = {
  dietScore: 78, mindScore: 65, resilienceScore: 82, healthScore: 71, sportScore: 88,
  ftoVariant: 'CT', mthfrVariant: 'AG', actn3Variant: 'RR', apoeVariant: 'E3/E3',
};

const categories = [
  { key: 'dietScore', label: 'Ernaehrung', color: 'bg-green-500', icon: '🥗' },
  { key: 'mindScore', label: 'Mind', color: 'bg-purple-500', icon: '🧠' },
  { key: 'resilienceScore', label: 'Resilienz', color: 'bg-blue-500', icon: '💪' },
  { key: 'healthScore', label: 'Gesundheit', color: 'bg-red-500', icon: '❤️' },
  { key: 'sportScore', label: 'Sport', color: 'bg-orange-500', icon: '🏃' },
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const dna = DEMO_DNA;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-emerald-700">Swiss DNA Code</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Demo Patient</span>
            <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}
              className="text-sm text-red-500 hover:text-red-700">Abmelden</button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Ihr DNA-Profil</h2>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <div key={cat.key} className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-2 text-2xl">{cat.icon}</div>
              <h3 className="text-sm font-medium text-gray-500">{cat.label}</h3>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-800">{(dna as any)[cat.key]}</span>
                <span className="text-sm text-gray-400">/100</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                <div className={`h-2 rounded-full ${cat.color}`}
                  style={{ width: `${(dna as any)[cat.key]}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Genetische Marker</h3>
            <div className="space-y-3">
              {[
                { label: 'FTO (Adipositas)', value: dna.ftoVariant, info: 'Leicht erhoehtes Risiko' },
                { label: 'MTHFR (Methylierung)', value: dna.mthfrVariant, info: 'Heterozygot' },
                { label: 'ACTN3 (Muskelfaser)', value: dna.actn3Variant, info: 'Sprint-Typ' },
                { label: 'APOE (Lipidstoffwechsel)', value: dna.apoeVariant, info: 'Normales Risiko' },
              ].map((marker) => (
                <div key={marker.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-700">{marker.label}</p>
                    <p className="text-xs text-gray-400">{marker.info}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-mono font-semibold text-emerald-700">{marker.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Empfehlungen</h3>
            <div className="space-y-3">
              {[
                { cat: 'Ernaehrung', text: 'Reduzieren Sie gesaettigte Fette aufgrund Ihres FTO-Varianten-Profils', prio: 'hoch' },
                { cat: 'Supplements', text: 'Methylfolat statt Folsaeure empfohlen (MTHFR AG)', prio: 'mittel' },
                { cat: 'Sport', text: 'HIIT-Training optimal fuer Ihren ACTN3 RR Genotyp', prio: 'mittel' },
                { cat: 'Lifestyle', text: 'Vitamin D Spiegel regelmaessig pruefen (VDR-Variante)', prio: 'niedrig' },
              ].map((rec, i) => (
                <div key={i} className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-emerald-600">{rec.cat}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${rec.prio === 'hoch' ? 'bg-red-100 text-red-600' : rec.prio === 'mittel' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'}`}>{rec.prio}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{rec.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
