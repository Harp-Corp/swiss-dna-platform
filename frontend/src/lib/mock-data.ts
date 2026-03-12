// Mock Data for Swiss DNA Code Platform - Demo
// All data based on Gusti Brosmeli sample patient

export const DEMO_USERS = [
  { id: '1', email: 'gusti@demo.ch', password: 'demo123', name: 'Gusti Brosmeli', role: 'patient' as const },
  { id: '2', email: 'max@demo.ch', password: 'demo123', name: 'Max Müller', role: 'patient' as const },
  { id: '3', email: 'dr.farkas@evaz.ch', password: 'arzt123', name: 'Dr. Farkas', role: 'arzt' as const },
];

export type MarkerRating = 'optimal' | 'moderat' | 'risiko';

export interface GeneticMarker {
  name: string;
  genotype: string;
  rating: MarkerRating;
  explanation: string;
}

export interface DnaCategory {
  key: string;
  label: string;
  markers: GeneticMarker[];
}

export const DNA_CATEGORIES: DnaCategory[] = [
  {
    key: 'diet',
    label: 'Diet',
    markers: [
      { name: 'Laktoseintoleranz (LCT)', genotype: 'CT', rating: 'moderat', explanation: 'Eingeschränkte Laktaseproduktion. Moderate Laktosezufuhr empfohlen.' },
      { name: 'Glutenunverträglichkeit (HLA-DQ)', genotype: 'GG', rating: 'optimal', explanation: 'Kein erhöhtes Risiko für Zöliakie.' },
      { name: 'Vitamin D Metabolismus (VDR)', genotype: 'TT', rating: 'risiko', explanation: 'Reduzierte Vitamin-D-Rezeptoraktivität. Supplementierung empfohlen.' },
      { name: 'Omega-3 Bedarf (FADS1)', genotype: 'CT', rating: 'moderat', explanation: 'Eingeschränkte Konversion von ALA zu EPA/DHA. Direktzufuhr sinnvoll.' },
    ],
  },
  {
    key: 'sport',
    label: 'Sport',
    markers: [
      { name: 'Power vs. Ausdauer (ACTN3)', genotype: 'RX', rating: 'moderat', explanation: 'Gemischter Muskeltyp. Kraft und Ausdauertraining gleich effektiv.' },
      { name: 'VO2max-Potenzial (ACE)', genotype: 'ID', rating: 'moderat', explanation: 'Moderates Ausdauerpotenzial. Regelmässiges Cardiotraining empfohlen.' },
      { name: 'Verletzungsrisiko Sehnen (COL5A1)', genotype: 'CT', rating: 'moderat', explanation: 'Leicht erhöhtes Sehnenrisiko. Aufwärmung und Stretching wichtig.' },
      { name: 'Regenerationsbedarf (IL6)', genotype: 'GG', rating: 'risiko', explanation: 'Erhöhte Entzündungsneigung nach Training. Längere Erholung notwendig.' },
    ],
  },
  {
    key: 'health',
    label: 'Health',
    markers: [
      { name: 'MTHFR C677T', genotype: 'CT', rating: 'moderat', explanation: 'Heterozygote Mutation. Methylfolat statt synthetische Folsäure empfohlen.' },
      { name: 'Detox Phase I (CYP1A2)', genotype: 'CA', rating: 'moderat', explanation: 'Moderater Koffeinmetabolismus. Nicht mehr als 2 Tassen Kaffee täglich.' },
      { name: 'Herzkreislauf-Marker (APOE)', genotype: 'E3/E3', rating: 'optimal', explanation: 'Normales kardiovaskuläres Risikoprofil.' },
      { name: 'Entzündungsneigung (TNF-α)', genotype: 'AG', rating: 'risiko', explanation: 'Erhöhte Entzündungsbereitschaft. Anti-inflammatorische Ernährung empfohlen.' },
    ],
  },
  {
    key: 'mind',
    label: 'Mind',
    markers: [
      { name: 'Serotonin-Transporter (5-HTTLPR)', genotype: 'LS', rating: 'moderat', explanation: 'Moderatere Stressverarbeitung. Achtsamkeitspraktiken hilfreich.' },
      { name: 'BDNF Val66Met', genotype: 'Val/Met', rating: 'moderat', explanation: 'Leicht reduzierte BDNF-Ausschüttung. Körperliche Aktivität fördert Neuroplastizität.' },
      { name: 'Stressantwort (COMT)', genotype: 'Val/Val', rating: 'risiko', explanation: 'Schneller Dopaminabbau unter Stress. Stressmanagement besonders wichtig.' },
      { name: 'Dopamin-System (DRD4)', genotype: '4R/4R', rating: 'optimal', explanation: 'Stabiles Dopaminsystem. Gute Motivation und Fokus.' },
    ],
  },
  {
    key: 'resilience',
    label: 'Resilience',
    markers: [
      { name: 'HPA-Achse Regulation (NR3C1)', genotype: 'AG', rating: 'moderat', explanation: 'Moderate Kortisolregulation. Adaptogene können unterstützen.' },
      { name: 'Cortisol-Metabolismus (CYP11B1)', genotype: 'CT', rating: 'moderat', explanation: 'Mittlere Kortisolabbaurate. Ausreichend Schlaf essenziell.' },
      { name: 'Schlafgenetik / Chronotyp (CLOCK)', genotype: 'CT', rating: 'moderat', explanation: 'Tendenz zum späten Chronotyp. Konsistente Schlafzeiten empfohlen.' },
      { name: 'Oxidativer Stress (SOD2)', genotype: 'TT', rating: 'risiko', explanation: 'Reduzierte antioxidative Kapazität. Antioxidantienreiche Ernährung wichtig.' },
    ],
  },
];

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'hoch' | 'mittel' | 'niedrig';
  geneticBasis: string;
  status: 'aktiv' | 'erledigt';
}

