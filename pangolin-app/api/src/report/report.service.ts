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
import { AnnotationService } from 'src/annotation/annotation.service'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly repo: Repository<Report>,
    private readonly contextTypeService: ContextTypeService,
    private readonly userService: UserService,
    private readonly annotationService: AnnotationService,
    private readonly httpService: HttpService,
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
    return report
  }

  async create({
    reporteeId,
    contexts: createConextsData,
    ...reportData
  }: CreateReportDto): Promise<Report> {
    // this is trash code - very sorry
    const [reportee, ...contexts] = await Promise.all([
      reporteeId === undefined
        ? undefined
        : this.userService.getById(reporteeId),
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
    const report = await this.get(reportId)

    if (updateData.annotations) {
      //delete any annotations that are not there
      for (let annotation of report.annotations) {
        if (
          !updateData.annotations.some(
            (e) => e.annotationId === annotation.annotationId,
          )
        ) {
          await this.annotationService.delete(annotation)
        }
      }

      //create or update annotations that are in the array
      for (let annotation of updateData.annotations) {
        annotation.reportId = reportId

        if (annotation.annotationId) {
          console.log('update:')
          console.log(annotation)
          await this.annotationService.update(annotation)
        } else {
          console.log('create:')
          console.log(annotation)
          await this.annotationService.createAnnotation(annotation)
        }
      }
    }

    const updatedReport = this.repo.merge(report, updateData)
    // console.log(updatedReport);
    // //theres no need to update the annotations twice
    // report.annotations = [];
    // updatedReport.annotations.map( (annotation) => { annotation.report = report; return annotation;});
    // console.log('postmap');
    // console.log(updatedReport);
    // Location for API Gateway Call. (do not await)
    if (updatedReport.isSus) {
      console.log('sent steven an email, be-ah cleer iz inbOx')
      const sentReport = this.httpService.axiosRef.put(
        process.env.API_INVOKE,
        JSON.stringify(updatedReport),
      )
    }
    console.log('Pre-Save')
    console.log(updatedReport)

    const { annotations, ...reportData } = updatedReport

    return await this.repo.save(reportData)
  }

  async delete(report: Report): Promise<Report> {
    return await this.repo.remove(report)
  }
}
