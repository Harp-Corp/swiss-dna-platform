import { useState } from "react";
import { PatientSidebar } from "@/components/PatientSidebar";
import { enhancedRecommendations, reports, type PersonalizedRecommendation } from "@/lib/dna-data";

const categoryLabels: Record<string, string> = {
  ernährung: "Ernährung",
  supplemente: "Supplemente",
  sport: "Sport",
  stressmanagement: "Stressmanagement",
  schlaf: "Schlaf",
  lebensstil: "Lebensstil",
  detox: "Detox",
};

const categoryColors: Record<string, string> = {
  ernährung: "bg-green-100 text-green-800",
  supplemente: "bg-blue-100 text-blue-800",
  sport: "bg-pink-100 text-pink-800",
  stressmanagement: "bg-purple-100 text-purple-800",
  schlaf: "bg-indigo-100 text-indigo-800",
  lebensstil: "bg-amber-100 text-amber-800",
  detox: "bg-cyan-100 text-cyan-800",
};

const categoryIcons: Record<string, string> = {
  ernährung: "🥗",
  supplemente: "💊",
  sport: "🏃",
  stressmanagement: "🧘",
  schlaf: "😴",
  lebensstil: "🌿",
  detox: "🧹",
};

const filterTabs = [
  { key: "all", label: "Alle", icon: "📋" },
  { key: "supplemente", label: "Supplemente", icon: "💊" },
  { key: "ernährung", label: "Ernährung", icon: "🥗" },
  { key: "sport", label: "Sport", icon: "🏃" },
  { key: "stressmanagement", label: "Stressmanagement", icon: "🧘" },
  { key: "schlaf", label: "Schlaf", icon: "😴" },
  { key: "lebensstil", label: "Lebensstil", icon: "🌿" },
  { key: "detox", label: "Detox", icon: "🧹" },
];

const reportBadgeColors: Record<string, { bg: string; text: string }> = {
  diet:       { bg: "bg-green-100", text: "text-green-700" },
  health:     { bg: "bg-blue-100", text: "text-blue-700" },
  mind:       { bg: "bg-cyan-100", text: "text-cyan-700" },
  resilience: { bg: "bg-teal-100", text: "text-teal-700" },
  sport:      { bg: "bg-orange-100", text: "text-orange-700" },
};

function PriorityBadge({ priority }: { priority: "hoch" | "mittel" | "niedrig" }) {
  const styles: Record<string, string> = {
    hoch: "bg-red-100 text-red-700 ring-red-200",
    mittel: "bg-amber-100 text-amber-700 ring-amber-200",
    niedrig: "bg-blue-100 text-blue-700 ring-blue-200",
  };
  const labels: Record<string, string> = {
    hoch: "Hoch",
    mittel: "Mittel",
    niedrig: "Niedrig",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ${styles[priority]}`}>
      {priority === "hoch" && "⚡ "}{labels[priority]}
    </span>
  );
}

function RecommendationCard({ rec }: { rec: PersonalizedRecommendation }) {
  const borderColors: Record<string, string> = {
    hoch: "border-l-red-400",
    mittel: "border-l-amber-400",
    niedrig: "border-l-blue-300",
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 border-l-4 ${borderColors[rec.priority]} p-5 hover:shadow-md transition-all`}
      data-testid={`card-recommendation-${rec.id}`}
    >
      {/* Top row: priority + category */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <PriorityBadge priority={rec.priority} />
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${categoryColors[rec.category]}`}>
          <span>{categoryIcons[rec.category]}</span>
          {categoryLabels[rec.category]}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-[#1B3A6B] mb-2" data-testid={`text-rec-title-${rec.id}`}>
        {rec.title}
      </h3>

      {/* Content */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        {rec.content}
      </p>

      {/* Gene chips */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {rec.genes.map((gene) => (
          <span
            key={gene}
            className="inline-flex px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono font-bold text-[#1B3A6B]"
          >
            {gene}
          </span>
        ))}
      </div>

      {/* Report source badges */}
      <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100">
        <span className="text-[10px] text-muted-foreground mr-1">Quellen:</span>
        {rec.reportSource.map((source) => {
          const report = reports.find(r => r.id === source);
          const colors = reportBadgeColors[source] || { bg: "bg-gray-100", text: "text-gray-600" };
          return (
            <span
              key={source}
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text}`}
            >
              <span className="text-xs">{report?.icon}</span>
              {report?.title || source}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Recommendations() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? enhancedRecommendations
    : enhancedRecommendations.filter((r) => r.category === activeFilter);

  // Sort by priority: hoch first, then mittel, then niedrig
  const priorityOrder = { hoch: 0, mittel: 1, niedrig: 2 };
  const sorted = [...filtered].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Stats
  const hochCount = enhancedRecommendations.filter(r => r.priority === "hoch").length;
  const mittelCount = enhancedRecommendations.filter(r => r.priority === "mittel").length;
  const niedrigCount = enhancedRecommendations.filter(r => r.priority === "niedrig").length;

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      <PatientSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1B3A6B]" data-testid="text-recommendations-heading">
            Ihre Empfehlungen
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {enhancedRecommendations.length} personalisierte Empfehlungen basierend auf 5 DNA-Analysen
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-md">
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-lg font-bold text-red-600">{hochCount}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-medium">Hohe Priorität</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-lg font-bold text-amber-600">{mittelCount}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-medium">Mittlere Priorität</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{niedrigCount}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-medium">Niedrige Priorität</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6" data-testid="filter-tabs">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key;
            const count = tab.key === "all"
              ? enhancedRecommendations.length
              : enhancedRecommendations.filter(r => r.category === tab.key).length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#1B3A6B] text-white shadow-md"
                    : "bg-white text-muted-foreground border border-gray-200 hover:border-[#1B3A6B]/30"
                }`}
                data-testid={`filter-${tab.key}`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20" : "bg-gray-100"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Recommendation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-testid="recommendations-grid">
          {sorted.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-muted-foreground text-sm">Keine Empfehlungen in dieser Kategorie.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-4 text-center">
          <a
            href="https://www.perplexity.ai/computer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground"
          >
            Created with Perplexity Computer
          </a>
        </footer>
      </main>
    </div>
  );
}
