import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from './type';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  //get all
  @Get()
  @HttpCode(200)
  getAllTypes(): Promise<Type[]> {
    return this.typeService.getAllTypes();
  }

  //get by ID
  @Get(':id')
  @HttpCode(200)
  getTypeById(@Param('id') idToFind: number): Promise<Type> {
    return this.typeService.getTypeById(idToFind);
  }
}
