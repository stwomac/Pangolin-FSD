import { Module } from '@nestjs/common';
import { ContextTypeService } from './context_type.service';
import { ContextTypeController } from './context_type.controller';

@Module({
  controllers: [ContextTypeController],
  providers: [ContextTypeService],
})
export class ContextTypeModule {}
