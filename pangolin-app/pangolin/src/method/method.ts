import { Reports } from 'src/reports/reports'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Method {
  @PrimaryGeneratedColumn()
  method_id: number

  @Column()
  method_name: string

  @OneToMany(() => Reports, (reports) => reports.paymentMethod)
  reports: Reports[]
}
