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
import { CreateReportDto } from './dto/create-report.dto'
import { UpdateReportDto } from './dto/update-report.dto'

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
  createReport(@Body() createReportData: CreateReportDto) {
    console.log(createReportData);
    return this.reportsService.create(createReportData)
  }

  @Put()
  async updateReport(@Body() reportToUpdate: UpdateReportDto) {
    return await this.reportsService.update(reportToUpdate)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteReport(@Param('id') id: number): Promise<void> {
    const report = await this.reportsService.get(id)
    await this.reportsService.delete(report)
  }
}
