// Swiss DNA Platform – Real DNA data from DNAlife/DNAlysis reports
// Patient: Gusti Brösmeli | Sample: TST-NL-197314 | Date: 30-Dec-2025

export type ImpactLevel = "none" | "low" | "moderate" | "high" | "beneficial";

export interface GeneResult {
  gene: string;
  variation: string;
  genotype: string;
  impact: ImpactLevel;
  description?: string;
}

export interface ReportArea {
  name: string;
  priority?: "NIEDRIG" | "MODERAT" | "HOCH";
  genes: GeneResult[];
  summary?: string;
}

export interface ReportType {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  areas: ReportArea[];
  overallSummary?: string;
}

export interface PersonalizedRecommendation {
  id: number;
  category: "ernährung" | "supplemente" | "sport" | "stressmanagement" | "schlaf" | "lebensstil" | "detox";
  priority: "hoch" | "mittel" | "niedrig";
  title: string;
  content: string;
  genes: string[];
  reportSource: string[];
}

export const patientInfo = {
  name: "Gusti Brösmeli",
  dob: "19. Dezember 1970",
  sampleId: "TST-NL-197314",
  reportDate: "30. Dezember 2025",
  lab: "DNAlysis / DNAlife",
  contact: "Kevin Meyer",
};

export const reports: ReportType[] = [
  {
    id: "diet", title: "DNA Diet", subtitle: "Ernährungs-Typ & Gewichtsmanagement",
    color: "#4CAF50", icon: "🥗",
    overallSummary: "Empfohlener Ernährungstyp: Mediterrane Ernährung. Mind. 20 MET-Stunden/Woche. Starker süsser Zahn (TAS1R2 AA), erhöhtes Adipositas-Risiko (FTO AA).",
    areas: [
      { name: "Fettabsorption und -stoffwechsel", genes: [
        { gene: "APOA5", variation: "1131 T>C", genotype: "TT", impact: "none", description: "Normaler Triglycerid-Stoffwechsel" },
        { gene: "FABP2", variation: "Ala54Thr G>A", genotype: "GA", impact: "moderate", description: "Erhöhte Fettaufnahme, langsamerer Stoffwechsel" },
        { gene: "PLIN", variation: "11482 G>A", genotype: "GA", impact: "moderate", description: "Gewichtsverlust-Resistenz" },
        { gene: "PPARG", variation: "Pro12Ala C>G", genotype: "CC", impact: "none" },
      ]},
      { name: "Energie-Homöostase", genes: [
        { gene: "UCP1", variation: "-3826 A>G", genotype: "AG", impact: "moderate", description: "HIIT empfohlen für Fettverbrennung" },
        { gene: "UCP2", variation: "-866 G>A", genotype: "GG", impact: "moderate", description: "Energiezufuhr langfristig einschränken" },
        { gene: "UCP3", variation: "55 C>T", genotype: "CT", impact: "low" },
      ]},
      { name: "Reaktion auf Kohlenhydrate", genes: [
        { gene: "ADRB2", variation: "Gln27Glu C>G", genotype: "CG", impact: "moderate", description: "Risiko bei >49% Kohlenhydratzufuhr" },
        { gene: "DRD2", variation: "C>T", genotype: "CT", impact: "moderate", description: "Fressattacken bei Kohlenhydraten" },
        { gene: "SLC2A2", variation: "Thr110Ile C>T", genotype: "CT", impact: "moderate", description: "Neigung zu süssen Lebensmitteln" },
        { gene: "TAS1R2", variation: "Ile191Val A>G", genotype: "AA", impact: "high", description: "Starker süsser Zahn — Zucker strikt meiden" },
      ]},
      { name: "Regulierung der Energieaufnahme", genes: [
        { gene: "FTO", variation: "T>A", genotype: "AA", impact: "high", description: "Stark erhöhtes Adipositas-Risiko" },
        { gene: "MC4R", variation: "T>C", genotype: "CT", impact: "moderate", description: "Erhöhte Energieaufnahme" },
        { gene: "TCF7L2", variation: "rs7903146 C>T", genotype: "CT", impact: "moderate", description: "Fettarme Diät effektiver" },
      ]},
      { name: "Sport- und Bewegungsanforderungen", genes: [
        { gene: "ADIPOQ", variation: "276 G>T", genotype: "GG", impact: "moderate" },
        { gene: "ADRB2", variation: "Arg16Gly A>G", genotype: "GG", impact: "moderate" },
        { gene: "ADRB3", variation: "Trp64Arg T>C", genotype: "TT", impact: "none" },
      ]},
      { name: "Circadianer Rhythmus", genes: [
        { gene: "CLOCK", variation: "3111 T>C", genotype: "TC", impact: "moderate", description: "Späterer Chronotyp" },
      ]},
      { name: "Entzündung", genes: [
        { gene: "TNFa", variation: "308 G>A", genotype: "GG", impact: "none" },
        { gene: "IL-6", variation: "174 G>C", genotype: "GG", impact: "none" },
      ]},
    ],
  },
  {
    id: "health", title: "DNA Health", subtitle: "Gesundheitsrisiken & Prävention",
    color: "#2196F3", icon: "🏥",
    overallSummary: "Hohe Priorität: Methylierung & Entzündung. Moderate Priorität: Entgiftung, Oxidativer Stress, Knochen, Insulin. Niedrig: Fettstoffwechsel.",
    areas: [
      { name: "Fettstoffwechsel", priority: "NIEDRIG", genes: [
        { gene: "LPL", variation: "1595 C>G", genotype: "CC", impact: "none" },
        { gene: "CETP", variation: "279 G>A", genotype: "AG", impact: "low" },
        { gene: "APOC3", variation: "3175 C>G", genotype: "CG", impact: "low" },
        { gene: "APOE", variation: "E2/E3/E4", genotype: "E3/E3", impact: "none" },
        { gene: "PON1", variation: "A>G", genotype: "AA", impact: "none" },
      ]},
      { name: "Methylierung", priority: "HOCH", genes: [
        { gene: "MTHFD1", variation: "1958 G>A", genotype: "GA", impact: "moderate" },
        { gene: "MTHFR", variation: "677 C>T", genotype: "CT", impact: "moderate", description: "Heterozygot — aktives Methylfolat" },
        { gene: "MTHFR", variation: "1298 A>C", genotype: "AA", impact: "none" },
        { gene: "MTR", variation: "2756 A>G", genotype: "AA", impact: "none" },
        { gene: "MTRR", variation: "66 A>G", genotype: "GG", impact: "moderate" },
        { gene: "CBS", variation: "699 C>T", genotype: "CC", impact: "none" },
        { gene: "COMT", variation: "472 G>A", genotype: "AG", impact: "moderate" },
      ]},
      { name: "Entgiftung", priority: "MODERAT", genes: [
        { gene: "CYP1A1", variation: "Msp1 T>C", genotype: "CT", impact: "moderate" },
        { gene: "CYP1A1", variation: "Ile462Val A>G", genotype: "AA", impact: "none" },
        { gene: "GSTM1", variation: "Ins/Del", genotype: "Deletion", impact: "high", description: "Fehlende Phase-II — Kreuzblütler essenziell" },
        { gene: "GSTP1", variation: "313 A>G", genotype: "AA", impact: "none" },
        { gene: "GSTT1", variation: "Ins/Del", genotype: "Insertion", impact: "none" },
        { gene: "NQO1", variation: "C>T", genotype: "CC", impact: "none" },
      ]},
      { name: "Entzündung", priority: "HOCH", genes: [
        { gene: "IL-6", variation: "-174 G>C", genotype: "GG", impact: "none" },
        { gene: "TNFA", variation: "-308 G>A", genotype: "GG", impact: "none" },
        { gene: "IL-1A", variation: "4845 G>T", genotype: "TG", impact: "moderate" },
        { gene: "IL-1A", variation: "-889 C/T", genotype: "TC", impact: "moderate" },
        { gene: "IL-1B", variation: "3954 C>T", genotype: "CT", impact: "moderate" },
        { gene: "IL-1B", variation: "-511 A>G", genotype: "GA", impact: "low" },
        { gene: "IL-1RN", variation: "2018 C>T", genotype: "CT", impact: "low" },
      ]},
      { name: "Oxidativer Stress", priority: "MODERAT", genes: [
        { gene: "eNOS", variation: "894 G>T", genotype: "GG", impact: "none" },
        { gene: "MnSOD", variation: "Val16Ala", genotype: "TC", impact: "none" },
        { gene: "CAT", variation: "-262 C>T", genotype: "CT", impact: "low" },
        { gene: "GPX1", variation: "C>T", genotype: "CT", impact: "moderate" },
      ]},
      { name: "Knochengesundheit", priority: "MODERAT", genes: [
        { gene: "VDR", variation: "Fok1 T>C", genotype: "TT", impact: "high", description: "Stark reduzierte Vit-D-Rezeptoraktivität" },
        { gene: "VDR", variation: "Bsm1 G>A", genotype: "GA", impact: "low" },
        { gene: "VDR", variation: "Taq1 C>T", genotype: "TC", impact: "low" },
        { gene: "COL1A1", variation: "1546 G>T", genotype: "GG", impact: "none" },
      ]},
    ],
  },
  {
    id: "mind", title: "DNA Mind", subtitle: "Neurodegeneration, Stimmung & Sucht",
    color: "#00BCD4", icon: "🧠",
    overallSummary: "BDNF Val66Met (CT) hoher Impact in allen 3 Bereichen. GABRA2 (CC) hoher Impact auf Suchtverhalten. Entzündungsgene (CRP, IL1) mit moderatem Impact auf Kognition und Stimmung.",
    areas: [
      { name: "Fettstoffwechsel", genes: [
        { gene: "APOE", variation: "E2/E3/E4", genotype: "E3/E3", impact: "none", description: "Kein erhöhtes Alzheimer-Risiko" },
      ]},
      { name: "Entzündung", genes: [
        { gene: "CRP", variation: "G>A", genotype: "GG", impact: "moderate", description: "Erhöhte CRP-Expression, Neuroinflammation" },
        { gene: "IL1-A", variation: "4845 G>T", genotype: "TG", impact: "moderate" },
        { gene: "IL1-A", variation: "-889 C>T", genotype: "TC", impact: "moderate" },
        { gene: "IL1-B", variation: "3954 C>T", genotype: "CT", impact: "moderate" },
        { gene: "IL1-B", variation: "-511 A>G", genotype: "GA", impact: "low" },
        { gene: "IL1-RN", variation: "2108 C>T", genotype: "CT", impact: "low" },
        { gene: "IL-6", variation: "-174 G>C", genotype: "GG", impact: "none" },
        { gene: "TNFA", variation: "-308 G>A", genotype: "GG", impact: "none" },
      ]},
      { name: "Methylierung", genes: [
        { gene: "MTHFR", variation: "677 C>T", genotype: "CT", impact: "moderate" },
        { gene: "MTHFR", variation: "1298 A>C", genotype: "AA", impact: "none" },
        { gene: "MTR", variation: "2756 A>G", genotype: "AA", impact: "none" },
      ]},
      { name: "Dopaminerger Weg", genes: [
        { gene: "COMT", variation: "Val158Met", genotype: "AG", impact: "low" },
        { gene: "DRD1", variation: "T>C", genotype: "TT", impact: "moderate" },
        { gene: "DRD2", variation: "Taq1A/2A", genotype: "CC", impact: "none" },
        { gene: "DRD4", variation: "-521 C>T", genotype: "TT", impact: "moderate" },
        { gene: "OPRM1", variation: "Asn40Asp", genotype: "AA", impact: "none" },
      ]},
      { name: "Neurotroph", genes: [
        { gene: "BDNF", variation: "Val66Met", genotype: "CT", impact: "high", description: "Hoher Impact auf alle 3 Bereiche — Sport ist wichtigster Aktivator" },
      ]},
      { name: "Serotonerg", genes: [
        { gene: "HTR1A", variation: "-1019 C>G", genotype: "CG", impact: "moderate" },
        { gene: "SLC6A4", variation: "A>C", genotype: "CC", impact: "none" },
      ]},
      { name: "Stress-Reaktion", genes: [
        { gene: "FKBP5", variation: "C>T", genotype: "CT", impact: "moderate" },
        { gene: "OXTR", variation: "G>A", genotype: "AG", impact: "low" },
      ]},
      { name: "GABAergen", genes: [
        { gene: "GABRA2", variation: "T>C", genotype: "CC", impact: "high", description: "Hoher Impact auf Suchtverhalten" },
      ]},
      { name: "Endocannabinoid", genes: [
        { gene: "CNR1", variation: "T>C", genotype: "TT", impact: "none" },
        { gene: "FAAH", variation: "385 C>A", genotype: "AC", impact: "low" },
      ]},
    ],
  },
  {
    id: "resilience", title: "DNA Resilience", subtitle: "Resilienz & Stressachse",
    color: "#4DB6AC", icon: "🛡️",
    overallSummary: "Neuropeptid Y (MODERAT), Oxytocin (MODERAT), BDNF (NIEDRIG), Stressachse (MODERAT), Noradrenalin (NIEDRIG), Dopamin (MODERAT), Serotonin (NIEDRIG).",
    areas: [
      { name: "Neuropeptid Y", priority: "MODERAT", genes: [
        { gene: "NPY", variation: "-399 C>T", genotype: "CT", impact: "moderate", description: "Stress kann Sorgen und Ängste auslösen" },
      ], summary: "Stärke: Kein Stressessen. Herausforderung: Ängste unter Druck." },
      { name: "Oxytocin", priority: "MODERAT", genes: [
        { gene: "OXTR", variation: "G>A", genotype: "AG", impact: "moderate", description: "Erhöhtes Risiko für Stimmungsstörungen bei Stress" },
      ], summary: "Stärke: Isolation belastet weniger. Herausforderung: Traumabewältigung." },
      { name: "Wachstumsfaktor BDNF", priority: "NIEDRIG", genes: [
        { gene: "BDNF", variation: "Val66Met", genotype: "CT", impact: "high", description: "Sport ist der wichtigste BDNF-Aktivator" },
      ]},
      { name: "Stressachse", priority: "MODERAT", genes: [
        { gene: "FKBP5", variation: "C>T", genotype: "CT", impact: "moderate" },
        { gene: "NR3C1", variation: "Bcl1 C>G", genotype: "CG", impact: "moderate" },
        { gene: "CRHR1", variation: "G>A", genotype: "GA", impact: "moderate" },
      ]},
      { name: "Noradrenalin", priority: "NIEDRIG", genes: [
        { gene: "ADRB2", variation: "Arg16Gly", genotype: "GG", impact: "none" },
        { gene: "DBH", variation: "C>T", genotype: "CC", impact: "none" },
      ]},
      { name: "Dopamin", priority: "MODERAT", genes: [
        { gene: "COMT", variation: "Val158Met", genotype: "AG", impact: "moderate" },
        { gene: "DRD2", variation: "Taq1A", genotype: "CC", impact: "none" },
      ]},
      { name: "Serotonin", priority: "NIEDRIG", genes: [
        { gene: "SLC6A4", variation: "5-HTTLPR", genotype: "LL", impact: "none" },
        { gene: "TPH2", variation: "G>T", genotype: "GG", impact: "none" },
      ]},
    ],
  },
  {
    id: "sport", title: "DNA Sport", subtitle: "Sportliches Potenzial & Training",
    color: "#FF9800", icon: "🏃",
    overallSummary: "Überdurchschnittliches Kraft- UND Ausdauerpotenzial. Schnelle Regeneration. Mässiges Verletzungsrisiko. Langsamer Koffeinstoffwechsel.",
    areas: [
      { name: "Verletzungsrisiko", genes: [
        { gene: "COL1A1", variation: "G>T", genotype: "GG", impact: "high", description: "Erhöhtes Sehnenrisiko" },
        { gene: "COL5A1", variation: "C>T", genotype: "CC", impact: "none" },
        { gene: "GDF5", variation: "C>T", genotype: "TC", impact: "moderate" },
      ], summary: "Mässiges Verletzungsrisiko — Prähabilitation empfohlen" },
      { name: "Regeneration", genes: [
        { gene: "IL6", variation: "G>C", genotype: "GG", impact: "none" },
        { gene: "IL6R", variation: "A>C", genotype: "AA", impact: "none" },
        { gene: "CRP", variation: "G>A", genotype: "GG", impact: "high" },
        { gene: "TNFA", variation: "G>A", genotype: "GG", impact: "none" },
        { gene: "SOD2", variation: "C>T", genotype: "TC", impact: "low" },
        { gene: "eNOS", variation: "G>T", genotype: "GG", impact: "none" },
      ], summary: "Schnelle Regeneration — 3-4 intensive Einheiten/Woche möglich" },
      { name: "Kraft & Ausdauer", genes: [
        { gene: "AGT", variation: "T>C", genotype: "TC", impact: "none" },
        { gene: "ACE", variation: "I>D", genotype: "DD", impact: "high", description: "Starker Kraftvorteil" },
        { gene: "BDKRB2", variation: "C>T", genotype: "CT", impact: "moderate" },
        { gene: "VEGF", variation: "C>G", genotype: "CG", impact: "none" },
        { gene: "NRF2", variation: "A>G", genotype: "AA", impact: "none" },
        { gene: "PPARGC1A", variation: "G>A", genotype: "GG", impact: "high", description: "Starker Ausdauer-Impact" },
        { gene: "PPARA", variation: "G>C", genotype: "GG", impact: "high", description: "Optimaler Fettsäurestoffwechsel" },
        { gene: "ACTN3", variation: "R>X", genotype: "XX", impact: "moderate", description: "Ausdauertyp" },
      ]},
      { name: "Koffeinstoffwechsel", genes: [
        { gene: "CYP1A2", variation: "A>C", genotype: "AC", impact: "moderate", description: "Langsamer Stoffwechsel — Koffein mind. 6h vor Schlaf meiden" },
      ]},
    ],
  },
];

