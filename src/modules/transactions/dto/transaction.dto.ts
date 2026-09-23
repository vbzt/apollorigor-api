import {
  IsEnum,
  IsInt,
  ValidateIf,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { OperationType } from '../../../generated/prisma/enums.js';
export class CreateTransactionDto {
  @IsUUID() profileId: string;
  @IsUUID() variantId: string;
  @IsEnum(OperationType) type: OperationType;
  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(0)
  @Max(100000000)
  priceCents?: number;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  startDate?: string;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  endDate?: string;
}
export class UpdateTransactionDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsUUID()
  variantId?: string;
  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(0)
  @Max(100000000)
  priceCents?: number;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  startDate?: string;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  endDate?: string;
}
export class ReturnDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @MaxLength(2000)
  damageNotes?: string;
}
