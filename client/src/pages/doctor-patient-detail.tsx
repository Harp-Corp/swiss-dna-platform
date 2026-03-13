import { Link } from "wouter";
import { DoctorSidebar } from "@/components/DoctorSidebar";
import { ScoreCircle } from "@/components/ScoreCircle";
import { dnaScores, geneticMarkers, recommendations, categoryLabels, categoryColors } from "@/lib/data";
import { ArrowLeft, User, Mail, Shield } from "lucide-react";

const riskColors: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  moderate: "bg-amber-100 text-amber-800",
  normal: "bg-green-100 text-green-800",
  low: "bg-blue-100 text-blue-800",
};

export default function DoctorPatientDetail() {
  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        {/* Back link */}
        <Link
          href="/arzt/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#1B3A6B] transition-colors mb-6"
          data-testid="link-back"
        >
          <ArrowLeft size={16} />
          Zurück zur Übersicht
        </Link>

        {/* Patient Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6" data-testid="card-patient-header">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-lg font-bold">
              GB
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1B3A6B]">Gusti Brösmeli</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail size={14} /> gusti@demo.ch</span>
                <span className="flex items-center gap-1"><User size={14} /> Patient ID: 1</span>
              </div>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Aktiv — COMPLETE
              </span>
            </div>
          </div>
        </div>

        {/* DNA Scores */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6" data-testid="card-doctor-scores">
          <h2 className="text-sm font-semibold text-[#1B3A6B] mb-5">Genetische Scores</h2>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {dnaScores.map((score) => (
              <ScoreCircle
                key={score.label}
                value={score.value}
                max={score.max}
                label={score.label}
                color={score.color}
                size={96}
              />
            ))}
          </div>
        </div>

        {/* Genetic Markers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6" data-testid="card-doctor-markers">
          <h2 className="text-sm font-semibold text-[#1B3A6B] mb-4">Genetische Marker</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Gen</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Funktion</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Genotyp</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {geneticMarkers.map((marker) => (
                  <tr key={marker.gene} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 px-3 font-mono font-bold text-[#1B3A6B]">{marker.gene}</td>
                    <td className="py-3 px-3 text-muted-foreground">{marker.function}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex px-2 py-0.5 rounded font-mono font-bold text-xs bg-gray-100 text-foreground">
                        {marker.genotype}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${riskColors[marker.risk]}`}>
                        {marker.interpretation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6" data-testid="card-doctor-recommendations">
          <h2 className="text-sm font-semibold text-[#1B3A6B] mb-4">Empfehlungen ({recommendations.length})</h2>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                data-testid={`doctor-rec-${rec.id}`}
              >
                <div className="shrink-0 mt-0.5">
                  {rec.priority === 5 && <span className="text-amber-500">⚡</span>}
                  {rec.priority === 3 && <span className="text-gray-400">●</span>}
                  {rec.priority === 2 && <span className="text-gray-300">○</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryColors[rec.category]}`}>
                      {categoryLabels[rec.category]}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Priorität {rec.priority}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground">{rec.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{rec.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GUMG Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Shield size={16} className="text-green-600" />
          <span>GUMG-akkreditierte Analyse</span>
        </div>

        {/* Footer */}
        <footer className="mt-4 pt-4 text-center">
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
