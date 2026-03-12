# Swiss DNA Code Platform

DNA-Analyse-Plattform fuer Dr. Farkas (EVAZ) - Personalisierte Gesundheitsempfehlungen basierend auf DNA-Analyse.

## Tech Stack

- **Backend**: NestJS, Prisma, PostgreSQL, Redis, MinIO
- **Frontend**: Next.js 14, TailwindCSS, React Query, Zustand
- **Compliance**: revDSG, GUMG, Privacy by Design
- **CI/CD**: GitHub Actions
- **Infrastructure**: Docker Compose (dev), Exoscale/Infomaniak (prod)

## Quick Start

```bash
# 1. Clone
git clone https://github.com/Harp-Corp/swiss-dna-platform.git
cd swiss-dna-platform

# 2. Start infrastructure
docker compose up -d postgres redis minio

# 3. Backend
cd backend
cp ../.env.example .env
npm install
npx prisma migrate dev
npm run start:dev

# 4. Frontend
cd ../frontend
npm install
npm run dev
```

Backend: http://localhost:3000/api
Frontend: http://localhost:3001
Swagger: http://localhost:3000/api/docs

## Project Structure

```
swiss-dna-platform/
|-- backend/
|   |-- src/
|   |   |-- auth/          # JWT + MFA authentication
|   |   |-- users/         # User management + profiles
|   |   |-- anamnesis/     # Health questionnaire
|   |   |-- dna/           # DNA profile management
|   |   |-- documents/     # Document upload + OCR
|   |   |-- storage/       # MinIO file storage
|   |   |-- packages/      # EVAZ package management
|   |   |-- recommendations/ # AI-driven recommendations
|   |   |-- consents/      # revDSG consent management
|   |   |-- gdpr/          # Data export + deletion
|   |   |-- audit/         # Audit logging
|   |   |-- health/        # Health checks
|   |   |-- notifications/ # Event-driven notifications
|   |   |-- prisma/        # DB client
|   |-- prisma/schema.prisma
|   |-- Dockerfile
|-- frontend/
|   |-- src/
|   |   |-- app/
|   |   |   |-- page.tsx            # Login
|   |   |   |-- register/page.tsx   # Registrierung
|   |   |   |-- dashboard/
|   |   |   |   |-- page.tsx        # DNA Dashboard (Patient)
|   |   |   |   |-- upload/page.tsx # DNA Upload
|   |   |   |   |-- recommendations/page.tsx # Empfehlungen
|   |   |   |-- doctor/page.tsx     # Arzt Portal
|   |   |-- lib/api.ts              # API Helper
|   |-- Dockerfile
|   |-- next.config.js
|   |-- tailwind.config.ts
|   |-- tsconfig.json
|   |-- postcss.config.js
|-- docker-compose.yml
|-- .env.example
```

## API Endpoints

| Module | Endpoint | Description |
|--------|----------|-------------|
| Auth | POST /auth/login | JWT Login |
| Auth | POST /auth/register | Register |
| Users | GET /users/me | Current user |
| DNA | GET /dna/profile | DNA profile |
| Consents | POST /consents/:type | Give consent |
| GDPR | GET /gdpr/export | Export data |
| GDPR | DELETE /gdpr/delete-account | Delete account |
| Documents | POST /documents/upload | Upload file |
| Anamnesis | POST /anamnesis | Submit questionnaire |

## Compliance

- **revDSG**: Swiss Data Protection Act compliant
- **GUMG**: Genetic testing law compliant
- **Privacy by Design**: Identity separated from health data
- **Audit Trail**: All data access logged
- **Data Hosting**: Switzerland only (Exoscale/Infomaniak)

## License

Private - Harp-Corp
