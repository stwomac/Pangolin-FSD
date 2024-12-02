import { PartialType, OmitType } from '@nestjs/mapped-types'
import { CreateReportDto } from './create-report.dto'
import { IsNumber } from 'class-validator'

export class UpdateReportDto extends PartialType(
  OmitType(PartialType(CreateReportDto), ['contexts'] as const),
) {
  @IsNumber()
  reportId: number
}
