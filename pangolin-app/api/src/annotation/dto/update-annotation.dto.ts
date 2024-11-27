import { PartialType, OmitType } from '@nestjs/mapped-types'
import { CreateAnnotationDto } from './create-annotation.dto'

export class UpdateAnnotationDto extends PartialType(
  OmitType(CreateAnnotationDto, ['reportId']),
) {}
