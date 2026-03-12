'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', consent: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) { setError('Bitte stimmen Sie der Datenverarbeitung zu.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setSuccess(true); } else {
        const data = await res.json();
        setError(data.message || 'Registrierung fehlgeschlagen');
      }
    } catch { setError('Verbindungsfehler'); }
    finally { setLoading(false); }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
          <div className="text-5xl mb-4">&#9993;&#65039;</div>
          <h2 className="text-2xl font-bold text-[#1B3A6B] mb-2">Registrierung erfolgreich!</h2>
          <p className="text-gray-500 mb-6">Bitte pruefen Sie Ihre E-Mail und bestaetigen Sie Ihren Account.</p>
          <a href="/" className="rounded-lg bg-[#1B3A6B] px-6 py-3 text-white font-semibold hover:bg-[#152d54]">Zum Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1B3A6B]">Swiss DNA Code</h1>
          <p className="mt-2 text-gray-500">Konto erstellen</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vorname</label>
              <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-blue-100" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nachname</label>
              <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-blue-100" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="ihre@email.ch" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Passwort</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-blue-100" minLength={8} required />
            <p className="mt-1 text-xs text-gray-400">Mindestens 8 Zeichen</p>
          </div>
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
            <span className="text-sm text-gray-600">Ich stimme der Verarbeitung meiner Gesundheitsdaten gemaess revDSG und GUMG zu.</span>
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-[#1B3A6B] px-4 py-3 font-semibold text-white transition hover:bg-[#152d54] disabled:opacity-50">
            {loading ? 'Registrierung...' : 'Registrieren'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Bereits ein Konto? <a href="/" className="text-[#1B3A6B] font-medium hover:underline">Anmelden</a>
        </p>
      </div>
    </div>
  );
}
