'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

function ConsentContent() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConsent = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/consents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ consentType: 'DNA_ANALYSIS', given: true }),
      });
      await refreshUser();
      router.push('/dashboard');
    } catch (err) {
      console.error('Consent error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Einwilligung zur DNA-Analyse</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">Datenschutz gemaess revDSG / GUMG</h2>
          <div className="text-sm text-gray-600 space-y-3">
            <p>Gemaess dem revidierten Datenschutzgesetz (revDSG) und dem Bundesgesetz ueber genetische Untersuchungen beim Menschen (GUMG) informieren wir Sie:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ihre DNA-Daten werden pseudonymisiert gespeichert und getrennt von Ihren Personendaten verarbeitet.</li>
              <li>Die Analyse erfolgt ausschliesslich zum vereinbarten Zweck der personalisierten Gesundheitsempfehlungen.</li>
              <li>Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Loeschung Ihrer Daten.</li>
              <li>Die Daten werden in der Schweiz gespeichert und nicht ins Ausland uebermittelt.</li>
              <li>Sie koennen Ihre Einwilligung jederzeit widerrufen.</li>
            </ul>
          </div>
          <label className="flex items-start gap-3 pt-4">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600"
            />
            <span className="text-sm text-gray-700">
              Ich habe die Datenschutzerklaerung gelesen und stimme der Verarbeitung meiner genetischen Daten zu.
            </span>
          </label>
          <button
            onClick={handleConsent}
            disabled={!agreed || loading}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Wird gespeichert...' : 'Einwilligung erteilen'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConsentPage() {
  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <ConsentContent />
    </ProtectedRoute>
  );
}
