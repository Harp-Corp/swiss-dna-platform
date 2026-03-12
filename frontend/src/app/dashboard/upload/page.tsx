'use client';
import { useState, useRef } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      // Demo: simulate upload
      await new Promise(r => setTimeout(r, 2000));
      setResult('success');
    } catch {
      setResult('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-emerald-700">Swiss DNA Code</h1>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-sm text-emerald-600 hover:underline">Dashboard</a>
            <a href="/dashboard/recommendations" className="text-sm text-gray-500 hover:underline">Empfehlungen</a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">DNA-Daten hochladen</h2>
        <p className="mb-8 text-gray-500">Laden Sie Ihre DNA-Rohdaten hoch (23andMe, AncestryDNA, MyHeritage etc.)</p>

        {result === 'success' ? (
          <div className="rounded-xl bg-white p-8 shadow-md text-center">
            <div className="text-5xl mb-4">&#10003;</div>
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">Upload erfolgreich!</h3>
            <p className="text-gray-500 mb-6">Ihre DNA-Daten werden jetzt analysiert. Sie erhalten eine Benachrichtigung sobald die Ergebnisse bereit sind.</p>
            <div className="flex justify-center gap-4">
              <a href="/dashboard" className="rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700">Zum Dashboard</a>
              <button onClick={() => { setFile(null); setResult(null); }} className="rounded-lg border border-gray-300 px-6 py-2 text-gray-600 hover:bg-gray-50">Weitere Datei</button>
            </div>
          </div>
        ) : (
          <div
            className={`rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
              dragOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-white'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
          >
            {file ? (
              <div>
                <div className="text-4xl mb-3">&#128196;</div>
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="rounded-lg bg-emerald-600 px-8 py-3 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {uploading ? 'Wird hochgeladen...' : 'Analyse starten'}
                  </button>
                  <button onClick={() => setFile(null)} className="rounded-lg border border-gray-300 px-6 py-3 text-gray-600">Entfernen</button>
                </div>
                {uploading && (
                  <div className="mt-4">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-emerald-500 animate-pulse" style={{ width: '60%' }} />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Verschluesselte Uebertragung...</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="text-5xl mb-4">&#9729;&#65039;</div>
                <p className="text-lg font-medium text-gray-700 mb-2">DNA-Datei hierher ziehen</p>
                <p className="text-sm text-gray-500 mb-4">oder klicken zum Auswaehlen</p>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700"
                >
                  Datei auswaehlen
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".txt,.csv,.zip,.gz"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }}
                />
                <p className="mt-4 text-xs text-gray-400">Unterstuetzte Formate: .txt, .csv, .zip, .gz (max. 50 MB)</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-3">Datenschutz & Sicherheit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-emerald-500">&#128274;</span>
              <div><strong>End-to-End verschluesselt</strong><br/>Ihre Daten werden vor dem Upload verschluesselt</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500">&#127464;&#127469;</span>
              <div><strong>Schweizer Hosting</strong><br/>Daten werden ausschliesslich in der Schweiz gespeichert</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500">&#128202;</span>
              <div><strong>revDSG konform</strong><br/>Vollstaendig konform mit Schweizer Datenschutzrecht</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
