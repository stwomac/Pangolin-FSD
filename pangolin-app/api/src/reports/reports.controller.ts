import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common'
import { ReportsService } from './reports.service'
import { Reports } from './reports'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getAll(): Promise<Reports[]> {
    return this.reportsService.getAll()
  }

  @Get(':id')
  getReportById(@Param('id') id: number): Promise<Reports> {
    return this.reportsService.get(id)
  }

  @Post()
  @HttpCode(201)
  createReport(@Body() newReport: Reports) {
    return this.reportsService.create(newReport)
  }

  @Put(':id')
  async updateReport(@Param('id') id: number, @Body() reportToUpdate) {
    const report = await this.reportsService.get(id)
    return await this.reportsService.update(report, reportToUpdate)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteReport(@Param('id') id: number): Promise<Reports> {
    const report = await this.reportsService.get(id)
    return await this.reportsService.delete(report)
  }
}
