import { ContextType } from "src/context_type/context_type";
import { Reports } from "src/reports/reports";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    type_name: string;

    @OneToMany(() => Reports, (reports) => reports.type)
    reports: Reports[];

    @OneToMany(() => ContextType, (contextType) => contextType.type)
    contextTypes: ContextType[];
}
