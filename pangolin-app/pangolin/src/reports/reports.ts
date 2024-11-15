import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reports {
    @PrimaryGeneratedColumn()
    report_id: number;

    @Column()
    reportee_id: number;

    @Column()
    type: number;

    @Column()
    description: string;

    @Column()
    paid: boolean;

    @Column()
    amount: string;

    @Column()
    payment_method: number;

    @Column()
    recent_date: Date;

    @Column()
    initial_date: Date;

    @Column()
    is_sus: boolean;

    @Column()
    is_done: boolean;
}
