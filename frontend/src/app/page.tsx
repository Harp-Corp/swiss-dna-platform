'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        window.location.href = '/patient/dashboard';
      }
    } catch (err) {
      console.error('Login failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: 'patient' | 'arzt') => {
    if (role === 'patient') {
      localStorage.setItem('demo_role', 'patient');
      localStorage.setItem('demo_name', 'Gusti Brosmeli');
      localStorage.setItem('demo_email', 'gusti@demo.ch');
      window.location.href = '/patient/dashboard';
    } else {
      localStorage.setItem('demo_role', 'arzt');
      localStorage.setItem('demo_name', 'Dr. Farkas');
      localStorage.setItem('demo_email', 'dr.farkas@evaz.ch');
      window.location.href = '/arzt/dashboard';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1B3A6B]">Swiss DNA Code</h1>
          <p className="mt-2 text-gray-500">Personalisierte DNA-Analyse</p>
          <p className="text-sm text-gray-400">EVAZ - Dr. Farkas</p>
        </div>

        {/* Demo Login Buttons */}
        <div className="space-y-3">
          <p className="text-xs text-center text-gray-400 uppercase tracking-wide">Demo-Zugang</p>
          <button
            onClick={() => handleDemoLogin('patient')}
            className="w-full rounded-lg bg-[#1B3A6B] px-4 py-3 font-semibold text-white transition hover:bg-[#152d54]"
          >
            Als Patient anmelden
          </button>
          <button
            onClick={() => handleDemoLogin('arzt')}
            className="w-full rounded-lg border-2 border-[#C9A84C] px-4 py-3 font-semibold text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-white"
          >
            Als Arzt anmelden
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-400">oder mit Konto anmelden</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="ihre@email.ch"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1B3A6B] px-4 py-3 font-semibold text-white transition hover:bg-[#152d54] disabled:opacity-50"
          >
            {loading ? 'Anmelden...' : 'Anmelden'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Noch kein Konto?{' '}
          <Link href="/register" className="text-[#1B3A6B] font-medium hover:underline">
            Registrieren
          </Link>
        </p>

        {/* Swiss badge */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-lg">🇨🇭</span>
          <p className="text-xs text-gray-400">
            Daten in der Schweiz verarbeitet &bull; revDSG & GUMG konform
          </p>
        </div>
      </div>
    </div>
  );
}
