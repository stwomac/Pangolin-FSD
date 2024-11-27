import { Serializable } from './utils/serializable'
import { Report } from './report'
import { ContextType } from './context-type'

export interface ContextLike {
  contextId: number
  contextType: ContextType
  report: Report
  orgClaim?: string
  firstName?: string
  lastName?: string
  streetAddress?: string
  city?: string
  zip?: string
  country?: string
  phone?: string
}

export class Context
  extends Serializable<ContextLike>
  implements Omit<ContextLike, 'contextId'>
{
  public contextType: ContextType
  public report: Report
  public orgClaim?: string
  public firstName?: string
  public lastName?: string
  public streetAddress?: string
  public city?: string
  public zip?: string
  public country?: string
  public phone?: string

  constructor(data: ContextLike) {
    super(data.contextId)
    this.contextType = data.contextType
    this.report = data.report
    this.orgClaim = data.orgClaim
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.streetAddress = data.streetAddress
    this.city = data.city
    this.zip = data.zip
    this.country = data.country
    this.phone = data.phone
  }

  public override toJson(): ContextLike {
    const { id, ...contextLike } = this
    return { ...contextLike, contextId: id }
  }
}
