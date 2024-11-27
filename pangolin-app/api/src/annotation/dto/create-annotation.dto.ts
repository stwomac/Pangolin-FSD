import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateAnnotationDto {
  @IsNotEmpty()
  @IsString()
  annotation: string
  @IsNumber()
  reportId: number
}
