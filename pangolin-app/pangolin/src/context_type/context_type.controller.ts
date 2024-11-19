import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ContextTypeService } from './context_type.service';
import { ContextType } from './context_type'

@Controller('context-type')
export class ContextTypeController {
  constructor(private readonly contextTypeService: ContextTypeService) {}

  // //get all
  @Get()
  @HttpCode(200)
  getAllContextTypes(): Promise<ContextType[]> {
    return this.contextTypeService.getAllContextTypes();
  }

  // get by ID
  @Get(':id')
  @HttpCode(200)
  getCourseById(@Param('id') idToFind: number): Promise<ContextType> {
      return this.contextTypeService.getContextTypeById(idToFind);
  }
}
