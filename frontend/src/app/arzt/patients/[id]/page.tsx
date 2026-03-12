'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth';
import {
  PATIENTS,
  DNA_CATEGORIES,
  RECOMMENDATIONS,
  DOCUMENTS,
  type MarkerRating,
} from '@/lib/mock-data';

const CATEGORY_ICONS: Record<string, string> = {
  diet: '🥗',
  sport: '🏃',
  health: '❤️',
  mind: '🧠',
  resilience: '🛡️',
};

const RATING_STYLES: Record<MarkerRating, { bg: string; text: string; label: string }> = {
  optimal: { bg: 'bg-green-100', text: 'text-green-700', label: 'Optimal' },
  moderat: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Moderat' },
  risiko: { bg: 'bg-red-100', text: 'text-red-700', label: 'Risiko' },
};

const ANAMNESIS_DATA = {
  persoenlich: { Alter: '55', Geschlecht: 'Männlich', Grösse: '178 cm', Gewicht: '85 kg', Blutgruppe: 'A+', Geburtsdatum: '19.12.1970' },
  gesundheit: { 'Chronische Erkrankungen': 'Keine bekannt', Allergien: 'Pollen (saisonal)', Medikamente: 'Keine', 'Letzte Vorsorge': '15.11.2025' },
  lebensstil: { Raucher: 'Nein', Alkohol: 'Gelegentlich', Sport: '3–4x/Woche', Schlaf: '6–7 Stunden', Stresslevel: 'Mittel-Hoch' },
  ernaehrung: { Ernährungstyp: 'Mischkost (empfohlen: Mediterran)', Unverträglichkeiten: 'Keine bekannt', 'Mahlzeiten/Tag': '3', Wasserkonsum: '1.5–2 Liter' },
};

type TabKey = 'overview' | 'dna' | 'recommendations' | 'anamnesis' | 'documents';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Übersicht' },
  { key: 'dna', label: 'DNA-Resultate' },
  { key: 'recommendations', label: 'Empfehlungen' },
  { key: 'anamnesis', label: 'Anamnese' },
  { key: 'documents', label: 'Dokumente' },
];

