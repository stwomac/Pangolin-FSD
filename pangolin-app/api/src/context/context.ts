import { ContextType } from 'src/context_type/context_type'
import { Reports } from 'src/reports/reports'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Context {
  @PrimaryGeneratedColumn()
  contextId: number

  @ManyToOne(() => ContextType, (contextType) => contextType.contexts)
  @JoinColumn({ name: 'context_type' })
  contextType: ContextType

  @Column({ nullable: true })
  orgClaim: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  streetAddress: string

  @Column({ nullable: true })
  city: string

  @Column({ nullable: true })
  zip: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  phone: string

  @ManyToOne(() => Reports, (reports) => reports.contexts)
  @JoinColumn({ name: 'report_id' })
  report: Reports
}
