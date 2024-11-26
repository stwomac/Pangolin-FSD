import { Annotation } from './annotation'
import { Context } from './context'
import { Users } from './users'
import { ReportType } from './context-type'

export enum PaymentMethod {
  CASH = 'CASH',
  CHECK = 'CHECK',
  BITCOIN = 'BITCOIN',
  EFT = 'EFT',
}

export class Reports {
  constructor(
    public reportId: number,
    public reportee: Users,
    public reportType: ReportType,
    public description: string,
    public paid: boolean,
    public amount: string = '0',
    public paymentMethod: PaymentMethod,
    public recentDate: Date,
    public initialDate: Date,
    public isSus: boolean = false,
    public isDone: boolean = false,
    public annotations: Annotation[] = [],
    public contexts: Context[] = [],
  ) {}
}

export{Users, ReportType}