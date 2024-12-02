import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator'

export class CreateContextDto {
  @IsNumber()
  reportId: number

  @IsNumber()
  contextTypeId: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  orgClaim?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  streetAddress?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string

  @IsOptional()
  @IsPostalCode()
  zip?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  country?: string

  @IsOptional()
  @IsPhoneNumber()
  phone?: string
}
