import { Context } from "src/context/context";
import { Type } from "src/type/type";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContextType {
    @OneToMany(() => Context, (context) => context.context_type)
    @PrimaryGeneratedColumn()
    context_type_id: number;
    
    @Column()
    context_name: string;

    @ManyToOne(() => Type, (type) => type.type_id)
    @Column()
    type_id: number;
}
