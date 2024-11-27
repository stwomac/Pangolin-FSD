import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ContextService } from './context.service'
import { Context } from './context'
import { CreateContextDto } from './dto/create-context.dto'
import { UpdateContextDto } from './dto/update-context.dto'

@Controller('contexts')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Get()
  getAllContext(): Promise<Context[]> {
    return this.contextService.getAll()
  }

  @Get(':id')
  getContextById(@Param('id') id: number): Promise<Context> {
    return this.contextService.get(id)
  }

  @Put(':id')
  async updateContext(
    // TODO: Delete parameter
    @Param('id') id: number,
    @Body() contextUpdate: UpdateContextDto,
  ) {
    return await this.contextService.update(contextUpdate)
  }

  @Post()
  @HttpCode(201)
  async createContext(@Body() newContext: CreateContextDto) {
    return await this.contextService.create(newContext)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteContext(@Param('id') id: number): Promise<Context> {
    const context = await this.contextService.get(id)
    return await this.contextService.delete(context)
  }
}
