import { Reports } from 'src/reports/reports'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number

  @Column()
  email: string

  @Column()
  passHash: string

  @Column()
  salt: string

  @Column()
  role: string

  @OneToMany(() => Reports, (reports) => reports.reportee)
  reports: Reports[]
}
