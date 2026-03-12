'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth';
import { DNA_CATEGORIES, type DnaCategory, type MarkerRating } from '@/lib/mock-data';

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

function RatingBadge({ rating }: { rating: MarkerRating }) {
  const style = RATING_STYLES[rating];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

function CategoryOverviewCard({ category }: { category: DnaCategory }) {
  const counts = { optimal: 0, moderat: 0, risiko: 0 };
  category.markers.forEach((m) => counts[m.rating]++);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{CATEGORY_ICONS[category.key] ?? '🧬'}</span>
        <h3 className="text-lg font-semibold text-[#1B3A6B]">{category.label}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-3">{category.markers.length} Marker analysiert</p>
      <div className="flex gap-3">
        {counts.optimal > 0 && (
          <span className="flex items-center gap-1 text-xs text-green-700">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            {counts.optimal} Optimal
          </span>
        )}
        {counts.moderat > 0 && (
          <span className="flex items-center gap-1 text-xs text-amber-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            {counts.moderat} Moderat
          </span>
        )}
        {counts.risiko > 0 && (
          <span className="flex items-center gap-1 text-xs text-red-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            {counts.risiko} Risiko
          </span>
        )}
      </div>
    </div>
  );
}

export default function DnaResultsPage() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { user, logout } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Laden...';

  const tabs = [
    { key: 'overview', label: 'Übersicht' },
    ...DNA_CATEGORIES.map((c) => ({ key: c.key, label: c.label })),
  ];

  const activeCategory = DNA_CATEGORIES.find((c) => c.key === activeTab);

  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="patient" userName={userName} onLogout={logout} />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1B3A6B]">DNA-Resultate</h2>
            <p className="text-gray-500 mt-1">
              Patient: {userName} &middot; Analysedatum: 30.12.2025
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-[#1B3A6B] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tab.key !== 'overview' && (
                  <span className="mr-1.5">{CATEGORY_ICONS[tab.key]}</span>
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Kategorien-Übersicht</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {DNA_CATEGORIES.map((cat) => (
                  <CategoryOverviewCard key={cat.key} category={cat} />
                ))}
              </div>

              {/* Summary stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h4 className="font-semibold text-[#1B3A6B] mb-3">Gesamtauswertung</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {DNA_CATEGORIES.reduce((sum, c) => sum + c.markers.filter((m) => m.rating === 'optimal').length, 0)}
                    </p>
                    <p className="text-sm text-gray-500">Optimal</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-500">
                      {DNA_CATEGORIES.reduce((sum, c) => sum + c.markers.filter((m) => m.rating === 'moderat').length, 0)}
                    </p>
                    <p className="text-sm text-gray-500">Moderat</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-500">
                      {DNA_CATEGORIES.reduce((sum, c) => sum + c.markers.filter((m) => m.rating === 'risiko').length, 0)}
                    </p>
                    <p className="text-sm text-gray-500">Risiko</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Detail View */}
          {activeCategory && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{CATEGORY_ICONS[activeCategory.key]}</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1B3A6B]">{activeCategory.label}</h3>
                  <p className="text-sm text-gray-500">{activeCategory.markers.length} genetische Marker</p>
                </div>
              </div>

              <div className="space-y-4">
                {activeCategory.markers.map((marker) => (
                  <div
                    key={marker.name}
                    className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                  >
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
          )}

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
