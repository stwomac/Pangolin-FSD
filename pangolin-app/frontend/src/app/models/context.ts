import { Deserializable } from './utils/serializable'
import { Report, ApiReportModel } from './report'
import { ContextType } from './context-type'

export interface ApiContextModel {
  contextId: number
  contextTypeId: number
  report: ApiReportModel
  orgClaim?: string
  firstName?: string
  lastName?: string
  streetAddress?: string
  city?: string
  zip?: string
  country?: string
  phone?: string
}

export interface ContextLike
  extends Omit<ApiContextModel, 'report' | 'contextId'> {
  contextId?: ApiContextModel['contextId']
  report: Report
}

@Deserializable<Context, ContextLike, ApiContextModel>()
export class Context implements ContextLike {
  public readonly contextId?: number
  public contextTypeId: number
  public report: Report
  public orgClaim?: string
  public firstName?: string
  public lastName?: string
  public streetAddress?: string
  public city?: string
  public zip?: string
  public country?: string
  public phone?: string


  constructor(data: ContextLike | ApiContextModel) {
    this.contextId = data.contextId
    this.contextTypeId = data.contextTypeId
    this.report =
      data.report instanceof Report ? data.report : new Report(data.report)
    this.orgClaim = data.orgClaim
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.streetAddress = data.streetAddress
    this.city = data.city
    this.zip = data.zip
    this.country = data.country
    this.phone = data.phone
  }
}
