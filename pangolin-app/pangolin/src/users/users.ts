import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    email: string;

    @Column()
    pass_hash: string;

    @Column()
    salt: string;

    @Column()
    role: string;
}