export const enhancedRecommendations: PersonalizedRecommendation[] = [
  { id: 1, category: "supplemente", priority: "hoch", title: "Methylfolat 400–800 μg täglich",
    content: "MTHFR C677T (CT): Aktive Folatform statt synthetischer Folsäure. Methylierung hat HOHE Priorität. B-Komplex mit Methylfolat, Methylcobalamin und P5P.", genes: ["MTHFR", "MTHFD1", "MTRR"], reportSource: ["health", "mind"] },
  { id: 2, category: "supplemente", priority: "hoch", title: "Vitamin D3 4000 IE + K2 täglich",
    content: "VDR Fok1 (TT): Stark reduzierte Rezeptoraktivität. Spiegel alle 3 Monate kontrollieren. Mit K2 für Kalziumverwertung.", genes: ["VDR"], reportSource: ["health"] },
  { id: 3, category: "supplemente", priority: "hoch", title: "Omega-3 (EPA/DHA) 2–3g täglich",
    content: "Entzündungsprofil HOCH (IL1A, IL1B, CRP). Anti-inflammatorisch essenziell für Gesundheit UND Kognition. Pflanzenöle/Sonnenblumenöl meiden.", genes: ["CRP", "IL-1A", "IL-1B", "GPX1"], reportSource: ["health", "mind", "sport"] },
  { id: 4, category: "ernährung", priority: "hoch", title: "Mediterrane Ernährung als Basis",
    content: "DNA Diet Analyse: Mediterran optimal. FTO (AA) + MC4R (CT) profitieren besonders. Gemüse, Olivenöl, Fisch, Nüsse. Gesättigte Fette reduzieren.", genes: ["FTO", "MC4R", "TCF7L2"], reportSource: ["diet", "health"] },
  { id: 5, category: "ernährung", priority: "hoch", title: "Zuckerkonsum strikt reduzieren",
    content: "TAS1R2 (AA): Starker süsser Zahn. Mit FTO (AA) + DRD2 (CT) signifikantes Gewichtsrisiko. Alle verarbeiteten Zucker und gesüssten Getränke meiden.", genes: ["TAS1R2", "FTO", "DRD2", "SLC2A2"], reportSource: ["diet"] },
  { id: 6, category: "sport", priority: "hoch", title: "Kraft + Ausdauer kombiniert, 4x/Woche",
    content: "ACE (DD) + ACTN3 (XX) + PPARGC1A (GG): Überdurchschnittliches Potenzial für beides. Mind. 20 MET-Stunden/Woche (FTO AA). Schnelle Erholung erlaubt häufiges Training.", genes: ["ACE", "ACTN3", "PPARGC1A", "FTO"], reportSource: ["sport", "diet"] },
  { id: 7, category: "ernährung", priority: "hoch", title: "Kreuzblütler-Gemüse täglich",
    content: "GSTM1 (Deletion): Phase-II-Entgiftung fehlt komplett. Brokkoli, Blumenkohl, Rosenkohl für Sulforaphan essenziell.", genes: ["GSTM1"], reportSource: ["health"] },
  { id: 8, category: "supplemente", priority: "mittel", title: "CoQ10 100mg + Selen 200μg",
    content: "SOD2 (TC) + CAT (CT) + GPX1 (CT): Moderate oxidative Stresskapazität. Antioxidative Unterstützung.", genes: ["SOD2", "CAT", "GPX1"], reportSource: ["health", "sport"] },
  { id: 9, category: "supplemente", priority: "mittel", title: "Magnesium + Curcumin für Resilienz",
    content: "NPY (CT) + OXTR (AG) + BDNF (CT): Moderate Resilienz. Magnesium für Stress, Curcumin für BDNF/Entzündung.", genes: ["NPY", "OXTR", "BDNF"], reportSource: ["resilience", "mind"] },
  { id: 10, category: "sport", priority: "mittel", title: "Prähabilitatives Training 1–2x/Woche",
    content: "COL1A1 (GG) + GDF5 (TC): Mässiges Sehnenrisiko. Yoga, Pilates oder gezieltes Konditionstraining. Vitamin C und Protein für Kollagen.", genes: ["COL1A1", "GDF5"], reportSource: ["sport"] },
  { id: 11, category: "stressmanagement", priority: "mittel", title: "Vagusnervstimulation & Kälte",
    content: "NPY (CT) + OXTR (AG): Eisbaden/kalte Dusche 30-90 Sek, Atemübungen, 15 Min/Tag Natur.", genes: ["NPY", "OXTR", "FKBP5"], reportSource: ["resilience"] },
  { id: 12, category: "lebensstil", priority: "mittel", title: "Soziale Kontakte bewusst pflegen",
    content: "OXTR (AG): 11+ prosoziale Handlungen/Woche. Körperkontakt, Loving Kindness Meditation, Empathie üben.", genes: ["OXTR"], reportSource: ["resilience"] },
  { id: 13, category: "ernährung", priority: "mittel", title: "Anti-inflammatorische Lebensmittel",
    content: "Entzündung HOCH: Kurkuma, Ingwer, Beeren, fetter Fisch, grüner Tee, Kakao täglich. Verarbeitete Getreide und hohen Zucker meiden.", genes: ["IL-1A", "IL-1B", "CRP"], reportSource: ["health", "mind"] },
  { id: 14, category: "sport", priority: "mittel", title: "BDNF durch Sport aktivieren",
    content: "BDNF Val66Met (CT): Hoher Impact in allen Bereichen. Mischung aus hoher und moderater Intensität 3-5x/Woche. Neue Fähigkeiten erlernen.", genes: ["BDNF"], reportSource: ["mind", "resilience"] },
  { id: 15, category: "schlaf", priority: "niedrig", title: "Schlafhygiene und feste Schlafenszeit",
    content: "CLOCK (TC): Späterer Chronotyp. Blaulichtfilter ab 20h. CYP1A2 (AC): Koffein mind. 6h vor Schlaf meiden.", genes: ["CLOCK", "CYP1A2"], reportSource: ["diet", "sport"] },
  { id: 16, category: "ernährung", priority: "niedrig", title: "Kohlenhydrate auf max. 45% begrenzen",
    content: "ADRB2 (CG): Risiko bei >49% KH. TCF7L2 (CT): Fettarme Diät effektiver. Fokus auf niedrigen GI.", genes: ["ADRB2", "TCF7L2", "PLIN"], reportSource: ["diet"] },
  { id: 17, category: "detox", priority: "niedrig", title: "Entgiftung aktiv unterstützen",
    content: "GSTM1 (Del) + CYP1A1 (CT): Phase-I erhöht, Phase-II reduziert. Bio-Lebensmittel, Plastik meiden, viel Wasser.", genes: ["GSTM1", "CYP1A1"], reportSource: ["health"] },
  { id: 18, category: "ernährung", priority: "niedrig", title: "Vitamin B12-reiche Kost erhöhen",
    content: "Erhöhter B12-Bedarf. Fisch, Leber, Rindfleisch, Eier. Alkohol reduzieren.", genes: ["MTHFR", "MTRR"], reportSource: ["health"] },
];

