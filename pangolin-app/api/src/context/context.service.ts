import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeepPartial } from 'typeorm'
import { Context } from './context'
import { ReportService } from 'src/report/report.service'
import { ContextTypeService } from 'src/context-type/context-type.service'
import { CreateContextDto } from './dto/create-context.dto'
import { UpdateContextDto } from './dto/update-context.dto'

@Injectable()
export class ContextService {
  constructor(
    @InjectRepository(Context) private repo: Repository<Context>,
    private readonly reportService: ReportService,
    private readonly contextTypeService: ContextTypeService,
  ) {}

  async get(contextId: number, includeReport = true) {
    const context = await this.repo.findOne({
      where: { contextId },
      relations: { contextType: true, report: includeReport },
    })
    if (context == null)
      throw new HttpException(
        `No context with id ${contextId} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return context
  }

  async getAll(): Promise<Context[]> {
    return await this.repo.find({
      relations: { contextType: true },
    })
  }

  async create({
    contextTypeId,
    reportId,
    ...contextData
  }: CreateContextDto): Promise<Context> {
    const [report, contextType] = await Promise.all([
      this.reportService.get(reportId),
      this.contextTypeService.get(contextTypeId),
    ])
    const context = this.repo.create({ report, contextType, ...contextData })
    return await this.repo.save(context)
  }

  async update({ contextId, contextTypeId, ...contextData }: UpdateContextDto) {
    const [context, contextType] = await Promise.all([
      this.get(contextId, false),
      contextTypeId ? this.contextTypeService.get(contextTypeId) : undefined,
    ])
    const updatedContext = this.repo.merge(context, {
      contextType,
      ...contextData,
    })
    return await this.repo.save(updatedContext)
  }

  async delete(context: Context): Promise<Context> {
    return await this.repo.remove(context)
  }
}
