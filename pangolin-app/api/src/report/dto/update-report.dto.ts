import { PartialType, OmitType } from '@nestjs/mapped-types'
import { CreateReportDto } from './create-report.dto'
import { IsNumber, IsOptional } from 'class-validator'
import { Annotation } from 'src/annotation/annotation'

export class UpdateReportDto extends PartialType(
  OmitType(PartialType(CreateReportDto), ['contexts'] as const),
) {
  @IsNumber()
  reportId: number

  @IsOptional()
  annotations?: Array<Annotation>
}
