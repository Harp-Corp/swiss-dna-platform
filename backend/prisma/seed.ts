import { PrismaClient, Role, ConsentType, AuditAction, PackageType, PackageStatus, RecommendationCategory } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Swiss DNA Platform...');

  // Clean existing data (in correct order for foreign key constraints)
  console.log('Cleaning existing data...');
  await prisma.auditLog.deleteMany({});
  await prisma.recommendation.deleteMany({});
  await prisma.patientPackage.deleteMany({});
  await prisma.anamnesis.deleteMany({});
  await prisma.dnaProfile.deleteMany({});
  await prisma.consent.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.userProfile.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Database cleaned.');

  // Demo Doctor: Dr. Farkas (EVAZ)
  const doctorHash = await bcrypt.hash('doctor123', 12);
  const doctor = await prisma.user.create({
    data: {
      email: 'farkas@evaz.ch',
      passwordHash: doctorHash,
      role: Role.DOCTOR,
      isActive: true,
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'Dr. Andras',
          lastName: 'Farkas',
          language: 'de',
          country: 'CH',
          city: 'Zuerich',
          postalCode: '8001',
        },
      },
      consents: {
        create: [{ type: ConsentType.DATA_PROCESSING, given: true, givenAt: new Date(), version: '1.0' }],
      },
    },
  });
  console.log(`Doctor created: ${doctor.email}`);

  // Demo Patient: Gusti Brösmeli (real data from DNAlife PDF reports)
  const patientHash = await bcrypt.hash('patient123', 12);
  const patient = await prisma.user.create({
    data: {
      email: 'gusti@demo.ch',
      passwordHash: patientHash,
      role: Role.PATIENT,
      isActive: true,
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'Gusti',
          lastName: 'Brösmeli',
          dateOfBirth: new Date('1970-12-19'),
          language: 'de',
          country: 'CH',
          city: 'Zürich',
          postalCode: '8001',
        },
      },
      consents: {
        create: [
          { type: ConsentType.DATA_PROCESSING, given: true, givenAt: new Date(), version: '1.0' },
          { type: ConsentType.DNA_ANALYSIS, given: true, givenAt: new Date(), version: '1.0' },
        ],
      },
    },
  });
  console.log(`Patient created: ${patient.email}`);

  // DNA Profile for Gusti – real variants from DNAlife/DNAlysis reports (30.12.2025)
  await prisma.dnaProfile.create({
    data: {
      userId: patient.id,
      dietScore: 62,
      mindScore: 55,
      resilienceScore: 48,
      healthScore: 58,
      sportScore: 82,
      ftoVariant: 'AA',
      mthfrVariant: 'CT',
      actn3Variant: 'XX',
      apoeVariant: 'E3/E3',
      vdrVariant: 'TT',
      comtVariant: 'AG',
      labName: 'DNAlysis / DNAlife',
      labReference: 'TST-NL-197314',
      sampleDate: new Date('2025-12-30'),
      analysisDate: new Date('2025-12-30'),
      gumgAccredited: true,
      requestingPhysician: 'Kevin Meyer',
    },
  });
  console.log('DNA Profile created for Gusti');

  // Anamnesis for Gusti
  await prisma.anamnesis.create({
    data: {
      userId: patient.id,
      heightCm: 178,
      weightKg: 85,
      bmi: 26.8,
      bloodType: 'A+',
      smokingStatus: 'never',
      alcoholConsumption: 'occasional',
      activityLevel: 'active',
      sleepHoursAvg: 6.5,
      dietType: 'omnivore',
      foodIntolerances: [],
      supplements: [],
      chronicDiseases: [],
      medications: [],
      allergies: ['Pollen'],
      stressLevel: 6,
      healthGoals: ['Gewicht reduzieren', 'Stressmanagement', 'Sportoptimierung', 'Mehr Resilienz'],
      completedAt: new Date(),
    },
  });
  console.log('Anamnesis created for Gusti');

  // Package for Gusti
  const pkg = await prisma.patientPackage.create({
    data: {
      userId: patient.id,
      type: PackageType.COMPLETE,
      status: PackageStatus.ACTIVE,
      activatedAt: new Date('2025-12-30'),
      expiresAt: new Date('2026-12-30'),
      price: 990,
      currency: 'CHF',
      evazConsultDate: new Date('2026-01-15'),
      evazDoctorId: doctor.id,
    },
  });

  // Recommendations for Gusti – based on real genotype analysis
  const recs = [
    { category: RecommendationCategory.SUPPLEMENTS, title: 'Methylfolat 400–800 μg täglich', content: 'MTHFR C677T (CT): Heterozygote Variante erfordert aktive Folatform. Methylfolat statt synthetischer Folsäure für optimale Bioverfügbarkeit.', priority: 5 },
    { category: RecommendationCategory.SUPPLEMENTS, title: 'Vitamin D3 4000 IE täglich', content: 'VDR Fok1 (TT): Stark reduzierte Rezeptoraktivität. Spiegel alle 3 Monate kontrollieren. Kombiniert mit Vitamin K2 einnehmen.', priority: 5 },
    { category: RecommendationCategory.SUPPLEMENTS, title: 'Omega-3 (EPA/DHA) 2g täglich', content: 'Entzündungsprofil HOCH + CRP (GG): Anti-inflammatorische Wirkung essenziell. Hochwertiges Fischöl oder Algenöl bevorzugen.', priority: 5 },
    { category: RecommendationCategory.NUTRITION, title: 'Kreuzblütler-Gemüse täglich', content: 'GSTM1 (Deletion): Fehlende Phase-II-Entgiftung kompensieren mit Sulforaphan aus Brokkoli, Blumenkohl, Rosenkohl, Grünkohl.', priority: 5 },
    { category: RecommendationCategory.SPORT, title: 'Krafttraining 3–4x/Woche mit Ausdaueranteil', content: 'ACE (DD) + ACTN3 (XX) + PPARGC1A (GG): Kombination aus Kraft und Ausdauer optimal. Mindestens 20 MET-Stunden/Woche wegen FTO (AA).', priority: 5 },
    { category: RecommendationCategory.NUTRITION, title: 'Gewichtskontrolle und Zuckerreduktion', content: 'FTO (AA) + TAS1R2 (AA): Hohes Adipositas-Risiko bei starker Süsspräferenz. Mediterrane Ernährung, Zuckerkonsum strikt reduzieren.', priority: 5 },
    { category: RecommendationCategory.SUPPLEMENTS, title: 'CoQ10 100mg + Selen 200μg täglich', content: 'SOD2 (TC) + CAT (CT) + GPX1 (CT): Moderate oxidative Stresskapazität. Antioxidative Unterstützung für Zellschutz.', priority: 3 },
    { category: RecommendationCategory.STRESS_MANAGEMENT, title: 'Ashwagandha KSM-66', content: 'COMT (AG) + FKBP5 (CT) + BDNF (CT): Stressachse regulieren und BDNF fördern. 600mg/Tag standardisiert.', priority: 3 },
    { category: RecommendationCategory.MENTAL_HEALTH, title: 'Sport mind. 5x/Woche für BDNF', content: 'BDNF Val66Met (CT): Niedrige Resilienz. Sport ist wichtigster BDNF-Aktivator. Kombination aus Ausdauer und Krafttraining.', priority: 3 },
    { category: RecommendationCategory.NUTRITION, title: 'Anti-inflammatorische Ernährung', content: 'Entzündungsprofil HOCH (IL1A, IL1B multiple Varianten): Kurkuma, Ingwer, Beeren, fetter Fisch täglich integrieren.', priority: 3 },
    { category: RecommendationCategory.SPORT, title: 'Gründliches Aufwärmen vor Sport', content: 'COL1A1 (GG): Erhöhtes Sehnenrisiko. Dynamisches Dehnen und progressiver Belastungsaufbau vor jeder Einheit.', priority: 3 },
    { category: RecommendationCategory.SLEEP, title: 'Schlafhygiene und feste Schlafenszeit', content: 'CLOCK (TC): Späterer Chronotyp. Blaulichtfilter ab 20 Uhr, feste Schlafenszeit, Schlafzimmer kühl und dunkel.', priority: 2 },
  ];

  for (const rec of recs) {
    await prisma.recommendation.create({
      data: { userId: patient.id, packageId: pkg.id, ...rec },
    });
  }
  console.log(`${recs.length} Recommendations created for Gusti`);

  // Audit logs
  await prisma.auditLog.create({
    data: { userId: patient.id, action: AuditAction.REGISTER, ipAddress: '127.0.0.1' },
  });
  await prisma.auditLog.create({
    data: { userId: patient.id, action: AuditAction.CONSENT_GIVEN, resource: 'DNA_ANALYSIS' },
  });
  await prisma.auditLog.create({
    data: { userId: patient.id, action: AuditAction.DNA_ANALYSIS_COMPLETED, resource: 'dna_profiles' },
  });

  console.log('\n=== Seed Complete ===');
  console.log('Demo Login:');
  console.log('  Patient: gusti@demo.ch / patient123');
  console.log('  Doctor:  farkas@evaz.ch / doctor123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
