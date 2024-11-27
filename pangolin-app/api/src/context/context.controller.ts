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
    @Param('id') id: number,
    @Body() contextToUpdate: Context,
  ) {
    const context = await this.contextService.get(id)
    return await this.contextService.update(context, contextToUpdate)
  }

  @Post()
  @HttpCode(201)
  createContext(@Body() newContext: Context) {
    return this.contextService.create(newContext)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteContext(@Param('id') id: number): Promise<Context> {
    const context = await this.contextService.get(id)
    return await this.contextService.delete(context)
  }
}
