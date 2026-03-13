import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.profile?.firstName || '',
      lastName: user.profile?.lastName || '',
      dateOfBirth: user.profile?.dateOfBirth,
      gender: user.profile?.gender,
      phone: user.profile?.phone,
      consentGiven: true,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateProfile(
    id: string,
    data: { firstName?: string; lastName?: string },
  ): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async listAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async deactivate(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
