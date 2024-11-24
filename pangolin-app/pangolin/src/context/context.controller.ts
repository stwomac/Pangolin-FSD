import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ContextService } from './context.service';
import { DeleteResult } from 'typeorm';
import { Context } from './context';

@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}


    //get all
    @Get()
    @HttpCode(200)
    getAllContext(): Promise<Context[]> {
      return this.contextService.getAllContext();
    }
  
    // get by ID
    @Get(':id')
    @HttpCode(200)
    getContextById(@Param('id') idToFind: number): Promise<Context> {
        return this.contextService.getContextById(idToFind);
    }
  
    @Put(':id')
    @HttpCode(200)
    updateContext(@Param('id') routeId: number, @Body() ContextToUpdate){
      return this.contextService.updateContext(routeId, ContextToUpdate);
    }
  
    @Post()
    @HttpCode(201)
    createContext(@Body() newContext: Context){
      return this.contextService.createContext(newContext);
    }
  
    @Delete(':id')
    @HttpCode(204)
    deleteContext(@Param('id') id: number): Promise<DeleteResult> {
      return this.contextService.deleteContext(id);
    }

}
