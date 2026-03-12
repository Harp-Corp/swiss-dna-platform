'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { DOCUMENTS } from '@/lib/mock-data';

export default function DocumentsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const userName = 'Gusti Brosmeli';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="patient" userName={userName} />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B]">Dokumente</h2>
            <p className="text-gray-500 mt-1">Ihre DNA-Reports und Unterlagen</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-[#C9A84C] text-white rounded-lg text-sm font-medium hover:bg-[#b89743] transition-colors flex items-center gap-2"
          >
            <span>📤</span>
            Dokument hochladen
          </button>
        </div>

        {/* Upload modal */}
        {showUploadModal && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1B3A6B]">Dokument hochladen</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                &times;
              </button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <span className="text-4xl block mb-3">📁</span>
              <p className="text-sm text-gray-500 mb-2">
                Datei hierher ziehen oder klicken zum Auswählen
              </p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG (max. 10 MB)</p>
              <button className="mt-4 px-4 py-2 bg-[#1B3A6B] text-white rounded-lg text-sm font-medium hover:bg-[#15305a] transition-colors">
                Datei auswählen
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Demo-Modus: Dateien werden nicht tatsächlich hochgeladen.
            </p>
          </div>
        )}

        {/* Document list */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dokument
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Typ
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grösse
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktion
                </th>
              </tr>
            </thead>
            <tbody>
              {DOCUMENTS.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📄</span>
                      <span className="text-sm font-medium text-[#1B3A6B]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-[#1B3A6B] text-white rounded-lg text-xs font-medium hover:bg-[#15305a] transition-colors">
                      ⬇ Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DisclaimerBanner />

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-8">
          🇨🇭 Daten in der Schweiz verarbeitet (Demo) &bull;{' '}
          <a href="#" className="underline">Impressum</a> – Dr. Farkas EVAZ®, Schweiz
        </p>
      </main>
    </div>
  );
}
