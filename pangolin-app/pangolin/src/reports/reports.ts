import { Annotation } from "src/annotation/annotation";
import { Context } from "src/context/context";
import { Method } from "src/method/method";
import { Users } from "src/users/users";
import { Type } from "src/type/type"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reports {
    @PrimaryGeneratedColumn()
    report_id: number;

    @ManyToOne(() => Users, (users) => users.user_id)
    @Column()
    reportee_id: number;

    @ManyToOne(() => Type, (type) => type.type_id)
    @Column()
    type: number;

    @Column()
    description: string;

    @Column()
    paid: boolean;

    @Column()
    amount: string;

    @ManyToOne(() => Method, (method) => method.method_id)
    @Column()
    payment_method: number;

    @Column()
    recent_date: Date;

    @Column()
    initial_date: Date;

    @Column()
    is_sus: boolean;

    @Column()
    is_done: boolean;

    @JoinTable()
    @ManyToMany(() => Annotation, (annotation) => annotation.reports)
    annotations: Annotation[];

    @JoinTable()
    @ManyToMany(() => Context, (context) => context.reports)
    contexts: Context[];
}
