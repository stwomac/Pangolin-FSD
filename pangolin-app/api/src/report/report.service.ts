import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Report } from './report'
import { ContextTypeService } from 'src/context-type/context-type.service'
import { Context } from 'src/context/context'
import { UserService } from 'src/user/user.service'
import { CreateReportDto } from './dto/create-report.dto'
import { UpdateReportDto } from './dto/update-report.dto'
import {AnnotationService} from 'src/annotation/annotation.service'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly repo: Repository<Report>,
    private readonly contextTypeService: ContextTypeService,
    private readonly userService: UserService,
    private readonly annotationService: AnnotationService
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
    let report = await this.repo.find({
      relations: {
        reportee: true,
        annotations: true,
        contexts: true,
      },
    })
    return report;
  }

  async create({
    reporteeId,
    contexts: createConextsData,
    ...reportData
  }: CreateReportDto): Promise<Report> {
    // this is trash code - very sorry
    const [reportee, ...contexts] = await Promise.all([
      this.userService.getById(reporteeId),
      ...(createConextsData?.map(async (contextData) => {
        const context = new Context()
        context.contextType = await this.contextTypeService.get(
          contextData.contextTypeId,
        )
        context.orgClaim = contextData.orgClaim
        context.firstName = contextData.firstName
        context.lastName = contextData.lastName
        context.streetAddress = contextData.streetAddress
        context.city = contextData.city
        context.zip = contextData.zip
        context.country = contextData.country
        context.phone = contextData.phone
        return context
      }) ?? []),
    ])
    const report = this.repo.create({
      reportee,
      contexts,
      annotations: [],
      ...reportData,
    })
    return await this.repo.save(report)
  }

  async update({ reportId, reporteeId, ...updateData }: UpdateReportDto) {
    const report = await this.get(reportId);

    if (updateData.annotations) {
      for (let annotation of  updateData.annotations) {
         annotation.reportId = reportId;
         console.log(annotation);
         if (annotation.annotationId) {
            await this.annotationService.update(annotation);
         } else {
            await this.annotationService.createAnnotation(annotation);
         }
      }
    }

    //there is no need to update the annotations twice
    report.annotations = [];

    const updatedReport = this.repo.merge(report, updateData)
    return await this.repo.save(updatedReport)
  }

  async delete(report: Report): Promise<Report> {
    return await this.repo.remove(report);
  }
}
