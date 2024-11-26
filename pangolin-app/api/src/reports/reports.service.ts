import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { Reports } from './reports'

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private readonly repo: Repository<Reports>,
  ) {}

  async get(reportId: number): Promise<Reports> {
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

  async getAll(): Promise<Reports[]> {
    return await this.repo.find({
      relations: {
        reportee: true,
        annotations: true,
        contexts: true,
      },
    })
  }

  async create(newReport: Reports): Promise<Reports> {
    const report = this.repo.create(newReport)
    return await this.repo.save(report)
  }

  async update(report: Reports, updatedData: Reports) {
    const updatedReport = this.repo.merge(report, updatedData)
    return await this.repo.save(updatedReport)
  }

  async delete(report: Reports): Promise<Reports> {
    return await this.repo.remove(report)
  }
}
