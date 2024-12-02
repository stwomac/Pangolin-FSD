import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common'
import { AnnotationService } from './annotation.service'
import { Annotation } from './annotation'
import { CreateAnnotationDto } from './dto/create-annotation.dto'
import { UpdateAnnotationDto } from './dto/update-annotation.dto'

@Controller('annotations')
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) {}

  @Post()
  @HttpCode(201)
  createAnnotation(
    @Body() newAnnotation: CreateAnnotationDto,
  ): Promise<Annotation> {
    return this.annotationService.createAnnotation(newAnnotation)
  }

  @Put()
  async updateAnnotation(
    @Body() annotationToUpdate: UpdateAnnotationDto,
  ): Promise<Annotation> {
    return await this.annotationService.update(annotationToUpdate)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAnnotation(@Param('id') id: number): Promise<void> {
    const annotation = await this.annotationService.get(id)
    await this.annotationService.delete(annotation)
  }
}
