import { Reports } from "src/reports/reports";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Annotation {
    @PrimaryGeneratedColumn()
    annotation_id: number;

    @Column()
    annotation: string;

    @ManyToMany(() => Reports, (reports) => reports.annotations)
    reports: Reports[];
}
