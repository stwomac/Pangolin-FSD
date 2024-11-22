import { ContextType } from "src/context_type/context_type";
import { Reports } from "src/reports/reports";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Context {
    @PrimaryGeneratedColumn()
    context_id: number;

    @ManyToOne(() => ContextType, (contextType) => contextType.contexts)
    @JoinColumn({name: "context_type"})
    context_type: ContextType;

    @Column({ nullable: true })
    org_claim: string;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    street_address: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    zip: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    phone: string;
    
    @ManyToOne(() => Reports, (reports) => reports.contexts)
    @JoinColumn({name: "report_id"})
    report: Reports; 
}

