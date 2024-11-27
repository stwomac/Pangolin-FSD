import { Reports } from 'src/report/report'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

@Entity()
export class Annotation {
  @PrimaryGeneratedColumn()
  annotationId: number // Primary key for Annotation

  @Column()
  annotation: string // Text content of the annotation

  @ManyToOne(() => Reports, (report) => report.annotations)
  @JoinColumn({ name: 'report_id' })
  report: Reports // Relation to Reports entity
}
