'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { RecommendationDisclaimer } from '@/components/DisclaimerBanner';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth';
import { RECOMMENDATIONS, type Recommendation } from '@/lib/mock-data';

const PRIORITY_STYLES: Record<string, { bg: string; text: string }> = {
  hoch: { bg: 'bg-red-100', text: 'text-red-700' },
  mittel: { bg: 'bg-amber-100', text: 'text-amber-700' },
  niedrig: { bg: 'bg-blue-100', text: 'text-blue-700' },
};

const CATEGORY_ICONS: Record<string, string> = {
  Supplements: '💊',
  Training: '🏋️',
  Lifestyle: '🌿',
  'Ernährung': '🥗',
  'Prävention': '🛡️',
};

function groupByCategory(recs: Recommendation[]): Record<string, Recommendation[]> {
  const groups: Record<string, Recommendation[]> = {};
  recs.forEach((r) => {
    if (!groups[r.category]) groups[r.category] = [];
    groups[r.category].push(r);
  });
  return groups;
}

export default function RecommendationsPage() {
  const [filter, setFilter] = useState<string>('alle');
  const { user, logout } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Laden...';

  const categories = ['alle', ...Array.from(new Set(RECOMMENDATIONS.map((r) => r.category)))];

  const filtered = filter === 'alle'
    ? RECOMMENDATIONS
    : RECOMMENDATIONS.filter((r) => r.category === filter);

  const grouped = groupByCategory(filtered);

  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="patient" userName={userName} onLogout={logout} />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1B3A6B]">Empfehlungen</h2>
            <p className="text-gray-500 mt-1">
              Personalisierte Empfehlungen basierend auf Ihrer DNA-Analyse
            </p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
              <p className="text-sm text-gray-500">Hohe Priorität</p>
              <p className="text-xl font-bold text-red-600 mt-1">
                {RECOMMENDATIONS.filter((r) => r.priority === 'hoch').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-amber-400">
              <p className="text-sm text-gray-500">Mittlere Priorität</p>
              <p className="text-xl font-bold text-amber-600 mt-1">
                {RECOMMENDATIONS.filter((r) => r.priority === 'mittel').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
              <p className="text-sm text-gray-500">Niedrige Priorität</p>
              <p className="text-xl font-bold text-blue-600 mt-1">
                {RECOMMENDATIONS.filter((r) => r.priority === 'niedrig').length}
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'bg-[#1B3A6B] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat !== 'alle' && <span className="mr-1.5">{CATEGORY_ICONS[cat] ?? '📋'}</span>}
                {cat === 'alle' ? 'Alle' : cat}
              </button>
            ))}
          </div>

          {/* Grouped Recommendations */}
          {Object.entries(grouped).map(([category, recs]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span>{CATEGORY_ICONS[category] ?? '📋'}</span>
                {category}
              </h3>
              <div className="space-y-4">
                {recs.map((rec) => {
                  const priority = PRIORITY_STYLES[rec.priority];
                  return (
                    <div
                      key={rec.id}
                      className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <h4 className="font-semibold text-[#1B3A6B]">{rec.title}</h4>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priority.bg} ${priority.text}`}
                        >
                          Priorität: {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      <p className="text-xs text-gray-400">
                        Genetische Grundlage: <span className="font-medium text-gray-500">{rec.geneticBasis}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <RecommendationDisclaimer />

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
