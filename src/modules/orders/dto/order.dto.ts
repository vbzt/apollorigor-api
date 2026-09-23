import {
  IsEnum,
  ValidateIf,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  Matches,
} from 'class-validator';
import { OperationType } from '../../../generated/prisma/enums.js';
export class CreateOrderDto {
  @IsUUID() variantId: string;
  @IsEnum(OperationType) type: OperationType;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  startDate?: string;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  endDate?: string;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
export class RejectOrderDto {
  @IsString() @Length(3, 1000) @Matches(/\S/) reason: string;
}
