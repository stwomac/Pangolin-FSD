import { ContextType } from '../context_type/context-type'
import { Reports } from '../reports/reports'

export class Type {
  constructor(
    type_id: number,
    type_name: string,
    reports: Reports[] = [],
    contextTypes: ContextType[] = [],
  ) {
    this.type_id = type_id
    this.type_name = type_name
    this.reports = reports
    this.contextTypes = contextTypes
  }

  type_id: number
  type_name: string
  reports: Reports[]
  contextTypes: ContextType[]
}
