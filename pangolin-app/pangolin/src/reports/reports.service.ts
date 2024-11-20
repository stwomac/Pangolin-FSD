import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Reports } from './reports';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Reports) private readonly reportsRepository: Repository<Reports>) {}

    // get All
    async getAllReports(): Promise<Reports[]> {
        return await this.reportsRepository.find({
            relations: {
                reportee: true,
                type: true,
                paymentMethod: true,
                annotations: true,
                contexts: true,
            },
        });
    }

    // Get by ID
    async getReportById(report_id: number): Promise<Reports> {
        return await this.reportsRepository.findOne({
            where: { report_id },
            relations: {
                reportee: true,
                type: true,
                paymentMethod: true,
                annotations: true,
                contexts: true,
            },
        });
    }

    //create a new report
    async createReport(newReport: Reports): Promise<Reports> {
        await this.reportsRepository.exists({
            where: {
                report_id: newReport.report_id
            }
        }).then(exists => {
            if(exists)
                throw new HttpException(`Report with ID ${newReport.report_id} already exists!`, HttpStatus.BAD_REQUEST)
        })

        return await this.reportsRepository.save(newReport)
    }

    // update one
    async updateReport(routeId: number, reportToUpdate: Reports) {
        // checking if the route ID and the one in the body match
        if (routeId != reportToUpdate.report_id) {
            throw new HttpException(`Route ID and Body ID do not match!`, HttpStatus.BAD_REQUEST);
        }

        // checking that the Report we want to update exists in the database already
        // if it doesn't we'd create a new one, which we don't want
        await this.reportsRepository.exists({
            where: {
                report_id: reportToUpdate.report_id
            }
        }).then(exists => {
            if (!exists)
                throw new HttpException(`Report with ID ${reportToUpdate.report_id} does not exist!`, HttpStatus.NOT_FOUND);
        })

        return await this.reportsRepository.save(reportToUpdate);
    }

    // Delete a report
    async deleteReport(report_id: number): Promise<DeleteResult> {
        return await this.reportsRepository.delete(report_id);
    }
}
