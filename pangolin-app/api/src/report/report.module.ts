import { Module } from '@nestjs/common'
import { ReportsService } from './report.service'
import { ReportsController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reports } from './report'

@Module({
  imports: [TypeOrmModule.forFeature([Reports])],
  exports: [TypeOrmModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
