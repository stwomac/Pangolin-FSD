import { Module } from '@nestjs/common'
import { ContextTypeService } from './context_type.service'
import { ContextTypeController } from './context_type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContextType } from './context_type'

@Module({
  imports: [TypeOrmModule.forFeature([ContextType])],
  exports: [TypeOrmModule],
  controllers: [ContextTypeController],
  providers: [ContextTypeService],
})
export class ContextTypeModule {}
