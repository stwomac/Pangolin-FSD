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

  @Put()
  async updateContext(@Body() contextUpdate: UpdateContextDto) {
    return await this.contextService.update(contextUpdate)
  }

  @Post()
  @HttpCode(201)
  async createContext(@Body() newContext: CreateContextDto) {
    const { report, ...context } = await this.contextService.create(newContext)
    return context
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteContext(@Param('id') id: number): Promise<void> {
    const context = await this.contextService.get(id)
    await this.contextService.delete(context)
  }
}
