import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    type_name: string;
}
