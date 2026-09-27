import { PackageStatus, Relationship } from '../../../generated/prisma/client.js';

export class ParticipantDto {
  name!: string;
  pickedUp!: boolean;
  waiting!: boolean;
  paid!: boolean;
}

export class ClothingItemDto {
  relationship!: Relationship | null;
  model!: string;
  fabric!: string | null;
  color!: string | null;
  photoUrl!: string | null;
  description!: string | null;
}

export class WeddingPackageSummaryDto {
  contractNumber!: string;
  brideName!: string;
  groomName!: string;
  eventDate!: Date;
  pickupWindowStart!: Date;
  pickupWindowEnd!: Date;
  closingDate!: Date;
  status!: PackageStatus;
  participants!: ParticipantDto[];
  clothingItems!: ClothingItemDto[];
}