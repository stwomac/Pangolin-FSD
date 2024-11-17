import { Module } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationController } from './annotation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annotation } from './annotation';

@Module({
  imports: [TypeOrmModule.forFeature([Annotation])],
  exports: [TypeOrmModule],
  controllers: [AnnotationController],
  providers: [AnnotationService],
})
export class AnnotationModule {}
