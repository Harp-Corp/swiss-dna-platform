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

    // === Redis Cache ===
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get<string>('REDIS_URL'),
        ttl: 60 * 1000, // 60 seconds default
      }),
    }),

    // === Events & Scheduling ===
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),

    // === Core Modules ===
    PrismaModule,
    StorageModule,
    AuditModule,
    HealthModule,

    // === Feature Modules ===
    AuthModule,
    UsersModule,
    AnamnesisModule,
    DocumentsModule,
    DnaModule,
    RecommendationsModule,
    PackagesModule,
  ],
})
export class AppModule {}
