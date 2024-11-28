import { Module } from '@nestjs/common'
import { ContextTypeService } from './context-type.service'
import { ContextTypeController } from './context-type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContextType } from './context-type'

@Module({
  imports: [TypeOrmModule.forFeature([ContextType])],
  exports: [TypeOrmModule, ContextTypeService],
  controllers: [ContextTypeController],
  providers: [ContextTypeService],
})
export class ContextTypeModule {}
