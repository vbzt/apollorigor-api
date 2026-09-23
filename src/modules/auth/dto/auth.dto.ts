import {
  IsEmail,
  IsString,
  ValidateIf,
  Length,
  MaxLength,
  Matches,
} from 'class-validator';
export class LoginDto {
  @IsEmail() @MaxLength(254) email: string;
  @IsString() @Length(8, 128) password: string;
}
export class RegisterDto extends LoginDto {
  @IsString() @Length(2, 100) @Matches(/\S/) name: string;
}
export class RefreshDto {
  @IsString() @Length(1, 4096) refreshToken: string;
}
export class RecoverDto {
  @IsEmail() @MaxLength(254) email: string;
}
export class ResetPasswordDto {
  @IsString() @Length(8, 128) password: string;
}
export class UpdateProfileDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @Length(2, 100)
  @Matches(/\S/)
  name?: string;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @Length(8, 25)
  phone?: string;
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @Matches(/^(\d{11}|\d{14})$/)
  document?: string;
}
