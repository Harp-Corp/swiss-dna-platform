'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

function ProfileContent() {
  const { user, refreshUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [gdprLoading, setGdprLoading] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateProfile({ firstName, lastName, phone });
      await refreshUser();
      setMessage('Profil aktualisiert.');
    } catch {
      setMessage('Fehler beim Speichern.');
    } finally {
      setSaving(false);
    }
  };

  const handleDataExport = async () => {
    setGdprLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/gdpr/export`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'meine-daten.json';
      a.click();
    } catch {
      setMessage('Export fehlgeschlagen.');
    } finally {
      setGdprLoading(false);
    }
  };

  const handleDataDeletion = async () => {
    if (!confirm('Sind Sie sicher? Alle Ihre Daten werden unwiderruflich geloescht.')) return;
    setGdprLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/gdpr/deletion-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setMessage('Loeschantrag wurde eingereicht.');
    } catch {
      setMessage('Fehler beim Loeschantrag.');
    } finally {
      setGdprLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Mein Profil</h1>

        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded">
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">Persoenliche Daten</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
            <input value={user?.email || ''} disabled className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50 text-sm"
          >
            {saving ? 'Speichern...' : 'Profil speichern'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">Datenschutz (DSGVO / revDSG)</h2>
          <p className="text-sm text-gray-600">
            Gemaess dem revidierten Datenschutzgesetz haben Sie folgende Rechte:
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDataExport}
              disabled={gdprLoading}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              Daten exportieren
            </button>
            <button
              onClick={handleDataDeletion}
              disabled={gdprLoading}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm"
            >
              Daten loeschen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
