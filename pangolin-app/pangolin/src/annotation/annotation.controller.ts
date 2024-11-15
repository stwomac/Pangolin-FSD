import { Controller } from '@nestjs/common';
import { AnnotationService } from './annotation.service';

@Controller('annotation')
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) {}
}
