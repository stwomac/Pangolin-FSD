import { Module } from '@nestjs/common'
import { ContextService } from './context.service'
import { ContextController } from './context.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Context } from './context'
import { ReportModule } from 'src/report/report.module'
import { ReportService } from 'src/report/report.service'
import { ContextTypeModule } from 'src/context-type/context-type.module'
import { ContextTypeService } from 'src/context-type/context-type.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Context]),
    ReportModule,
    ContextTypeModule,
  ],
  exports: [TypeOrmModule, ContextService, ContextTypeService, ReportService],
  controllers: [ContextController],
  providers: [ContextService, ReportService, ContextTypeService],
})
export class ContextModule {}