export const resilienceScores = [
  { area: "Neuropeptid Y", score: "MODERAT" as const, value: 50 },
  { area: "Oxytocin", score: "MODERAT" as const, value: 50 },
  { area: "BDNF", score: "NIEDRIG" as const, value: 25 },
  { area: "Stressachse", score: "MODERAT" as const, value: 50 },
  { area: "Noradrenalin", score: "NIEDRIG" as const, value: 25 },
  { area: "Dopamin", score: "MODERAT" as const, value: 50 },
  { area: "Serotonin", score: "NIEDRIG" as const, value: 25 },
];

export const healthPriorities = [
  { area: "Fettstoffwechsel", priority: "NIEDRIG" as const },
  { area: "Methylierung", priority: "HOCH" as const },
  { area: "Entgiftung", priority: "MODERAT" as const },
  { area: "Entzündung", priority: "HOCH" as const },
  { area: "Oxidativer Stress", priority: "MODERAT" as const },
  { area: "Knochengesundheit", priority: "MODERAT" as const },
  { area: "Insulinempfindlichkeit", priority: "MODERAT" as const },
];

export const sportSummary = {
  verletzungsrisiko: "MODERAT",
  regeneration: "SCHNELL",
  kraftpotential: "ÜBERDURCHSCHNITTLICH",
  ausdauerpotential: "ÜBERDURCHSCHNITTLICH",
  koffein: "LANGSAM",
  salzsensitivität: "MODERAT",
  trainingszeit: "KEINE PRÄFERENZ",
};
