import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  @OnEvent('dna.analysis.completed')
  handleDnaAnalysisCompleted(payload: { userId: string; profileId: string }) {
    this.logger.log(`DNA analysis completed for user ${payload.userId}`);
    // TODO: Send email/push notification
  }

  @OnEvent('recommendation.generated')
  handleRecommendationGenerated(payload: { userId: string; count: number }) {
    this.logger.log(`${payload.count} recommendations generated for user ${payload.userId}`);
  }

  @OnEvent('consent.revoked')
  handleConsentRevoked(payload: { userId: string; type: string }) {
    this.logger.warn(`Consent ${payload.type} revoked by user ${payload.userId}`);
  }

  @OnEvent('user.registered')
  handleUserRegistered(payload: { userId: string; email: string }) {
    this.logger.log(`New user registered: ${payload.email}`);
    // TODO: Send welcome email
  }

  async sendEmail(to: string, subject: string, body: string) {
    // TODO: Integrate with email provider (Mailjet/SendGrid)
    this.logger.log(`Email queued: to=${to}, subject=${subject}`);
  }
}
