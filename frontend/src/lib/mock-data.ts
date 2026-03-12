// Mock Data for Swiss DNA Code Platform - Demo
// All data based on Gusti Brösmeli – real genotypes from DNAlife PDF reports (30.12.2025)

export const DEMO_USERS = [
  { id: '1', email: 'gusti@demo.ch', password: 'demo123', name: 'Gusti Brösmeli', role: 'patient' as const },
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
      { name: 'ADIPOQ', genotype: 'GG', rating: 'optimal', explanation: 'Normale Adiponektin-Produktion. Guter Fettstoffwechsel.' },
      { name: 'FTO', genotype: 'AA', rating: 'risiko', explanation: 'Erhöhtes Adipositas-Risiko. Strikte Kalorienüberwachung und min. 20 MET-Stunden/Woche empfohlen.' },
      { name: 'TAS1R2', genotype: 'AA', rating: 'risiko', explanation: 'Starke Süssgeschmack-Präferenz. Bewusste Zuckerreduktion notwendig.' },
      { name: 'MC4R', genotype: 'CT', rating: 'moderat', explanation: 'Moderater Einfluss auf Sättigungsgefühl. Portionskontrolle empfohlen.' },
      { name: 'APOA2', genotype: 'CT', rating: 'moderat', explanation: 'Moderate Empfindlichkeit gegenüber gesättigten Fetten. Fettaufnahme <22g/Tag.' },
      { name: 'APOA5', genotype: 'TC', rating: 'moderat', explanation: 'Leicht erhöhte Triglyceridwerte möglich. Omega-3-reiche Ernährung empfohlen.' },
      { name: 'PPARG', genotype: 'CC', rating: 'optimal', explanation: 'Normale Insulinsensitivität und Fettverteilung.' },
      { name: 'UCP1', genotype: 'AA', rating: 'moderat', explanation: 'Reduzierte Thermogenese. Regelmässige Bewegung wichtig für Kalorienverbrennung.' },
      { name: 'UCP2', genotype: 'GA', rating: 'moderat', explanation: 'Moderate mitochondriale Effizienz. Ausgewogene Makronährstoffverteilung empfohlen.' },
      { name: 'CLOCK', genotype: 'TC', rating: 'moderat', explanation: 'Tendenz zu spätem Chronotyp. Regelmässige Essenszeiten wichtig.' },
      { name: 'TCF7L2', genotype: 'CC', rating: 'optimal', explanation: 'Normales Typ-2-Diabetes-Risiko.' },
      { name: 'ADRB3', genotype: 'TT', rating: 'optimal', explanation: 'Normale Beta-3-Rezeptor-Funktion. Guter Fettstoffwechsel bei Sport.' },
      { name: 'DRD2', genotype: 'CC', rating: 'optimal', explanation: 'Normales Belohnungssystem. Keine genetische Neigung zu Esssucht.' },
    ],
  },
  {
    key: 'sport',
    label: 'Sport',
    markers: [
      { name: 'ACE', genotype: 'DD', rating: 'risiko', explanation: 'Stark erhöhtes Kraftpotential. Prädisposition für explosive Kraft. HIIT und Krafttraining optimal.' },
      { name: 'ACTN3', genotype: 'XX', rating: 'moderat', explanation: 'Ausdauer-Typ (keine Alpha-Actinin-3 Produktion). Überdurchschnittliches Ausdauerpotential.' },
      { name: 'PPARGC1A', genotype: 'GG', rating: 'optimal', explanation: 'Überdurchschnittliche mitochondriale Biogenese. Exzellentes Ausdauerpotential.' },
      { name: 'PPARA', genotype: 'GG', rating: 'optimal', explanation: 'Optimale Fettsäureoxidation. Sehr gute Ausdauerleistung bei langen Belastungen.' },
      { name: 'COL1A1', genotype: 'GG', rating: 'risiko', explanation: 'Erhöhtes Verletzungsrisiko für Sehnen und Bänder. Gründliches Aufwärmen essenziell.' },
      { name: 'COL5A1', genotype: 'CC', rating: 'optimal', explanation: 'Normale Kollagenstruktur. Gute Sehnenelastizität.' },
      { name: 'GDF5', genotype: 'TC', rating: 'moderat', explanation: 'Leicht erhöhtes Risiko für Gelenkverschleiss. Gelenkschonende Übungen empfohlen.' },
      { name: 'CRP', genotype: 'GG', rating: 'risiko', explanation: 'Erhöhte Entzündungsneigung. Anti-inflammatorische Ernährung und längere Regeneration.' },
      { name: 'IL6', genotype: 'GG', rating: 'optimal', explanation: 'Normale Entzündungsreaktion nach Training. Standard-Regenerationszeit ausreichend.' },
      { name: 'SOD2', genotype: 'TC', rating: 'moderat', explanation: 'Moderate antioxidative Kapazität. Antioxidantienreiche Ernährung unterstützt Regeneration.' },
      { name: 'VEGF', genotype: 'CG', rating: 'moderat', explanation: 'Moderate Kapillarbildung. Ausdauertraining fördert Durchblutung.' },
      { name: 'AGT', genotype: 'TC', rating: 'moderat', explanation: 'Moderate Blutdruckregulation. Regelmässiges Cardiotraining empfohlen.' },
    ],
  },
  {
    key: 'health',
    label: 'Health',
    markers: [
      { name: 'MTHFR C677T', genotype: 'CT', rating: 'moderat', explanation: 'Heterozygote Variante. Reduzierte Enzymaktivität (~65%). Methylfolat statt Folsäure empfohlen.' },
      { name: 'MTHFR A1298C', genotype: 'AA', rating: 'optimal', explanation: 'Keine Variante. Normale MTHFR-Aktivität an Position 1298.' },
      { name: 'APOE', genotype: 'E3/E3', rating: 'optimal', explanation: 'Normales kardiovaskuläres und Alzheimer-Risikoprofil.' },
      { name: 'VDR Fok1', genotype: 'TT', rating: 'risiko', explanation: 'Stark reduzierte Vitamin-D-Rezeptor-Aktivität. Supplementierung 4000 IE/Tag und Knochendichte-Monitoring.' },
      { name: 'GSTM1', genotype: 'Deletion', rating: 'risiko', explanation: 'Fehlende Glutathion-S-Transferase M1. Eingeschränkte Phase-II-Entgiftung. Kreuzblütler-Gemüse empfohlen.' },
      { name: 'CYP1A1', genotype: 'CT', rating: 'moderat', explanation: 'Erhöhte Phase-I-Entgiftungsaktivität. Balancierung mit Phase-II wichtig.' },
      { name: 'IL1B 3954', genotype: 'CT', rating: 'moderat', explanation: 'Moderat erhöhte IL-1β-Produktion. Chronische Entzündungsneigung beachten.' },
      { name: 'IL1A 889', genotype: 'TC', rating: 'moderat', explanation: 'Moderate Entzündungsbereitschaft. Anti-inflammatorische Ernährung empfohlen.' },
      { name: 'SOD2', genotype: 'TC', rating: 'moderat', explanation: 'Moderate Superoxiddismutase-Aktivität. CoQ10 und Antioxidantien supplementieren.' },
      { name: 'CAT', genotype: 'CT', rating: 'moderat', explanation: 'Moderate Katalase-Aktivität. Ergänzung mit Selen und Vitamin E sinnvoll.' },
      { name: 'GPX1', genotype: 'CT', rating: 'moderat', explanation: 'Moderate Glutathionperoxidase-Aktivität. Selenreiche Ernährung empfohlen.' },
      { name: 'COMT', genotype: 'AG', rating: 'moderat', explanation: 'Mittlere Dopamin/Östrogen-Abbaurate. Ausgewogenes Stressmanagement wichtig.' },
      { name: 'COL1A1', genotype: 'GG', rating: 'optimal', explanation: 'Normale Kollagen-Typ-I-Produktion. Standard-Knochengesundheit.' },
    ],
  },
  {
    key: 'mind',
    label: 'Mind',
    markers: [
      { name: 'BDNF Val66Met', genotype: 'CT', rating: 'risiko', explanation: 'Reduzierte BDNF-Ausschüttung. Erhöhtes Risiko für Stimmungsschwankungen. Regelmässiger Sport fördert Neuroplastizität.' },
      { name: 'COMT Val158Met', genotype: 'AG', rating: 'moderat', explanation: 'Mittlere Dopamin-Abbaurate. Balance zwischen Stresstoleranz und kognitiver Leistung.' },
      { name: 'GABRA2', genotype: 'CC', rating: 'risiko', explanation: 'Erhöhte GABAerge Sensitivität. Vorsicht bei sedierenden Substanzen. Achtsamkeit und Meditation empfohlen.' },
      { name: 'FKBP5', genotype: 'CT', rating: 'moderat', explanation: 'Moderate Stressachsen-Regulation. Stressmanagement-Techniken hilfreich.' },
      { name: 'OXTR', genotype: 'AG', rating: 'moderat', explanation: 'Moderate Oxytocinrezeptor-Expression. Soziale Bindungen aktiv pflegen.' },
      { name: 'DRD2', genotype: 'CC', rating: 'optimal', explanation: 'Normale Dopamin-D2-Rezeptordichte. Stabiles Belohnungssystem.' },
      { name: 'FAAH', genotype: 'AC', rating: 'moderat', explanation: 'Moderat erhöhter Endocannabinoid-Abbau. Entspannungstechniken fördern Wohlbefinden.' },
      { name: 'SLC6A4', genotype: 'CC', rating: 'optimal', explanation: 'Normale Serotonin-Transporter-Aktivität. Stabile Stimmungsregulation.' },
      { name: 'HTR1A', genotype: 'CG', rating: 'moderat', explanation: 'Moderate Serotonin-1A-Rezeptor-Expression. Regelmässige Bewegung unterstützt Serotoninproduktion.' },
      { name: 'CHRNA5', genotype: 'AG', rating: 'moderat', explanation: 'Moderate nikotinerge Rezeptorempfindlichkeit. Suchtpotential bei Nikotinexposition beachten.' },
    ],
  },
  {
    key: 'resilience',
    label: 'Resilience',
    markers: [
      { name: 'NPY -399', genotype: 'CT', rating: 'moderat', explanation: 'Moderate Neuropeptid-Y-Produktion. Gute Basis-Stressresistenz.' },
      { name: 'BDNF Val66Met', genotype: 'CT', rating: 'risiko', explanation: 'Reduzierte BDNF-Sekretion. Niedrige Resilienz. Sport und Omega-3 fördern BDNF.' },
      { name: 'FKBP5', genotype: 'CT', rating: 'moderat', explanation: 'Moderate HPA-Achsen-Regulation. Cortisol-Management durch Schlafhygiene.' },
      { name: 'COMT', genotype: 'AG', rating: 'moderat', explanation: 'Mittlere Katecholamin-Abbaurate. Adaptogene wie Ashwagandha können helfen.' },
      { name: 'OXTR', genotype: 'AG', rating: 'moderat', explanation: 'Moderate Oxytocinrezeptor-Funktion. Soziale Unterstützung als Resilienzfaktor nutzen.' },
      { name: 'SLC6A4', genotype: 'CC', rating: 'optimal', explanation: 'Normaler Serotonintransport. Gute emotionale Grundstabilität.' },
      { name: 'HTR1A', genotype: 'CG', rating: 'moderat', explanation: 'Moderate serotonerge Aktivität. Regelmässiger Ausdauersport empfohlen.' },
      { name: 'DRD2', genotype: 'CC', rating: 'optimal', explanation: 'Normale Dopaminrezeptor-Dichte. Gutes Motivationspotential.' },
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
  { id: '1', category: 'Supplements', title: 'Methylfolat 400–800 μg täglich', description: 'MTHFR C677T (CT): Heterozygote Variante erfordert aktive Folatform. Methylfolat statt synthetischer Folsäure für optimale Bioverfügbarkeit.', priority: 'hoch', geneticBasis: 'MTHFR C677T (CT)', status: 'aktiv' },
  { id: '2', category: 'Supplements', title: 'Vitamin D3 4000 IE täglich', description: 'VDR Fok1 (TT): Stark reduzierte Rezeptoraktivität. Spiegel alle 3 Monate kontrollieren. Kombiniert mit Vitamin K2 einnehmen.', priority: 'hoch', geneticBasis: 'VDR Fok1 (TT)', status: 'aktiv' },
  { id: '3', category: 'Supplements', title: 'Omega-3 (EPA/DHA) 2g täglich', description: 'Entzündungsprofil HOCH + CRP (GG): Anti-inflammatorische Wirkung essenziell. Hochwertiges Fischöl oder Algenöl bevorzugen.', priority: 'hoch', geneticBasis: 'CRP (GG) + IL1B (CT) + IL1A (TC)', status: 'aktiv' },
  { id: '4', category: 'Ernährung', title: 'Kreuzblütler-Gemüse täglich', description: 'GSTM1 (Deletion): Fehlende Phase-II-Entgiftung kompensieren mit Sulforaphan aus Brokkoli, Blumenkohl, Rosenkohl, Grünkohl.', priority: 'hoch', geneticBasis: 'GSTM1 (Deletion)', status: 'aktiv' },
  { id: '5', category: 'Training', title: 'Krafttraining 3–4x/Woche mit Ausdaueranteil', description: 'ACE (DD) + ACTN3 (XX) + PPARGC1A (GG): Kombination aus Kraft und Ausdauer optimal. Mindestens 20 MET-Stunden/Woche wegen FTO (AA).', priority: 'hoch', geneticBasis: 'ACE (DD) + ACTN3 (XX) + FTO (AA)', status: 'aktiv' },
  { id: '6', category: 'Ernährung', title: 'Gewichtskontrolle und Zuckerreduktion', description: 'FTO (AA) + TAS1R2 (AA): Hohes Adipositas-Risiko bei starker Süsspräferenz. Mediterrane Ernährung, Zuckerkonsum strikt reduzieren.', priority: 'hoch', geneticBasis: 'FTO (AA) + TAS1R2 (AA)', status: 'aktiv' },
  { id: '7', category: 'Supplements', title: 'CoQ10 100mg + Selen 200μg täglich', description: 'SOD2 (TC) + CAT (CT) + GPX1 (CT): Moderate oxidative Stresskapazität. Antioxidative Unterstützung für Zellschutz.', priority: 'mittel', geneticBasis: 'SOD2 (TC) + CAT (CT) + GPX1 (CT)', status: 'aktiv' },
  { id: '8', category: 'Lifestyle', title: 'Ashwagandha KSM-66', description: 'COMT (AG) + FKBP5 (CT) + BDNF (CT): Stressachse regulieren und BDNF fördern. 600mg/Tag standardisiert.', priority: 'mittel', geneticBasis: 'COMT (AG) + FKBP5 (CT) + BDNF (CT)', status: 'aktiv' },
  { id: '9', category: 'Training', title: 'Sport mind. 5x/Woche für BDNF', description: 'BDNF Val66Met (CT): Niedrige Resilienz. Sport ist wichtigster BDNF-Aktivator. Kombination aus Ausdauer und Krafttraining.', priority: 'mittel', geneticBasis: 'BDNF Val66Met (CT)', status: 'aktiv' },
  { id: '10', category: 'Ernährung', title: 'Anti-inflammatorische Ernährung', description: 'Entzündungsprofil HOCH (IL1A, IL1B multiple Varianten): Kurkuma, Ingwer, Beeren, fetter Fisch täglich integrieren.', priority: 'mittel', geneticBasis: 'IL1A (TC) + IL1B (CT) + CRP (GG)', status: 'aktiv' },
  { id: '11', category: 'Training', title: 'Gründliches Aufwärmen vor Sport', description: 'COL1A1 (GG): Erhöhtes Sehnenrisiko. Dynamisches Dehnen und progressiver Belastungsaufbau vor jeder Einheit.', priority: 'mittel', geneticBasis: 'COL1A1 (GG) + GDF5 (TC)', status: 'aktiv' },
  { id: '12', category: 'Lifestyle', title: 'Schlafhygiene und feste Schlafenszeit', description: 'CLOCK (TC): Späterer Chronotyp. Blaulichtfilter ab 20 Uhr, feste Schlafenszeit, Schlafzimmer kühl und dunkel.', priority: 'niedrig', geneticBasis: 'CLOCK (TC)', status: 'aktiv' },
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
  { id: '1', name: 'Gusti Brösmeli', email: 'gusti@demo.ch', paket: 'Complete Health', status: 'Aktiv', letzteAktivitaet: '30.12.2025', ausstehend: 2 },
  { id: '2', name: 'Max Müller', email: 'max@demo.ch', paket: 'Basic DNA', status: 'Ausstehend', letzteAktivitaet: '05.03.2026', ausstehend: 5 },
];

export const DOCUMENTS = [
  { id: '1', name: 'DNA Report – Diet', type: 'PDF', date: '30.12.2025', size: '1.2 MB' },
  { id: '2', name: 'DNA Report – Sport', type: 'PDF', date: '30.12.2025', size: '1.1 MB' },
  { id: '3', name: 'DNA Report – Health', type: 'PDF', date: '30.12.2025', size: '1.4 MB' },
  { id: '4', name: 'DNA Report – Mind', type: 'PDF', date: '30.12.2025', size: '0.9 MB' },
  { id: '5', name: 'DNA Report – Resilience', type: 'PDF', date: '30.12.2025', size: '1.0 MB' },
];
