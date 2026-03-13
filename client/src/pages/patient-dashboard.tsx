import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { PatientSidebar } from "@/components/PatientSidebar";
import { CheckCircle2, Clock, Sparkles, Dna, Star, ClipboardList, FileText } from "lucide-react";

const navCards = [
  { href: "/patient/dna-results", icon: "🧬", label: "DNA-Resultate", desc: "Genetische Analyse einsehen" },
  { href: "/patient/recommendations", icon: "⭐", label: "Empfehlungen", desc: "Personalisierte Ratschläge" },
  { href: "/patient/fragebogen", icon: "📝", label: "Fragebogen", desc: "Gesundheitsfragen beantworten" },
  { href: "/patient/dokumente", icon: "📄", label: "Dokumente", desc: "Berichte und Laborwerte" },
];

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      <PatientSidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-[#1B3A6B]" data-testid="text-welcome">
            Willkommen, {user?.firstName} {user?.lastName} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ihre persönliche DNA-Analyse-Übersicht
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4" data-testid="card-dna-status">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">DNA-Analyse</p>
              <p className="text-base font-semibold text-green-700">Abgeschlossen</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4" data-testid="card-labor-status">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <Clock className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Laborwerte</p>
              <p className="text-base font-semibold text-amber-700">Ausstehend</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4" data-testid="card-recommendations-status">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <Sparkles className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Empfehlungen</p>
              <p className="text-base font-semibold text-blue-700">12 verfügbar</p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {navCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#C9A84C]/50 hover:shadow-md transition-all group"
              data-testid={`card-nav-${card.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="text-sm font-semibold text-[#1B3A6B] group-hover:text-[#C9A84C] transition-colors">
                {card.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-8 text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            🇨🇭 Daten in der Schweiz verarbeitet (Demo) • Dr. Farkas EVAZ®, Schweiz
          </p>
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
