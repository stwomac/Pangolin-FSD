import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { MethodService } from './method.service';
import { Method } from './method';

@Controller('method')
export class MethodController {
  constructor(private readonly methodService: MethodService) {}

  // //get all
  @Get()
  @HttpCode(200)
  getAllContextTypes(): Promise<Method[]> {
    return this.methodService.getAllMethods();
  }

  // get by ID
  @Get(':id')
  @HttpCode(200)
  getCourseById(@Param('id') idToFind: number): Promise<Method> {
      return this.methodService.getMethodById(idToFind);
  }
}
