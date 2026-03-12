'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DisclaimerBanner from '@/components/DisclaimerBanner';

interface FormData {
  // Persönliche Daten
  geburtsdatum: string;
  geschlecht: string;
  groesse: string;
  gewicht: string;
  // Gesundheitsgeschichte
  vorerkrankungen: string;
  medikamente: string;
  allergien: string;
  // Lebensstil
  rauchen: string;
  alkohol: string;
  schlaf: string;
  // Ernährung
  ernaehrungsform: string;
  unvertraeglichkeiten: string;
  // Sport
  sportHaeufigkeit: string;
  sportarten: string;
  // Familiengeschichte
  familienerkrankungen: string;
}

const INITIAL_DATA: FormData = {
  geburtsdatum: '',
  geschlecht: '',
  groesse: '',
  gewicht: '',
  vorerkrankungen: '',
  medikamente: '',
  allergien: '',
  rauchen: '',
  alkohol: '',
  schlaf: '',
  ernaehrungsform: '',
  unvertraeglichkeiten: '',
  sportHaeufigkeit: '',
  sportarten: '',
  familienerkrankungen: '',
};

const STEPS = [
  { key: 'personal', label: 'Persönliche Daten', icon: '👤' },
  { key: 'health', label: 'Gesundheitsgeschichte', icon: '🏥' },
  { key: 'lifestyle', label: 'Lebensstil', icon: '🌿' },
  { key: 'nutrition', label: 'Ernährung', icon: '🥗' },
  { key: 'sport', label: 'Sport', icon: '🏃' },
  { key: 'family', label: 'Familiengeschichte', icon: '👨‍👩‍👧‍👦' },
];

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
      >
        <option value="">Bitte auswählen</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);
  const userName = 'Gusti Brosmeli';

  const update = (field: keyof FormData) => (value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => setSubmitted(true);

  const stepContent: Record<string, React.ReactNode> = {
    personal: (
      <div className="space-y-4">
        <InputField label="Geburtsdatum" value={formData.geburtsdatum} onChange={update('geburtsdatum')} type="date" />
        <SelectField
          label="Geschlecht"
          value={formData.geschlecht}
          onChange={update('geschlecht')}
          options={[
            { value: 'maennlich', label: 'Männlich' },
            { value: 'weiblich', label: 'Weiblich' },
            { value: 'divers', label: 'Divers' },
          ]}
        />
        <InputField label="Grösse (cm)" value={formData.groesse} onChange={update('groesse')} placeholder="z.B. 175" />
        <InputField label="Gewicht (kg)" value={formData.gewicht} onChange={update('gewicht')} placeholder="z.B. 72" />
      </div>
    ),
    health: (
      <div className="space-y-4">
        <TextArea label="Vorerkrankungen" value={formData.vorerkrankungen} onChange={update('vorerkrankungen')} placeholder="z.B. Diabetes, Bluthochdruck..." />
        <TextArea label="Aktuelle Medikamente" value={formData.medikamente} onChange={update('medikamente')} placeholder="z.B. Metformin 500mg..." />
        <TextArea label="Allergien / Unverträglichkeiten" value={formData.allergien} onChange={update('allergien')} placeholder="z.B. Penicillin, Nüsse..." />
      </div>
    ),
    lifestyle: (
      <div className="space-y-4">
        <SelectField
          label="Rauchen"
          value={formData.rauchen}
          onChange={update('rauchen')}
          options={[
            { value: 'nie', label: 'Nie' },
            { value: 'frueher', label: 'Früher' },
            { value: 'gelegentlich', label: 'Gelegentlich' },
            { value: 'taeglich', label: 'Täglich' },
          ]}
        />
        <SelectField
          label="Alkoholkonsum"
          value={formData.alkohol}
          onChange={update('alkohol')}
          options={[
            { value: 'nie', label: 'Nie' },
            { value: 'selten', label: 'Selten (1-2x/Monat)' },
            { value: 'maessig', label: 'Mässig (1-2x/Woche)' },
            { value: 'regelmaessig', label: 'Regelmässig (täglich)' },
          ]}
        />
        <SelectField
          label="Durchschnittliche Schlafdauer"
          value={formData.schlaf}
          onChange={update('schlaf')}
          options={[
            { value: 'unter6', label: 'Unter 6 Stunden' },
            { value: '6-7', label: '6-7 Stunden' },
            { value: '7-8', label: '7-8 Stunden' },
            { value: 'ueber8', label: 'Über 8 Stunden' },
          ]}
        />
      </div>
    ),
    nutrition: (
      <div className="space-y-4">
        <SelectField
          label="Ernährungsform"
          value={formData.ernaehrungsform}
          onChange={update('ernaehrungsform')}
          options={[
            { value: 'omnivore', label: 'Omnivore (Mischkost)' },
            { value: 'vegetarisch', label: 'Vegetarisch' },
            { value: 'vegan', label: 'Vegan' },
            { value: 'pescetarisch', label: 'Pescetarisch' },
            { value: 'andere', label: 'Andere' },
          ]}
        />
        <TextArea label="Nahrungsmittelunverträglichkeiten" value={formData.unvertraeglichkeiten} onChange={update('unvertraeglichkeiten')} placeholder="z.B. Laktose, Gluten, Fruktose..." />
      </div>
    ),
    sport: (
      <div className="space-y-4">
        <SelectField
          label="Sportliche Aktivität"
          value={formData.sportHaeufigkeit}
          onChange={update('sportHaeufigkeit')}
          options={[
            { value: 'keine', label: 'Keine' },
            { value: '1-2', label: '1-2x pro Woche' },
            { value: '3-4', label: '3-4x pro Woche' },
            { value: '5+', label: '5+ pro Woche' },
          ]}
        />
        <TextArea label="Sportarten" value={formData.sportarten} onChange={update('sportarten')} placeholder="z.B. Laufen, Schwimmen, Yoga..." />
      </div>
    ),
    family: (
      <div className="space-y-4">
        <TextArea
          label="Familiäre Erkrankungen"
          value={formData.familienerkrankungen}
          onChange={update('familienerkrankungen')}
          placeholder="z.B. Diabetes (Mutter), Herzinfarkt (Vater)..."
        />
      </div>
    ),
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="patient" userName={userName} />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1B3A6B]">Anamnese-Fragebogen</h2>
          <p className="text-gray-500 mt-1">
            Bitte füllen Sie alle Abschnitte sorgfältig aus
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
            <span className="text-5xl block mb-4">✅</span>
            <h3 className="text-xl font-semibold text-[#1B3A6B] mb-2">Fragebogen eingereicht</h3>
            <p className="text-gray-500 mb-6">
              Vielen Dank! Ihre Antworten wurden gespeichert und werden von Dr. Farkas geprüft.
            </p>
            <button
              onClick={() => { setSubmitted(false); setCurrentStep(0); setFormData(INITIAL_DATA); }}
              className="px-6 py-2 bg-[#1B3A6B] text-white rounded-lg text-sm font-medium hover:bg-[#15305a] transition-colors"
            >
              Erneut ausfüllen
            </button>
          </div>
        ) : (
          <>
            {/* Progress indicator */}
            <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
              {STEPS.map((step, i) => (
                <div key={step.key} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(i)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                      i === currentStep
                        ? 'bg-[#1B3A6B] text-white font-medium'
                        : i < currentStep
                          ? 'bg-green-100 text-green-700'
                          : 'bg-white text-gray-500 border border-gray-200'
                    }`}
                  >
                    <span>{step.icon}</span>
                    <span className="hidden md:inline">{step.label}</span>
                    <span className="md:hidden">{i + 1}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`w-6 h-0.5 mx-1 ${i < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <h3 className="text-lg font-semibold text-[#1B3A6B] mb-1 flex items-center gap-2">
                <span>{STEPS[currentStep].icon}</span>
                {STEPS[currentStep].label}
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Schritt {currentStep + 1} von {STEPS.length}
              </p>
              {stepContent[STEPS[currentStep].key]}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={currentStep === 0}
                className="px-6 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Zurück
              </button>
              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="px-6 py-2 bg-[#1B3A6B] text-white rounded-lg text-sm font-medium hover:bg-[#15305a] transition-colors"
                >
                  Weiter
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#C9A84C] text-white rounded-lg text-sm font-medium hover:bg-[#b89743] transition-colors"
                >
                  Absenden
                </button>
              )}
            </div>
          </>
        )}

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
