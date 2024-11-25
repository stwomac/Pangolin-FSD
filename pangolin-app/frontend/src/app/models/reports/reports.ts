import { Annotation } from '../annotation/annotation'
import { Context } from '../context/context'
import { Users } from '../users/users'
import { ReportType } from '../context_type/context-type'

export enum PaymentMethod {
  CASH = 'CASH',
  CHECK = 'CHECK',
  BITCOIN = 'BITCOIN',
  EFT = 'EFT',
}

export class Reports {
  constructor(
    public report_id: number,
    public reportee: Users,
    public report_type: ReportType,
    public description: string,
    public paid: boolean,
    public amount: string = '0',
    public paymentMethod: PaymentMethod,
    public recent_date: Date,
    public initial_date: Date,
    public is_sus: boolean = false,
    public is_done: boolean = false,
    public annotations: Annotation[] = [],
    public contexts: Context[] = [],
  ) {}
}