function RatingBadge({ rating }: { rating: MarkerRating }) {
  const style = RATING_STYLES[rating];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

/* ---- Tab Content Components ---- */

function OverviewTab() {
  return (
    <div>
      {/* Category Summary Cards */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">DNA-Kategorien</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {DNA_CATEGORIES.map((cat) => {
          const counts = { optimal: 0, moderat: 0, risiko: 0 };
          cat.markers.forEach((m) => counts[m.rating]++);
          return (
            <div key={cat.key} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{CATEGORY_ICONS[cat.key] ?? '🧬'}</span>
                <h4 className="font-semibold text-[#1B3A6B]">{cat.label}</h4>
              </div>
              <p className="text-sm text-gray-500 mb-3">{cat.markers.length} Marker analysiert</p>
              <div className="flex gap-3">
                {counts.optimal > 0 && (
                  <span className="flex items-center gap-1 text-xs text-green-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    {counts.optimal}
                  </span>
                )}
                {counts.moderat > 0 && (
                  <span className="flex items-center gap-1 text-xs text-amber-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    {counts.moderat}
                  </span>
                )}
                {counts.risiko > 0 && (
                  <span className="flex items-center gap-1 text-xs text-red-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    {counts.risiko}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h4 className="font-semibold text-[#1B3A6B] mb-4">Zusammenfassung</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-[#1B3A6B]">
              {DNA_CATEGORIES.reduce((s, c) => s + c.markers.length, 0)}
            </p>
            <p className="text-sm text-gray-500">Marker total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {DNA_CATEGORIES.reduce((s, c) => s + c.markers.filter((m) => m.rating === 'optimal').length, 0)}
            </p>
            <p className="text-sm text-gray-500">Optimal</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-500">
              {DNA_CATEGORIES.reduce((s, c) => s + c.markers.filter((m) => m.rating === 'moderat').length, 0)}
            </p>
            <p className="text-sm text-gray-500">Moderat</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#C9A84C]">{RECOMMENDATIONS.length}</p>
            <p className="text-sm text-gray-500">Empfehlungen</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DnaTab() {
  const [activeCat, setActiveCat] = useState<string>(DNA_CATEGORIES[0].key);
  const category = DNA_CATEGORIES.find((c) => c.key === activeCat)!;

  return (
    <div>
      {/* Sub-tabs for DNA categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {DNA_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCat(cat.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCat === cat.key
                ? 'bg-[#1B3A6B] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            <span className="mr-1.5">{CATEGORY_ICONS[cat.key]}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Markers */}
      <div className="space-y-4">
        {category.markers.map((marker) => (
          <div key={marker.name} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="font-semibold text-[#1B3A6B]">{marker.name}</h4>
                <p className="text-sm text-gray-500 mt-0.5">
                  Genotyp: <span className="font-mono font-medium text-gray-700">{marker.genotype}</span>
                </p>
              </div>
              <RatingBadge rating={marker.rating} />
            </div>
            <p className="text-sm text-gray-600">{marker.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsTab() {
  const [notes, setNotes] = useState<Record<string, string>>({});

  const categories = [...new Set(RECOMMENDATIONS.map((r) => r.category))];

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat}>
          <h4 className="font-semibold text-[#1B3A6B] mb-3">{cat}</h4>
          <div className="space-y-3">
            {RECOMMENDATIONS.filter((r) => r.category === cat).map((rec) => (
              <div key={rec.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h5 className="font-medium text-gray-900">{rec.title}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Genetische Basis: {rec.geneticBasis}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rec.priority === 'hoch'
                        ? 'bg-red-100 text-red-700'
                        : rec.priority === 'mittel'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                {/* Doctor notes */}
                <div>
                  <label className="text-xs font-medium text-[#C9A84C]">Arzt-Notiz:</label>
                  <textarea
                    rows={2}
                    placeholder="Notiz hinzufügen..."
                    value={notes[rec.id] || ''}
                    onChange={(e) => setNotes({ ...notes, [rec.id]: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1B3A6B] focus:outline-none focus:ring-1 focus:ring-blue-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AnamnesisTab() {
  const sections = [
    { key: 'persoenlich', label: 'Persönliche Daten', icon: '👤' },
    { key: 'gesundheit', label: 'Gesundheit', icon: '🏥' },
    { key: 'lebensstil', label: 'Lebensstil', icon: '🌿' },
    { key: 'ernaehrung', label: 'Ernährung', icon: '🥗' },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sections.map((section) => (
        <div key={section.key} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{section.icon}</span>
            <h4 className="font-semibold text-[#1B3A6B]">{section.label}</h4>
          </div>
          <dl className="space-y-2">
            {Object.entries(ANAMNESIS_DATA[section.key]).map(([key, value]) => (
              <div key={key} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                <dt className="text-sm text-gray-500">{key}</dt>
                <dd className="text-sm font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

function DocumentsTab() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-700">Patientendokumente</h4>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1B3A6B] text-white hover:bg-[#152d54] transition-colors"
        >
          Dokument hochladen
        </button>
      </div>

      {showUpload && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4 text-center">
          <p className="text-sm text-[#1B3A6B] mb-2">Datei hierhin ziehen oder klicken</p>
          <p className="text-xs text-gray-400">PDF, JPG, PNG bis 10 MB (Demo-Modus)</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Name</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Typ</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Datum</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Grösse</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{doc.name}</td>
                <td className="px-6 py-4 text-gray-500">{doc.type}</td>
                <td className="px-6 py-4 text-gray-500">{doc.date}</td>
                <td className="px-6 py-4 text-gray-500">{doc.size}</td>
                <td className="px-6 py-4">
                  <button className="text-[#1B3A6B] hover:text-[#C9A84C] font-medium text-sm transition-colors">
                    Herunterladen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Main Page Component ---- */

export default function PatientDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const { user, logout } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Laden...';

  const patient = PATIENTS.find((p) => p.id === params.id) ?? PATIENTS[0];

  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="arzt" userName={userName} onLogout={logout} />
        <main className="flex-1 p-8">
          {/* Back Link */}
          <Link href="/arzt/patients" className="text-sm text-[#1B3A6B] hover:text-[#C9A84C] transition-colors mb-4 inline-block">
            &larr; Zurück zur Patientenliste
          </Link>

          {/* Patient Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1B3A6B]">{patient.name}</h2>
                <p className="text-gray-500 mt-1">{patient.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#1B3A6B]">
                  {patient.paket}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'Aktiv' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-[#C9A84C] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'dna' && <DnaTab />}
          {activeTab === 'recommendations' && <RecommendationsTab />}
          {activeTab === 'anamnesis' && <AnamnesisTab />}
          {activeTab === 'documents' && <DocumentsTab />}

          <DisclaimerBanner />

          {/* Footer */}
          <p className="text-xs text-gray-400 mt-8">
            🇨🇭 Daten in der Schweiz verarbeitet (Demo) &bull;{' '}
            <a href="#" className="underline">Impressum</a> – Dr. Farkas EVAZ®, Schweiz
          </p>
        </main>
      </div>
    </ProtectedRoute>
  );
}
