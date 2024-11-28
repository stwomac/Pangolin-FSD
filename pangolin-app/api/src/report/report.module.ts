import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from './report'
import { ContextTypeModule } from 'src/context-type/context-type.module'
import { ContextTypeService } from 'src/context-type/context-type.service'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Report]), ContextTypeModule, UserModule],
  exports: [TypeOrmModule, ReportService, ContextTypeService, UserService],
  controllers: [ReportController],
  providers: [ReportService, ContextTypeService, UserService],
})
export class ReportModule {}
