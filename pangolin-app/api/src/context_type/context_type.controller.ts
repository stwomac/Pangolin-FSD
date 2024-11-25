import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ContextTypeService } from './context_type.service'
import { ContextType } from './context_type'

@Controller('context-type')
export class ContextTypeController {
  constructor(private readonly contextTypeService: ContextTypeService) {}

  @Get()
  getAllContextTypes(): Promise<ContextType[]> {
    return this.contextTypeService.getAllContextTypes()
  }
}
