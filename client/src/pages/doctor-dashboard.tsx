import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { DoctorSidebar } from "@/components/DoctorSidebar";
import { Users, Package, Sparkles, ExternalLink } from "lucide-react";

export default function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-[#1B3A6B]" data-testid="text-doctor-heading">
            Praxis-Übersicht
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {user?.firstName} {user?.lastName} — EVAZ Zürich
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4" data-testid="stat-patients">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B3A6B]">1</p>
              <p className="text-sm text-muted-foreground">Patient</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4" data-testid="stat-packages">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
              <Package className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B3A6B]">1</p>
              <p className="text-sm text-muted-foreground">Aktive Pakete</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4" data-testid="stat-recommendations">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <Sparkles className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B3A6B]">12</p>
              <p className="text-sm text-muted-foreground">Empfehlungen</p>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-xl border border-gray-200" data-testid="card-patient-list">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-[#1B3A6B]">Patienten</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Name</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">E-Mail</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Paket</th>
                  <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="text-right py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Aktion</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  data-testid="row-patient-1"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-xs font-bold">
                        GB
                      </div>
                      <span className="font-medium text-foreground">Gusti Brösmeli</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-muted-foreground">gusti@demo.ch</td>
                  <td className="py-4 px-5">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-800">
                      COMPLETE
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-100 text-green-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Aktiv
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      href="/arzt/patients/1"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1B3A6B] hover:text-[#C9A84C] transition-colors"
                      data-testid="link-patient-detail"
                    >
                      Details <ExternalLink size={12} />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 text-center space-y-1">
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
