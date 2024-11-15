import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Context {
    @PrimaryGeneratedColumn()
    context_id: number;

    @Column()
    context_type: number;

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
}
