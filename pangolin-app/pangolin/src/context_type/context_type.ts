import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContextType {

    @PrimaryGeneratedColumn()
    context_type_id: number;
    
    @Column()
    context_name: string;

    @Column()
    type_id: number;
}
