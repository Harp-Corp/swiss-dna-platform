'use client';
import { useState } from 'react';

const RECOMMENDATIONS = [
  {
    category: 'Ernaehrung',
    icon: '🥗',
    color: 'emerald',
    items: [
      { title: 'Folat-reiche Ernaehrung', priority: 'hoch', description: 'MTHFR-Variante (Heterozygot): Erhoehter Bedarf an Methylfolat. Empfohlen: Blattgemuese, Huelsenfruechte, Avocado.', supplement: 'L-Methylfolat 400-800mcg/Tag' },
      { title: 'Omega-3 Fettsaeuren', priority: 'mittel', description: 'APOE E3/E3: Normales Lipidprofil. Regelmaessige Omega-3 Zufuhr unterstuetzt kardiovaskulaere Gesundheit.', supplement: 'EPA/DHA 1000mg/Tag' },
      { title: 'Vitamin D Optimierung', priority: 'hoch', description: 'VDR-Variante detektiert: Reduzierte Vitamin-D-Rezeptor-Aktivitaet. Hoehere Supplementierung empfohlen.', supplement: 'Vitamin D3 4000 IE/Tag' },
    ],
  },
  {
    category: 'Bewegung',
    icon: '🏃',
    color: 'orange',
    items: [
      { title: 'Sprint & Kraft Training', priority: 'hoch', description: 'ACTN3 Sprint-Typ: Genetische Praedisposition fuer schnelle Muskelfasern. Krafttraining und HIIT bevorzugen.', supplement: null },
      { title: 'Regeneration beachten', priority: 'mittel', description: 'IL-6 Variante: Leicht erhoehte Entzuendungsneigung nach intensivem Training. 48h Pause zwischen Einheiten.', supplement: null },
    ],
  },
  {
    category: 'Stressmanagement',
    icon: '🧠',
    color: 'purple',
    items: [
      { title: 'COMT-optimiertes Stressmanagement', priority: 'mittel', description: 'COMT Val/Met: Mittlerer Dopamin-Abbau. Meditation und regelmaessige Pausen empfohlen.', supplement: 'Magnesium Glycinat 400mg/Tag' },
      { title: 'Schlafhygiene', priority: 'hoch', description: 'CLOCK-Gen Variante: Tendenz zu spaeterem Chronotyp. Strikte Schlafenszeit und Blaulichtfilter ab 20 Uhr.', supplement: null },
    ],
  },
  {
    category: 'Praevention',
    icon: '🛡️',
    color: 'blue',
    items: [
      { title: 'Kardiovaskulaere Vorsorge', priority: 'mittel', description: 'FTO CT-Variante: Leicht erhoehtes Adipositas-Risiko. Regelmaessige Blutdruck- und Lipidkontrollen.', supplement: null },
      { title: 'Antioxidantien', priority: 'niedrig', description: 'SOD2 Variante: Leicht reduzierte antioxidative Kapazitaet. Beerenobst und gruener Tee empfohlen.', supplement: 'Coenzym Q10 100mg/Tag' },
    ],
  },
];

const priorityColors: Record<string, string> = {
  hoch: 'bg-red-100 text-red-700',
  mittel: 'bg-yellow-100 text-yellow-700',
  niedrig: 'bg-green-100 text-green-700',
};

export default function RecommendationsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? RECOMMENDATIONS.filter((r) => r.category === activeCategory)
    : RECOMMENDATIONS;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-emerald-700">Swiss DNA Code</h1>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-sm text-gray-500 hover:underline">Dashboard</a>
            <a href="/dashboard/upload" className="text-sm text-gray-500 hover:underline">Upload</a>
            <span className="text-sm text-emerald-600 font-medium">Empfehlungen</span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Personalisierte Empfehlungen</h2>
        <p className="mb-6 text-gray-500">Basierend auf Ihrer genetischen Analyse - erstellt am 12.03.2026</p>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${!activeCategory ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >Alle</button>
          {RECOMMENDATIONS.map((r) => (
            <button
              key={r.category}
              onClick={() => setActiveCategory(r.category === activeCategory ? null : r.category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${r.category === activeCategory ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
            >{r.icon} {r.category}</button>
          ))}
        </div>

        <div className="space-y-8">
          {filtered.map((group) => (
            <div key={group.category}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{group.icon} {group.category}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div key={item.title} className="rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[item.priority]}`}>{item.priority}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    {item.supplement && (
                      <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm">
                        <span className="font-medium text-emerald-700">Supplement:</span> {item.supplement}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
          <strong>Hinweis:</strong> Diese Empfehlungen basieren auf genetischen Daten und ersetzen keine aerztliche Beratung. Besprechen Sie Aenderungen immer mit Ihrem Arzt Dr. Farkas (EVAZ).
        </div>
      </main>
    </div>
  );
}
