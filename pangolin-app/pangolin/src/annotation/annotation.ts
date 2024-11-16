import { Reports } from "src/reports/reports";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";

@Entity()
export class Annotation {
    @PrimaryGeneratedColumn()
    annotation_id: number;

    @Column()
    annotation: string;

    @OneToMany(() => Reports, (reports) => reports.report_id)
    report_id: number;
}
