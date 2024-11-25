import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common'
import { AnnotationService } from './annotation.service'
import { Annotation } from './annotation'
import { DeleteResult } from 'typeorm'

@Controller('annotations')
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) {}

  @Get('report/:reportId')
  getAllAnnotationsByReportId(@Param('reportId') reportId: number) {
    return this.annotationService.getAllAnnotationsByReportId(reportId)
  }

  @Post()
  @HttpCode(201)
  createAnnotation(@Body() newAnnotation: Annotation) {
    return this.annotationService.createAnnotation(newAnnotation)
  }

  @Put(':id')
  @HttpCode(200)
  updateAnnotation(@Param('id') routeId: number, @Body() annotationToUpdate) {
    return this.annotationService.updateAnnotation(routeId, annotationToUpdate)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAnnotation(@Param('id') id: number): Promise<DeleteResult> {
    return this.annotationService.deleteAnnotation(id)
  }
}
