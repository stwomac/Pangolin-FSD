import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Annotation {
    @PrimaryGeneratedColumn()
    annotation_id: number;

    @Column()
    annotation: string
}
