import { Reports } from 'src/reports/reports'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column()
  email: string

  @Column()
  pass_hash: string

  @Column()
  role: string

  @OneToMany(() => Reports, (reports) => reports.reportee)
  reports: Reports[]
}
