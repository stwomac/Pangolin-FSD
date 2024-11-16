import { Reports } from 'src/reports/reports';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
    @OneToMany(() => Reports, (reports) => reports.reportee_id)
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    email: string;

    @Column()
    pass_hash: string;

    @Column()
    salt: string;

    @Column()
    role: string;
}
