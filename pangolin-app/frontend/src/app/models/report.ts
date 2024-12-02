import { Deserializable } from './utils/serializable'
import { Annotation, ApiAnnotationModel } from './annotation'
import { Context, ApiContextModel } from './context'
import { User, ApiUserModel } from './user'

export interface ApiReportModel {
  reportId: number
  reportee: ApiUserModel | null
  reportType: ReportType
  description: string
  paid: boolean
  amount: string
  paymentMethod: PaymentMethod
  recentDate?: Date
  initialDate?: Date
  isSus: boolean
  isDone: boolean
  annotations: ApiAnnotationModel[]
  contexts: ApiContextModel[]
}

export interface ReportLike
  extends Omit<
    ApiReportModel,
    'reportId' | 'reportee' | 'annotations' | 'contexts'
  > {
  reportId?: number
  reportee: User | null
  reportType: ReportType
  description: string
  paid: boolean
  amount: string
  paymentMethod: PaymentMethod
  recentDate?: Date
  initialDate?: Date
  isSus: boolean
  isDone: boolean
  annotations: Annotation[]
  contexts: Context[]
}

@Deserializable<Report, ReportLike, ApiReportModel>()
export class Report implements ReportLike {
  public readonly reportId?: number
  public reportee: User | null
  public reportType: ReportType
  public description: string
  public paid: boolean
  public amount: string
  public paymentMethod: PaymentMethod
  public recentDate?: Date
  public initialDate?: Date
  public isSus: boolean
  public isDone: boolean
  public annotations: Annotation[]
  public contexts: Context[]

  constructor(data: ReportLike | ApiReportModel) {
    this.reportId = data.reportId
    this.reportee = ( data.reportee === null || data.reportee instanceof User ) ? data.reportee : new User(data.reportee)
    this.reportType = data.reportType
    this.description = data.description
    this.paid = data.paid
    this.amount = data.amount
    this.paymentMethod = data.paymentMethod
    this.recentDate = data.recentDate
    this.initialDate = data.initialDate
    this.isSus = data.isSus
    this.isDone = data.isDone
    this.annotations = data.annotations.map((annotation) =>
      annotation instanceof Annotation
        ? annotation
        : new Annotation(annotation),
    )
    this.contexts = data.contexts.map((context) =>
      {
        //help the context relize that it goes to this report
        //avoid a circular error by copying the data instead of
        //referencing
        context.report = { ...this };
        //this helps prevent circular generation errors, you have this data
        //already in this.contexts, theres no need to populate it again
        context.report.contexts = [];

        return context instanceof Context ? context : new Context(context)
      }
    )
  }
}

export enum PaymentMethod {
  CASH = 'CASH',
  CHECK = 'CHECK',
  BITCOIN = 'BITCOIN',
  EFT = 'EFT',
}

export enum ReportType {
  IMPERSONATOR = 'IMPERSONATOR',
  JOB_OPPORTUNITY = 'JOB_OPPORTUNITY',
  SERVICE_SCAM = 'SERVICE_SCAM',
  HEALTH_SCAM = 'HEALTH_SCAM',
  ANNOYING_CALL = 'ANNOYING_CALL',
  ONLINE_SHOPPING = 'ONLINE_SHOPPING',
  SWEEPSTAKES = 'SWEEPSTAKES',
  AUTO_SALE = 'AUTO_SALE',
  CREDIT_SCAM = 'CREDIT_SCAM',
  OTHER = 'OTHER',
}
