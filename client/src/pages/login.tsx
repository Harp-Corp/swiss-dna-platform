import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth, DEMO_PATIENT, DEMO_DOCTOR } from "@/lib/auth";
import { DnaLogo } from "@/components/DnaLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePatientLogin = () => {
    login(DEMO_PATIENT);
    setLocation("/patient/dashboard");
  };

  const handleDoctorLogin = () => {
    login(DEMO_DOCTOR);
    setLocation("/arzt/dashboard");
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "gusti@demo.ch") {
      login(DEMO_PATIENT);
      setLocation("/patient/dashboard");
    } else if (email === "farkas@evaz.ch") {
      login(DEMO_DOCTOR);
      setLocation("/arzt/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-white to-[#f7f3e8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <DnaLogo size={64} />
          </div>
          <h1 className="text-2xl font-bold text-[#1B3A6B] tracking-tight" data-testid="text-heading">
            Swiss DNA Code
          </h1>
          <p className="text-sm text-[#1B3A6B]/70 mt-1 font-medium">
            Personalisierte DNA-Analyse
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            EVAZ — Dr. Farkas
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 space-y-5">
          {/* Demo Login Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePatientLogin}
              className="w-full h-11 bg-[#1B3A6B] hover:bg-[#152d54] text-white font-medium"
              data-testid="button-patient-login"
            >
              Als Patient anmelden
            </Button>
            <p className="text-center text-[11px] text-muted-foreground -mt-1">
              gusti@demo.ch / patient123
            </p>

            <Button
              onClick={handleDoctorLogin}
              variant="outline"
              className="w-full h-11 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-medium"
              data-testid="button-doctor-login"
            >
              Als Arzt anmelden
            </Button>
            <p className="text-center text-[11px] text-muted-foreground -mt-1">
              farkas@evaz.ch / doctor123
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-muted-foreground">oder mit Konto anmelden</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleFormLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                E-Mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ihre@email.ch"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Passwort
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10"
                data-testid="input-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-10 bg-[#1B3A6B] hover:bg-[#152d54] text-white"
              data-testid="button-login"
            >
              Anmelden
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Noch kein Konto?{" "}
            <button className="text-[#C9A84C] hover:underline font-medium" data-testid="link-register">
              Registrieren
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-xs text-muted-foreground">
            🇨🇭 Daten in der Schweiz verarbeitet • revDSG & GUMG konform
          </p>
          <a
            href="https://www.perplexity.ai/computer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground"
          >
            Created with Perplexity Computer
          </a>
        </div>
      </div>
    </div>
  );
}
