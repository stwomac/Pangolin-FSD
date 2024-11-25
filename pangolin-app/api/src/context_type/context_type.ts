import { Context } from 'src/context/context'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

@Entity()
export class ContextType {
  @PrimaryGeneratedColumn()
  contextTypeId: number

  @Column()
  contextName: string

  @OneToMany(() => Context, (context) => context.contextType)
  contexts: Context[]

  @Column({
    type: 'enum',
    enum: ReportType,
  })
  reportType: ReportType
}
