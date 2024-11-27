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
import { ReportService } from './report.service'
import { Report } from './report'

@Controller('reports')
export class ReportController {
  constructor(private readonly reportsService: ReportService) {}

  @Get()
  getAll(): Promise<Report[]> {
    return this.reportsService.getAll()
  }

  @Get(':id')
  getReportById(@Param('id') id: number): Promise<Report> {
    return this.reportsService.get(id)
  }

  @Post()
  @HttpCode(201)
  createReport(@Body() newReport: Report) {
    return this.reportsService.create(newReport)
  }

  @Put(':id')
  async updateReport(@Param('id') id: number, @Body() reportToUpdate: Report) {
    const report = await this.reportsService.get(id)
    return await this.reportsService.update(report, reportToUpdate)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteReport(@Param('id') id: number): Promise<Report> {
    const report = await this.reportsService.get(id)
    return await this.reportsService.delete(report)
  }
}
