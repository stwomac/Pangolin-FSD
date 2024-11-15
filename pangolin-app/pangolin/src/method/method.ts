import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Method {
    @PrimaryGeneratedColumn()
    method_id: number;

    @Column()
    method_name: string;
}
