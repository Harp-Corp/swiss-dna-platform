import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AnamnesisModule } from './anamnesis/anamnesis.module';
import { DocumentsModule } from './documents/documents.module';
import { StorageModule } from './storage/storage.module';
import { DnaModule } from './dna/dna.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { PackagesModule } from './packages/packages.module';
import { AuditModule } from './audit/audit.module';
import { HealthModule } from './health/health.module';
import { ConsentsModule } from './consents/consents.module';
import { GdprModule } from './gdpr/gdpr.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    // === Config ===
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // === Rate Limiting ===
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 10 },
      { name: 'medium', ttl: 10000, limit: 50 },
      { name: 'long', ttl: 60000, limit: 200 },
    ]),

    // === Cache (Redis with retry, graceful fallback) ===
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        if (redisUrl) {
          return {
            store: redisStore,
            url: redisUrl,
            ttl: 60 * 1000,
            retryStrategy: (times: number) => Math.min(times * 200, 5000),
            maxRetriesPerRequest: 3,
            lazyConnect: true,
            enableOfflineQueue: true,
          };
        }
        return { ttl: 60 * 1000 };
      },
    }),

    // === Events & Scheduling ===
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),

    // === Core Modules ===
    PrismaModule,
    AuthModule,
    UsersModule,
    AuditModule,

    // === Health Data Modules ===
    AnamnesisModule,
    DnaModule,
    DocumentsModule,
    RecommendationsModule,
    HealthModule,

    // === Business Modules ===
    PackagesModule,
    StorageModule,

    // === Compliance & GDPR ===
    ConsentsModule,
    GdprModule,

    // === Notifications ===
    NotificationsModule,
  ],
})
export class AppModule {}
