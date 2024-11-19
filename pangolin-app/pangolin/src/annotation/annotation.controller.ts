// import { Controller } from '@nestjs/common';
// import { AnnotationService } from './annotation.service';

// @Controller('annotation')
// export class AnnotationController {
//   constructor(private readonly annotationService: AnnotationService) {}
// }

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AnnotationService } from './annotation.service';

@Controller('annotations')
export class AnnotationController {
    constructor(private readonly annotationService: AnnotationService) {}

    @Get('report/:reportId')
    getAllAnnotationsByReportId(@Param('reportId') reportId: number) {
        return this.annotationService.getAllAnnotationsByReportId(reportId);
    }

    @Post()
    createAnnotation(@Body() body: { content: string; reportId: number }) {
        return this.annotationService.createAnnotation(body.content, body.reportId);
    }

    @Put(':id')
    updateAnnotation(@Param('id') id: number, @Body() body: { content: string }) {
        return this.annotationService.updateAnnotation(id, body.content);
    }

    @Delete(':id')
    deleteAnnotation(@Param('id') id: number) {
        return this.annotationService.deleteAnnotation(id);
    }
}