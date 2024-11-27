import { Report } from 'src/report/report'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'person' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column()
  email: string

  @Column()
  passHash: string

  @Column()
  role: string

  @OneToMany(() => Report, (reports) => reports.reportee)
  reports: Report[]
}
