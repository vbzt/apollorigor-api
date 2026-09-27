import {
  IsArray,
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Relationship } from '../../../generated/prisma/enums.js';

class ParticipantAssignmentDto {
  @IsUUID()
  transactionId: string;

  @IsEnum(Relationship)
  relationship: Relationship;
}

export class CreateWeddingPackageDto {
  @IsString()
  @MaxLength(50)
  contractNumber: string;

  @IsString()
  @MaxLength(200)
  brideName: string;

  @IsString()
  @MaxLength(200)
  groomName: string;

  @IsString()
  eventDate: string;

  @IsString()
  pickupWindowStart: string;

  @IsString()
  pickupWindowEnd: string;

  @IsString()
  closingDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantAssignmentDto)
  participants: ParticipantAssignmentDto[];
}