export const RECOMMENDATIONS: Recommendation[] = [
  { id: '1', category: 'Supplements', title: 'Methylfolat 400–800 μg täglich', description: 'Nehmen Sie Methylfolat statt synthetischer Folsäure. Besser bioverfügbar bei MTHFR-Variante.', priority: 'hoch', geneticBasis: 'MTHFR C677T (CT)', status: 'aktiv' },
  { id: '2', category: 'Supplements', title: 'Vitamin D3 2000–4000 IE täglich', description: 'Vitamin D3 Supplementierung aufgrund reduzierter VDR-Aktivität. Spiegel alle 6 Monate kontrollieren.', priority: 'hoch', geneticBasis: 'VDR (TT)', status: 'aktiv' },
  { id: '3', category: 'Supplements', title: 'Magnesium Glycinat 300 mg abends', description: 'Fördert Schlafqualität und reduziert Stressreaktion. Besonders bei erhöhter HPA-Achsen-Aktivität sinnvoll.', priority: 'hoch', geneticBasis: 'NR3C1 (AG) + CLOCK (CT)', status: 'aktiv' },
  { id: '4', category: 'Supplements', title: 'Omega-3 (EPA/DHA) 2g täglich', description: 'Direkte EPA/DHA-Zufuhr statt ALA-Quellen, da Konversion genetisch eingeschränkt.', priority: 'hoch', geneticBasis: 'FADS1 (CT) + TNF-α (AG)', status: 'aktiv' },
  { id: '5', category: 'Training', title: '3–4x/Woche: Kraft + Zone-2 Cardio', description: 'Gemischtes Training optimal. Nicht bis Muskelversagen – erhöhter Regenerationsbedarf beachten.', priority: 'mittel', geneticBasis: 'ACTN3 (RX) + IL6 (GG)', status: 'aktiv' },
  { id: '6', category: 'Lifestyle', title: 'Adaptogene: Ashwagandha KSM-66', description: 'Ashwagandha reguliert HPA-Achse und senkt Kortisolspiegel bei chronischem Stress.', priority: 'mittel', geneticBasis: 'NR3C1 (AG) + COMT (Val/Val)', status: 'aktiv' },
  { id: '7', category: 'Ernährung', title: 'Intervallfasten 16:8 (optional)', description: 'Kann Stoffwechsel und Entzündungsmarker verbessern. Bei guter Verträglichkeit empfohlen.', priority: 'niedrig', geneticBasis: 'TNF-α (AG) + MTHFR (CT)', status: 'aktiv' },
  { id: '8', category: 'Prävention', title: 'Antioxidantienreiche Kost', description: 'Beeren, grünes Blattgemüse, Kurkuma täglich. Kompensiert reduzierte SOD2-Aktivität.', priority: 'mittel', geneticBasis: 'SOD2 (TT)', status: 'aktiv' },
];

export interface Patient {
  id: string;
  name: string;
  email: string;
  paket: string;
  status: string;
  letzteAktivitaet: string;
  ausstehend: number;
}

export const PATIENTS: Patient[] = [
  { id: '1', name: 'Gusti Brosmeli', email: 'gusti@demo.ch', paket: 'Complete Health', status: 'Aktiv', letzteAktivitaet: '10.03.2026', ausstehend: 2 },
  { id: '2', name: 'Max Müller', email: 'max@demo.ch', paket: 'Basic DNA', status: 'Ausstehend', letzteAktivitaet: '05.03.2026', ausstehend: 5 },
];

export const DOCUMENTS = [
  { id: '1', name: 'DNA Report – Diet', type: 'PDF', date: '01.03.2026', size: '1.2 MB' },
  { id: '2', name: 'DNA Report – Sport', type: 'PDF', date: '01.03.2026', size: '1.1 MB' },
  { id: '3', name: 'DNA Report – Health', type: 'PDF', date: '01.03.2026', size: '1.4 MB' },
  { id: '4', name: 'DNA Report – Mind', type: 'PDF', date: '01.03.2026', size: '0.9 MB' },
  { id: '5', name: 'DNA Report – Resilience', type: 'PDF', date: '01.03.2026', size: '1.0 MB' },
];
