import {
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNotEmpty,
  IsBoolean,
  IsCurrency,
  IsArray,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { OmitType } from '@nestjs/mapped-types'
import { PaymentMethod } from '../report'
import { ReportType } from 'src/context-type/context-type'
import { CreateContextDto } from 'src/context/dto/create-context.dto'

type CreateHeadlessContextDto = Omit<CreateContextDto, 'reportId'>
const CreateHeadlessContextDto = OmitType(CreateContextDto, [
  'reportId',
] as const)

export class CreateReportDto {
  @IsNumber()
  @IsOptional()
  reporteeId?: number

  @IsEnum(ReportType)
  reportType: ReportType

  @IsString()
  @IsNotEmpty()
  description: string

  @IsBoolean()
  paid: boolean

  @IsCurrency()
  amount: string

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod

  @IsDateString()
  recentDate: Date

  @IsDateString()
  initialDate: Date

  @IsBoolean()
  isSus: boolean

  @IsBoolean()
  isDone: boolean = false

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHeadlessContextDto)
  contexts?: CreateHeadlessContextDto[]
}
