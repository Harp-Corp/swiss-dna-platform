'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      if (user.role === 'DOCTOR') {
        router.replace('/arzt/dashboard');
      } else {
        router.replace('/patient/dashboard');
      }
    }
  }, [user, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.user.role === 'DOCTOR') {
        router.push('/arzt/dashboard');
      } else {
        router.push('/patient/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Anmeldung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'patient' | 'arzt') => {
    setError('');
    setLoading(true);
    try {
      if (role === 'patient') {
        const res = await login('gusti@demo.ch', 'patient123');
        router.push('/patient/dashboard');
      } else {
        const res = await login('farkas@evaz.ch', 'doctor123');
        router.push('/arzt/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo-Anmeldung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B3A6B]" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1B3A6B]">Swiss DNA Code</h1>
          <p className="mt-2 text-gray-500">Personalisierte DNA-Analyse</p>
          <p className="text-sm text-gray-400">EVAZ - Dr. Farkas</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Demo Login Buttons */}
        <div className="space-y-3">
          <p className="text-xs text-center text-gray-400 uppercase tracking-wide">Demo-Zugang</p>
          <button
            onClick={() => handleDemoLogin('patient')}
            disabled={loading}
            className="w-full rounded-lg bg-[#1B3A6B] px-4 py-3 font-semibold text-white transition hover:bg-[#152d54] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Anmelden...
              </span>
            ) : (
              'Als Patient anmelden'
            )}
          </button>
          <p className="text-xs text-center text-gray-400">gusti@demo.ch / patient123</p>
          <button
            onClick={() => handleDemoLogin('arzt')}
            disabled={loading}
            className="w-full rounded-lg border-2 border-[#C9A84C] px-4 py-3 font-semibold text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-white disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                Anmelden...
              </span>
            ) : (
              'Als Arzt anmelden'
            )}
          </button>
          <p className="text-xs text-center text-gray-400">farkas@evaz.ch / doctor123</p>
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
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Anmelden...
              </span>
            ) : (
              'Anmelden'
            )}
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
