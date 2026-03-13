import { useState } from "react";
import { PatientSidebar } from "@/components/PatientSidebar";
import { reports, patientInfo, type ImpactLevel, type ReportType, type ReportArea } from "@/lib/dna-data";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";

const reportColors: Record<string, { bg: string; text: string; border: string; tabBg: string; tabText: string; lightBg: string }> = {
  diet:       { bg: "bg-green-500",  text: "text-green-700",  border: "border-green-500", tabBg: "bg-green-600",  tabText: "text-white", lightBg: "bg-green-50" },
  health:     { bg: "bg-blue-500",   text: "text-blue-700",   border: "border-blue-500",  tabBg: "bg-blue-600",   tabText: "text-white", lightBg: "bg-blue-50" },
  mind:       { bg: "bg-cyan-500",   text: "text-cyan-700",   border: "border-cyan-500",  tabBg: "bg-cyan-600",   tabText: "text-white", lightBg: "bg-cyan-50" },
  resilience: { bg: "bg-teal-500",   text: "text-teal-700",   border: "border-teal-500",  tabBg: "bg-teal-600",   tabText: "text-white", lightBg: "bg-teal-50" },
  sport:      { bg: "bg-orange-500", text: "text-orange-700", border: "border-orange-500",tabBg: "bg-orange-500", tabText: "text-white", lightBg: "bg-orange-50" },
};

function ImpactDots({ impact, color }: { impact: ImpactLevel; color: string }) {
  if (impact === "beneficial") {
    return (
      <span className="inline-flex items-center gap-0.5" title="Vorteilhaft">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    );
  }

  if (impact === "none") {
    return (
      <span className="inline-flex items-center gap-1" title="Kein Impact">
        <span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: "#cbd5e1" }} />
      </span>
    );
  }

  const count = impact === "low" ? 1 : impact === "moderate" ? 2 : 3;
  const maxDots = 3;

  return (
    <span className="inline-flex items-center gap-1" title={`Impact: ${impact}`}>
      {Array.from({ length: maxDots }).map((_, i) => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: i < count ? color : "transparent",
            border: i < count ? "none" : "2px solid #cbd5e1",
          }}
        />
      ))}
    </span>
  );
}

