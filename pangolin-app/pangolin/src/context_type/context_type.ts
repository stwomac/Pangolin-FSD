import { Context } from "src/context/context";
import { Type } from "src/type/type";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContextType {
    @PrimaryGeneratedColumn()
    context_type_id: number;

    @Column()
    context_name: string;

    @OneToMany(() => Context, (context) => context.context_type)
    contexts: Context[];

    @ManyToOne(() => Type, (type) => type.type_id)
    type: Type;
}
