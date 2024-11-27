import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { Report } from './report'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly repo: Repository<Report>,
  ) {}

  async get(reportId: number): Promise<Report> {
    const report = await this.repo.findOne({
      where: { reportId },
      relations: {
        reportee: true,
        annotations: true,
        contexts: true,
      },
    })
    if (report == null)
      throw new HttpException(
        `No report with id ${reportId} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return report
  }

  async getAll(): Promise<Report[]> {
    return await this.repo.find({
      relations: {
        reportee: true,
        annotations: true,
        contexts: true,
      },
    })
  }

  async create(newReport: Report): Promise<Report> {
    const report = this.repo.create(newReport)
    return await this.repo.save(report)
  }

  async update(report: Report, updatedData: Report) {
    const updatedReport = this.repo.merge(report, updatedData)
    return await this.repo.save(updatedReport)
  }

  async delete(report: Report): Promise<Report> {
    return await this.repo.remove(report)
  }
}
