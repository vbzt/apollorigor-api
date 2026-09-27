import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  ClothingItemDto,
  ParticipantDto,
  WeddingPackageSummaryDto,
} from './dto/wedding-package-summary.dto.js';
import { CreateWeddingPackageDto } from './dto/create-wedding.dto.js';

const include = {
  transactions: {
    include: {
      profile: true,
      payment: true,
      variant: { include: { product: true } },
    },
  },
};

@Injectable()
export class WeddingPackageService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(id: string): Promise<WeddingPackageSummaryDto> {
    const pkg = await this.prisma.weddingPackage.findUnique({
      where: { id },
      include,
    });
    if (!pkg) throw new NotFoundException('Pacote não encontrado.');

    const participants: ParticipantDto[] = pkg.transactions.map((t) => ({
      name: t.profile.name,
      pickedUp: !!t.pickedUpAt,
      waiting: !t.pickedUpAt && t.status === 'CONFIRMED',
      paid: t.payment?.status === 'PAID',
    }));

    const clothingItems: ClothingItemDto[] = pkg.transactions.map((t) => ({
      relationship: t.relationship,
      model: t.variant.product.name,
      fabric: t.variant.product.fabric,
      color: t.variant.product.color,
      photoUrl: t.variant.product.photoUrl,
      description: t.variant.product.description,
    }));

    return {
      contractNumber: pkg.contractNumber,
      brideName: pkg.brideName,
      groomName: pkg.groomName,
      eventDate: pkg.eventDate,
      pickupWindowStart: pkg.pickupWindowStart,
      pickupWindowEnd: pkg.pickupWindowEnd,
      closingDate: pkg.closingDate,
      status: pkg.status,
      participants,
      clothingItems,
    };
  }

  create(dto: CreateWeddingPackageDto) {
    return this.prisma.atomic(async (tx) => {
      const pkg = await tx.weddingPackage.create({
        data: {
          contractNumber: dto.contractNumber,
          brideName: dto.brideName,
          groomName: dto.groomName,
          eventDate: new Date(dto.eventDate),
          pickupWindowStart: new Date(dto.pickupWindowStart),
          pickupWindowEnd: new Date(dto.pickupWindowEnd),
          closingDate: new Date(dto.closingDate),
        },
      });

      for (const participant of dto.participants) {
        await tx.transaction.update({
          where: { id: participant.transactionId },
          data: {
            weddingPackageId: pkg.id,
            relationship: participant.relationship,
          },
        });
      }

      return pkg;
    });
  }
}