import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from './report'
import { ContextTypeModule } from 'src/context-type/context-type.module'
import { ContextTypeService } from 'src/context-type/context-type.service'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { HttpModule } from '@nestjs/axios'
import { AnnotationService } from 'src/annotation/annotation.service'
import { AnnotationModule } from 'src/annotation/annotation.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    ContextTypeModule,
    UserModule,
    AnnotationModule,
    HttpModule,
  ],
  exports: [
    TypeOrmModule,
    ReportService,
    ContextTypeService,
    UserService,
    AnnotationService,
  ],
  providers: [
    ReportService,
    ContextTypeService,
    UserService,
    AnnotationService,
  ],
  controllers: [ReportController],
})
export class ReportModule {}
