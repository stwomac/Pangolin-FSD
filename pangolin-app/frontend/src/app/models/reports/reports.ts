import { Annotation } from '../annotation/annotation'
import { Context } from '../context/context'
import { Method } from '../method/method'
import { Type } from '../type/type'
import { Users } from '../users/users'

export class Reports {
  constructor(
    report_id: number,
    reportee: Users,
    type: Type,
    description: string,
    paid: boolean,
    amount: string = '0',
    paymentMethod: Method,
    recent_date: Date,
    initial_date: Date,
    is_sus: boolean = false,
    is_done: boolean = false,
    annotations: Annotation[] = [],
    contexts: Context[] = [],
  ) {
    this.report_id = report_id
    this.reportee = reportee
    this.type = type
    this.description = description
    this.paid = paid
    this.amount = amount
    this.paymentMethod = paymentMethod
    this.recent_date = recent_date
    this.initial_date = initial_date
    this.is_sus = is_sus
    this.is_done = is_done
    this.annotations = annotations
    this.contexts = contexts
  }
  report_id: number
  reportee: Users
  type: Type
  description: string
  paid: boolean
  amount: string
  paymentMethod: Method
  recent_date: Date
  initial_date: Date
  is_sus: boolean
  is_done: boolean
  annotations: Annotation[]
  contexts: Context[]
}
