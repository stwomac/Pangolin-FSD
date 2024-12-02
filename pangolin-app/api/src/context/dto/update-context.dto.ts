import { IsNumber } from 'class-validator'
import { PartialType, OmitType } from '@nestjs/mapped-types'
import { CreateContextDto } from './create-context.dto'

export class UpdateContextDto extends PartialType(
  OmitType(CreateContextDto, ['reportId']),
) {
  @IsNumber()
  contextId: number
}