function PriorityBadge({ priority }: { priority?: "NIEDRIG" | "MODERAT" | "HOCH" }) {
  if (!priority) return null;
  const styles: Record<string, string> = {
    NIEDRIG: "bg-blue-100 text-blue-700",
    MODERAT: "bg-amber-100 text-amber-700",
    HOCH: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[priority]}`}>
      {priority}
    </span>
  );
}

function AreaSection({ area, reportId }: { area: ReportArea; reportId: string }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const colors = reportColors[reportId];
  const reportDef = reports.find(r => r.id === reportId);
  const dotColor = reportDef?.color || "#64748b";

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden" data-testid={`area-${area.name}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-[#1B3A6B]">{area.name}</h3>
          <PriorityBadge priority={area.priority} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground">{area.genes.length} Gene</span>
          {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 pb-3">
          {area.summary && (
            <p className="text-xs text-muted-foreground py-2 border-b border-gray-100 mb-1 italic">{area.summary}</p>
          )}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 pr-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-[120px]">Gen</th>
                <th className="text-left py-2.5 pr-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Variation</th>
                <th className="text-left py-2.5 pr-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-[90px]">Genotyp</th>
                <th className="text-left py-2.5 pr-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-[80px]">Impact</th>
              </tr>
            </thead>
            <tbody>
              {area.genes.map((gene, idx) => (
                <tr
                  key={`${gene.gene}-${gene.variation}-${idx}`}
                  className="border-b border-gray-50 last:border-0 group"
                  data-testid={`row-gene-${gene.gene}-${idx}`}
                >
                  <td className="py-2 pr-3 font-mono font-bold text-[#1B3A6B] text-xs">{gene.gene}</td>
                  <td className="py-2 pr-3 text-xs text-muted-foreground">
                    <span>{gene.variation}</span>
                    {gene.description && (
                      <span className={`block text-[11px] mt-0.5 ${colors.text} font-medium`}>{gene.description}</span>
                    )}
                  </td>
                  <td className="py-2 pr-3">
                    <span className="inline-flex px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-gray-100 text-foreground">
                      {gene.genotype}
                    </span>
                  </td>
                  <td className="py-2 pr-3">
                    <ImpactDots impact={gene.impact} color={dotColor} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ReportContent({ report }: { report: ReportType }) {
  const colors = reportColors[report.id];
  const totalGenes = report.areas.reduce((sum, a) => sum + a.genes.length, 0);
  const highImpact = report.areas.reduce((sum, a) => sum + a.genes.filter(g => g.impact === "high").length, 0);
  const modImpact = report.areas.reduce((sum, a) => sum + a.genes.filter(g => g.impact === "moderate").length, 0);

  return (
    <div className="space-y-4">
      {/* Report summary card */}
      <div className={`${colors.lightBg} rounded-xl p-5 border ${colors.border}/20`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{report.icon}</span>
              <h2 className="text-base font-bold text-[#1B3A6B]">{report.title}</h2>
            </div>
            <p className="text-xs text-muted-foreground">{report.subtitle}</p>
          </div>
          <div className="flex gap-3 text-center shrink-0">
            <div>
              <div className="text-lg font-bold text-[#1B3A6B]">{totalGenes}</div>
              <div className="text-[10px] text-muted-foreground uppercase">Gene</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">{highImpact}</div>
              <div className="text-[10px] text-muted-foreground uppercase">Hoch</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-600">{modImpact}</div>
              <div className="text-[10px] text-muted-foreground uppercase">Moderat</div>
            </div>
          </div>
        </div>
        {report.overallSummary && (
          <p className="text-sm text-[#1B3A6B]/80 leading-relaxed">{report.overallSummary}</p>
        )}
      </div>

      {/* Impact Legend */}
      <div className="flex flex-wrap items-center gap-4 px-1 text-[11px] text-muted-foreground">
        <span className="font-semibold text-[#1B3A6B]">Impact-Legende:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-300" /> Kein
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: report.color }} /> Niedrig
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex gap-0.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: report.color }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: report.color }} />
          </span>
          Moderat
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex gap-0.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: report.color }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: report.color }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: report.color }} />
          </span>
          Hoch
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke={report.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Vorteilhaft
        </span>
      </div>

      {/* Areas */}
      <div className="space-y-3">
        {report.areas.map((area, idx) => (
          <AreaSection key={`${area.name}-${idx}`} area={area} reportId={report.id} />
        ))}
      </div>
    </div>
  );
}

export default function DnaResults() {
  const [activeTab, setActiveTab] = useState("diet");

  const activeReport = reports.find(r => r.id === activeTab) || reports[0];

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      <PatientSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1B3A6B]" data-testid="text-dna-heading">
            Ihre DNA-Analyse
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            5 Berichte mit {reports.reduce((s, r) => s + r.areas.reduce((a, ar) => a + ar.genes.length, 0), 0)} analysierten Genvarianten — Laboranalyse vom {patientInfo.reportDate}
          </p>
        </div>

        {/* Lab info */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" data-testid="card-lab-info">
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Patient:</span> {patientInfo.name}
          </span>
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Labor:</span> {patientInfo.lab}
          </span>
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Ref:</span> {patientInfo.sampleId}
          </span>
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">Arzt:</span> {patientInfo.contact}
          </span>
        </div>

        {/* Report Tabs */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1" data-testid="report-tabs">
          {reports.map((report) => {
            const isActive = activeTab === report.id;
            const colors = reportColors[report.id];
            return (
              <button
                key={report.id}
                onClick={() => setActiveTab(report.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? `${colors.tabBg} ${colors.tabText} shadow-md`
                    : "bg-white text-muted-foreground border border-gray-200 hover:border-gray-300 hover:text-foreground"
                }`}
                data-testid={`tab-${report.id}`}
              >
                <span className="text-base">{report.icon}</span>
                <span>{report.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20" : "bg-gray-100"
                }`}>
                  {report.areas.reduce((s, a) => s + a.genes.length, 0)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Report Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6" data-testid={`report-content-${activeTab}`}>
          <ReportContent report={activeReport} />
        </div>

        {/* GUMG Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="badge-gumg">
          <Shield size={16} className="text-green-600" />
          <span>GUMG-akkreditierte Analyse</span>
        </div>

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
