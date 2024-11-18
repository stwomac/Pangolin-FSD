import { Annotation } from "src/annotation/annotation";
import { Context } from "src/context/context";
import { Method } from "src/method/method";
import { Users } from "src/users/users";
import { Type } from "src/type/type";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reports {
    @PrimaryGeneratedColumn()
    report_id: number;

    @ManyToOne(() => Users, (user) => user.reports)
    reportee: Users; // Relation to the user who reported

    @ManyToOne(() => Type, (type) => type.reports)
    type: Type; // Relation to Type entity

    @Column()
    description: string;

    @Column()
    paid: boolean;

    @Column({ type: "money" }) // Assuming "amount" is a monetary value
    amount: string;

    @ManyToOne(() => Method, (method) => method.reports)
    paymentMethod: Method; // Relation to payment method

    @Column({ type: "date" })
    recent_date: Date;

    @Column({ type: "date" })
    initial_date: Date;

    @Column()
    is_sus: boolean;

    @Column()
    is_done: boolean;

    @OneToMany(() => Annotation, (annotation) => annotation.report)
    annotations: Annotation[]; // Relation to annotations

    @OneToMany(() => Context, (context) => context.context_id)
    contexts: Context[]; // Relation to contexts
}
