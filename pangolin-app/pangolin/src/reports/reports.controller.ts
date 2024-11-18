import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Reports } from './reports';
import { DeleteResult } from 'typeorm';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    // GET /reports - Fetch all reports
    @Get()
    async getAllReports(): Promise<Reports[]> {
        return await this.reportsService.getAllReports();
    }

    // GET /reports/:id
    @Get(':id')
    async getReportById(@Param('id') id: number): Promise<Reports> {
        return await this.reportsService.getReportById(id);
    }

    // POST /reports
  @Post()
  @HttpCode(201)
  createCourse(@Body() newReport: Reports) {
      return this.reportsService.createReport(newReport);
  }

      // Put /reports/:id
  @Put(':id')
  @HttpCode(200)
  updateAdvisor(@Param('id') routeId: number, @Body() reportToUpdate) {
    return this.reportsService.updateReport(routeId, reportToUpdate);
  }
    // DELETE /reports/:id
    @Delete(':id')
    @HttpCode(204)
    async deleteReport(@Param('id') id: number): Promise<DeleteResult> {
        return this.reportsService.deleteReport(id);
    }
}
