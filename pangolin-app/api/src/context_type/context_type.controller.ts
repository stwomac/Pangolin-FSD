import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ContextTypeService } from './context_type.service'
import { ContextType } from './context_type'

@Controller('context-types')
export class ContextTypeController {
  constructor(private readonly contextTypeService: ContextTypeService) {}

  @Get()
  getAll(): Promise<ContextType[]> {
    return this.contextTypeService.getAll()
  }
}
