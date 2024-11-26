import { Module } from '@nestjs/common'
import { AnnotationService } from './annotation.service'
import { AnnotationController } from './annotation.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Annotation } from './annotation'
import { ReportsModule } from '../reports/reports.module'
import { ReportsService } from 'src/reports/reports.service'

@Module({
  imports: [TypeOrmModule.forFeature([Annotation]), ReportsModule],
  exports: [TypeOrmModule],
  controllers: [AnnotationController],
  providers: [ReportsService,AnnotationService],
})
export class AnnotationModule {}
