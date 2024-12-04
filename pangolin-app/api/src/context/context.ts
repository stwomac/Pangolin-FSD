import { ContextType } from 'src/context-type/context-type'
import { Report } from 'src/report/report'
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
  orgClaim?: string

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ nullable: true })
  streetAddress?: string

  @Column({ nullable: true })
  city?: string

  @Column({ nullable: true })
  zip?: string

  @Column({ nullable: true })
  country?: string

  @Column({ nullable: true })
  phone?: string

  @ManyToOne(() => Report, (reports) => reports.contexts, {
    onDelete: 'CASCADE', // Ensures CASCADE at the database level
  })
  @JoinColumn({ name: 'report_id' })
  report: Report
}
