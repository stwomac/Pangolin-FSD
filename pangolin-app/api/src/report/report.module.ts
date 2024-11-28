import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from './report'

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  exports: [TypeOrmModule, ReportService],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
