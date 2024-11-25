import { Annotation } from 'src/annotation/annotation'
import { ReportType } from '../context_type/context_type'
import { Context } from '../context/context'
import { Method } from 'src/method/method'
import { Users } from 'src/users/users'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Reports {
  @PrimaryGeneratedColumn()
  report_id: number

  @ManyToOne(() => Users, (user) => user.reports)
  @JoinColumn({ name: 'reportee_id' })
  reportee: Users // Relation to the user who reported

  @Column({
    name: 'report_type',
    type: 'enum',
    enum: ReportType,
  })
  report_type: ReportType

  @Column()
  description: string

  @Column()
  paid: boolean

  @Column() // Assuming "amount" is a monetary value
  amount: string

  @ManyToOne(() => Method, (method) => method.reports)
  @JoinColumn({ name: 'payment_method' })
  paymentMethod: Method // Relation to payment method

  @Column({ type: 'date' })
  recent_date: Date

  @Column({ type: 'date' })
  initial_date: Date

  @Column()
  is_sus: boolean

  @Column()
  is_done: boolean

  @OneToMany(() => Annotation, (annotation) => annotation.report)
  annotations: Annotation[] // Relation to annotations

  @OneToMany(() => Context, (context) => context.report)
  contexts: Context[] // Relation to contexts
}
