import { ContextType, Controller, Get, HttpCode } from '@nestjs/common';
import { ContextTypeService } from './context_type.service';

@Controller('context-type')
export class ContextTypeController {
  constructor(private readonly contextTypeService: ContextTypeService) {}

  // //get all
  // @Get()
  // @HttpCode(200)
  // getAllContextTypes(): Promise<ContextType[]> {
  //   return this.contextTypeService.getAllContextTypes();
  // }
}
