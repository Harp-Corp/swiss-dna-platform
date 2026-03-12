export default function DisclaimerBanner() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <span className="text-yellow-600 text-xl flex-shrink-0">⚠️</span>
        <p className="text-sm text-yellow-800">
          <strong>KI-generiert</strong> – Diese Informationen wurden auf Basis Ihrer genetischen Daten automatisch erstellt.
          Sie ersetzen keine ärztliche Diagnose oder Beratung.
          Bitte konsultieren Sie Ihren behandelnden Arzt{' '}(
          <span className="font-semibold">Dr. Farkas</span>).
        </p>
      </div>
    </div>
  );
}

export function RecommendationDisclaimer() {
  return (
    <div className="bg-yellow-50 border border-yellow-300 p-4 mt-8 rounded-lg">
      <p className="text-sm text-yellow-800">
        <span className="font-semibold">⚠️ KI-generiert</span> – Alle Empfehlungen wurden durch Dr. Farkas geprüft und freigegeben.
        Dennoch ersetzen diese keine ärztliche Beratung.
      </p>
    </div>
  );
}
