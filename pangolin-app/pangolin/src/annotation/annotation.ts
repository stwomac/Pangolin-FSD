import { Reports } from "src/reports/reports";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Annotation {
    @PrimaryGeneratedColumn()
    annotation_id: number; // Primary key for Annotation

    @Column()
    annotation: string; // Text content of the annotation

    @ManyToOne(() => Reports, (report) => report.annotations)
    @JoinColumn({name: "report_id" })
    report: Reports; // Relation to Reports entity
}
