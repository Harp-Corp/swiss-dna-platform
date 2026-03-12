// Enums matching Prisma schema
export type Role = 'PATIENT' | 'DOCTOR' | 'LAB_TECHNICIAN' | 'ADMIN' | 'SUPER_ADMIN';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
export type DocumentType = 'BLOOD_TEST' | 'DNA_RAW_DATA' | 'DNA_REPORT' | 'IMAGING' | 'LAB_RESULT' | 'ANAMNESIS' | 'CONSENT_FORM' | 'OTHER';
export type DocumentStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
export type AnalysisStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type RecommendationCategory = 'NUTRITION' | 'SPORT' | 'SUPPLEMENTS' | 'STRESS_MANAGEMENT' | 'SLEEP' | 'PREVENTION' | 'OTHER';

export interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  gender?: Gender;
  dateOfBirth?: string;
  phone?: string;
  consentGiven: boolean;
  createdAt: string;
}

export interface AnalysisJob {
  id: string;
  status: AnalysisStatus;
  resultSummary?: string;
  variants?: ComtVariant[];
  createdAt: string;
  completedAt?: string;
}

export interface ComtVariant {
  gene: string;
  rsId: string;
  genotype: string;
  effect: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
}

export interface Recommendation {
  id: string;
  category: RecommendationCategory;
  title: string;
  content: string;
  priority: number;
}

export interface Document {
  id: string;
  fileName: string;
  fileType: string;
  documentType: DocumentType;
  status: DocumentStatus;
  uploadedAt: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  isActive: boolean;
}

export interface GdprRequest {
  id: string;
  requestType: 'DATA_EXPORT' | 'DATA_DELETION' | 'DATA_RECTIFICATION' | 'CONSENT_WITHDRAWAL';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  createdAt: string;
  completedAt?: string;
}
