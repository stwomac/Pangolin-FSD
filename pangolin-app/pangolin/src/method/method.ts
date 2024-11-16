import { Reports } from "src/reports/reports";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Method {
    @PrimaryGeneratedColumn()
    @OneToMany(() => Reports, (reports) => reports.payment_method)
    method_id: number;

    @Column()
    method_name: string;
}
