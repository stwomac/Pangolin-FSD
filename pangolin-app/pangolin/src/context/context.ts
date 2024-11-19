import { ContextType } from "src/context_type/context_type";
import { Reports } from "src/reports/reports";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Context {
    @PrimaryGeneratedColumn()
    context_id: number;

    @ManyToOne(() => ContextType, (contextType) => contextType.contexts)
    context_type: ContextType;

    @Column()
    org_claim: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    street_address: string;

    @Column()
    city: string;

    @Column()
    zip: string;

    @Column()
    country: string;

    @Column()
    phone: string;
    
    @ManyToOne(() => Reports, (reports) => reports.contexts)
    report: Reports; 
}

