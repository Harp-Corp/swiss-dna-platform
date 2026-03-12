'use client';
import { useState } from 'react';

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
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Login failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-800">Swiss DNA Code</h1>
          <p className="mt-2 text-gray-500">Personalisierte DNA-Analyse</p>
          <p className="text-sm text-gray-400">EVAZ - Dr. Farkas</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="ihre@email.ch" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Passwort</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Anmelden...' : 'Anmelden'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400">
          revDSG & GUMG konform | Daten in der Schweiz
        </p>
      </div>
    </div>
  );
}
