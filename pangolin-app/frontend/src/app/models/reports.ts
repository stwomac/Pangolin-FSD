import { Serializable } from './utils/serializable'
import { Annotation } from './annotation'
import { Context } from './context'
import { User } from './users'

export interface ReportLike {
  reportId: number
  reportee: User
  reportType: ReportType
  description: string
  paid: boolean
  amount: string
  paymentMethod: PaymentMethod
  recentDate?: Date
  initialDate?: Date
  isSus: boolean
  isDone: boolean
  annotations: Annotation
  contexts: Context
}

export class Report
  extends Serializable<ReportLike>
  implements Omit<ReportLike, 'reportId'>
{
  public reportee: User
  public reportType: ReportType
  public description: string
  public paid: boolean
  public amount: string
  public paymentMethod: PaymentMethod
  public recentDate?: Date
  public initialDate?: Date
  public isSus: boolean
  public isDone: boolean
  public annotations: Annotation
  public contexts: Context

  constructor(data: ReportLike) {
    super(data.reportId)
    this.reportee = data.reportee
    this.reportType = data.reportType
    this.description = data.description
    this.paid = data.paid
    this.amount = data.amount
    this.paymentMethod = data.paymentMethod
    this.recentDate = data.recentDate
    this.initialDate = data.initialDate
    this.isSus = data.isSus
    this.isDone = data.isDone
    this.annotations = data.annotations
    this.contexts = data.contexts
  }

  public override toJson(): ReportLike {
    const { id, ...reportLike } = this
    return { ...reportLike, reportId: id }
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

export{User, Annotation, }