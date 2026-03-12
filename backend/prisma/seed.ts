import { PrismaClient, Role, ConsentType, AuditAction, PackageType, PackageStatus, RecommendationCategory } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Swiss DNA Platform...');

  // Demo Doctor: Dr. Farkas (EVAZ)
  const doctorHash = await bcrypt.hash('doctor123', 12);
  const doctor = await prisma.user.upsert({
    where: { email: 'farkas@evaz.ch' },
    update: {},
    create: {
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

  // Demo Patient: Anna Mueller
  const patientHash = await bcrypt.hash('patient123', 12);
  const patient = await prisma.user.upsert({
    where: { email: 'anna@example.ch' },
    update: {},
    create: {
      email: 'anna@example.ch',
      passwordHash: patientHash,
      role: Role.PATIENT,
      isActive: true,
      isEmailVerified: true,
      profile: {
        create: {
          firstName: 'Anna',
          lastName: 'Mueller',
          dateOfBirth: new Date('1990-05-15'),
          language: 'de',
          country: 'CH',
          city: 'Bern',
          postalCode: '3001',
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

  // DNA Profile for Anna
  await prisma.dnaProfile.create({
    data: {
      userId: patient.id,
      dietScore: 78,
      mindScore: 65,
      resilienceScore: 82,
      healthScore: 71,
      sportScore: 88,
      ftoVariant: 'CT',
      mthfrVariant: 'AG',
      actn3Variant: 'RR',
      apoeVariant: 'E3/E3',
      vdrVariant: 'Ff',
      comtVariant: 'Val/Met',
      labName: 'Nordic DNA Labs',
      labReference: 'NDL-2026-00142',
      sampleDate: new Date('2026-02-20'),
      analysisDate: new Date('2026-03-01'),
      gumgAccredited: true,
      requestingPhysician: 'Dr. Andras Farkas',
    },
  });
  console.log('DNA Profile created for Anna');

  // Anamnesis for Anna
  await prisma.anamnesis.create({
    data: {
      userId: patient.id,
      heightCm: 168,
      weightKg: 62,
      bmi: 22.0,
      bloodType: 'A+',
      smokingStatus: 'never',
      alcoholConsumption: 'occasional',
      activityLevel: 'moderate',
      sleepHoursAvg: 7.5,
      dietType: 'omnivore',
      foodIntolerances: ['lactose'],
      supplements: ['Vitamin D', 'Omega-3'],
      chronicDiseases: [],
      medications: [],
      allergies: ['Pollen'],
      stressLevel: 4,
      healthGoals: ['Gewicht halten', 'Mehr Energie', 'Besserer Schlaf'],
      completedAt: new Date(),
    },
  });
  console.log('Anamnesis created for Anna');

  // Package for Anna
  const pkg = await prisma.patientPackage.create({
    data: {
      userId: patient.id,
      type: PackageType.COMPLETE,
      status: PackageStatus.ACTIVE,
      activatedAt: new Date('2026-03-01'),
      expiresAt: new Date('2027-03-01'),
      price: 990,
      currency: 'CHF',
      evazConsultDate: new Date('2026-03-05'),
      evazDoctorId: doctor.id,
    },
  });

  // Recommendations for Anna
  const recs = [
    { category: RecommendationCategory.NUTRITION, title: 'Folat-reiche Ernaehrung', content: 'MTHFR-Variante (Heterozygot): Erhoehter Bedarf an Methylfolat. Empfohlen: Blattgemuese, Huelsenfruechte, Avocado. Supplement: L-Methylfolat 400-800mcg/Tag', priority: 5 },
    { category: RecommendationCategory.NUTRITION, title: 'Vitamin D Optimierung', content: 'VDR-Variante Ff: Reduzierte Vitamin-D-Rezeptor-Aktivitaet. Supplement: Vitamin D3 4000 IE/Tag', priority: 5 },
    { category: RecommendationCategory.NUTRITION, title: 'Omega-3 Fettsaeuren', content: 'APOE E3/E3: Normales Lipidprofil. Supplement: EPA/DHA 1000mg/Tag', priority: 3 },
    { category: RecommendationCategory.SPORT, title: 'Sprint & Kraft Training', content: 'ACTN3 RR Sprint-Typ: Genetische Praedisposition fuer schnelle Muskelfasern. Krafttraining und HIIT bevorzugen.', priority: 5 },
    { category: RecommendationCategory.SPORT, title: 'Regeneration beachten', content: 'IL-6 Variante: 48h Pause zwischen intensiven Einheiten empfohlen.', priority: 3 },
    { category: RecommendationCategory.STRESS_MANAGEMENT, title: 'COMT-optimiertes Stressmanagement', content: 'COMT Val/Met: Mittlerer Dopamin-Abbau. Meditation und Pausen empfohlen. Supplement: Magnesium Glycinat 400mg/Tag', priority: 4 },
    { category: RecommendationCategory.SLEEP, title: 'Schlafhygiene', content: 'CLOCK-Gen Variante: Spaeter Chronotyp. Strikte Schlafenszeit und Blaulichtfilter ab 20 Uhr.', priority: 5 },
    { category: RecommendationCategory.SUPPLEMENTS, title: 'Coenzym Q10', content: 'SOD2 Variante: Leicht reduzierte antioxidative Kapazitaet. Supplement: Coenzym Q10 100mg/Tag', priority: 2 },
  ];

  for (const rec of recs) {
    await prisma.recommendation.create({
      data: { userId: patient.id, packageId: pkg.id, ...rec },
    });
  }
  console.log(`${recs.length} Recommendations created for Anna`);

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
  console.log('  Patient: anna@example.ch / patient123');
  console.log('  Doctor:  farkas@evaz.ch / doctor123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
