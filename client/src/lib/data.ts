export interface DnaScore {
  label: string;
  value: number;
  max: number;
  color: string;
}

export const dnaScores: DnaScore[] = [
  { label: "Diet", value: 62, max: 100, color: "#4CAF50" },
  { label: "Mind", value: 55, max: 100, color: "#9C27B0" },
  { label: "Resilience", value: 48, max: 100, color: "#FF9800" },
  { label: "Health", value: 58, max: 100, color: "#2196F3" },
  { label: "Sport", value: 82, max: 100, color: "#E91E63" },
];

export interface GeneticMarker {
  gene: string;
  function: string;
  genotype: string;
  interpretation: string;
  risk: "high" | "moderate" | "normal" | "low";
}

export const geneticMarkers: GeneticMarker[] = [
  { gene: "FTO", function: "Adipositas", genotype: "AA", interpretation: "Erhöhtes Risiko", risk: "high" },
  { gene: "MTHFR", function: "Methylierung", genotype: "CT", interpretation: "Heterozygot", risk: "moderate" },
  { gene: "ACTN3", function: "Muskeltyp", genotype: "XX", interpretation: "Ausdauertyp", risk: "normal" },
  { gene: "APOE", function: "Lipid-Stoffwechsel", genotype: "E3/E3", interpretation: "Normal", risk: "normal" },
  { gene: "VDR", function: "Vitamin D", genotype: "TT", interpretation: "Reduzierte Aktivität", risk: "moderate" },
  { gene: "COMT", function: "Dopamin", genotype: "AG", interpretation: "Intermediate", risk: "low" },
];

export type RecommendationCategory = "SUPPLEMENTS" | "NUTRITION" | "SPORT" | "STRESS_MANAGEMENT" | "MENTAL_HEALTH" | "SLEEP";

export interface Recommendation {
  id: number;
  category: RecommendationCategory;
  priority: number;
  title: string;
  content: string;
}

export const recommendations: Recommendation[] = [
  {
    id: 1,
    category: "SUPPLEMENTS",
    priority: 5,
    title: "Methylfolat 400–800 μg täglich",
    content: "MTHFR C677T (CT): Heterozygote Variante erfordert aktive Folatform. Methylfolat statt synthetischer Folsäure für optimale Bioverfügbarkeit.",
  },
  {
    id: 2,
    category: "SUPPLEMENTS",
    priority: 5,
    title: "Vitamin D3 4000 IE täglich",
    content: "VDR Fok1 (TT): Stark reduzierte Rezeptoraktivität. Spiegel alle 3 Monate kontrollieren. Kombiniert mit Vitamin K2 einnehmen.",
  },
  {
    id: 3,
    category: "SUPPLEMENTS",
    priority: 5,
    title: "Omega-3 (EPA/DHA) 2g täglich",
    content: "Entzündungsprofil HOCH + CRP (GG): Anti-inflammatorische Wirkung essenziell. Hochwertiges Fischöl oder Algenöl bevorzugen.",
  },
  {
    id: 4,
    category: "NUTRITION",
    priority: 5,
    title: "Kreuzblütler-Gemüse täglich",
    content: "GSTM1 (Deletion): Fehlende Phase-II-Entgiftung kompensieren mit Sulforaphan aus Brokkoli, Blumenkohl, Rosenkohl, Grünkohl.",
  },
  {
    id: 5,
    category: "SPORT",
    priority: 5,
    title: "Krafttraining 3–4x/Woche mit Ausdaueranteil",
    content: "ACE (DD) + ACTN3 (XX) + PPARGC1A (GG): Kombination aus Kraft und Ausdauer optimal. Mindestens 20 MET-Stunden/Woche wegen FTO (AA).",
  },
  {
    id: 6,
    category: "NUTRITION",
    priority: 5,
    title: "Gewichtskontrolle und Zuckerreduktion",
    content: "FTO (AA) + TAS1R2 (AA): Hohes Adipositas-Risiko bei starker Süsspräferenz. Mediterrane Ernährung, Zuckerkonsum strikt reduzieren.",
  },
  {
    id: 7,
    category: "SUPPLEMENTS",
    priority: 3,
    title: "CoQ10 100mg + Selen 200μg täglich",
    content: "SOD2 (TC) + CAT (CT) + GPX1 (CT): Moderate oxidative Stresskapazität. Antioxidative Unterstützung für Zellschutz.",
  },
  {
    id: 8,
    category: "STRESS_MANAGEMENT",
    priority: 3,
    title: "Ashwagandha KSM-66",
    content: "COMT (AG) + FKBP5 (CT) + BDNF (CT): Stressachse regulieren und BDNF fördern. 600mg/Tag standardisiert.",
  },
  {
    id: 9,
    category: "MENTAL_HEALTH",
    priority: 3,
    title: "Sport mind. 5x/Woche für BDNF",
    content: "BDNF Val66Met (CT): Niedrige Resilienz. Sport ist wichtigster BDNF-Aktivator. Kombination aus Ausdauer und Krafttraining.",
  },
  {
    id: 10,
    category: "NUTRITION",
    priority: 3,
    title: "Anti-inflammatorische Ernährung",
    content: "Entzündungsprofil HOCH (IL1A, IL1B multiple Varianten): Kurkuma, Ingwer, Beeren, fetter Fisch täglich integrieren.",
  },
  {
    id: 11,
    category: "SPORT",
    priority: 3,
    title: "Gründliches Aufwärmen vor Sport",
    content: "COL1A1 (GG): Erhöhtes Sehnenrisiko. Dynamisches Dehnen und progressiver Belastungsaufbau vor jeder Einheit.",
  },
  {
    id: 12,
    category: "SLEEP",
    priority: 2,
    title: "Schlafhygiene und feste Schlafenszeit",
    content: "CLOCK (TC): Späterer Chronotyp. Blaulichtfilter ab 20 Uhr, feste Schlafenszeit, Schlafzimmer kühl und dunkel.",
  },
];

export const categoryLabels: Record<RecommendationCategory, string> = {
  SUPPLEMENTS: "Supplemente",
  NUTRITION: "Ernährung",
  SPORT: "Sport",
  STRESS_MANAGEMENT: "Stressmanagement",
  MENTAL_HEALTH: "Mental Health",
  SLEEP: "Schlaf",
};

export const categoryColors: Record<RecommendationCategory, string> = {
  SUPPLEMENTS: "bg-blue-100 text-blue-800",
  NUTRITION: "bg-green-100 text-green-800",
  SPORT: "bg-pink-100 text-pink-800",
  STRESS_MANAGEMENT: "bg-purple-100 text-purple-800",
  MENTAL_HEALTH: "bg-indigo-100 text-indigo-800",
  SLEEP: "bg-amber-100 text-amber-800",
};

export const filterTabs = [
  { key: "all", label: "Alle" },
  { key: "SUPPLEMENTS", label: "Supplemente" },
  { key: "NUTRITION", label: "Ernährung" },
  { key: "SPORT", label: "Sport" },
  { key: "STRESS_MANAGEMENT", label: "Stressmanagement" },
  { key: "SLEEP", label: "Schlaf" },
  { key: "MENTAL_HEALTH", label: "Mental Health" },
];
