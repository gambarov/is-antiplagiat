import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import { StudentEntity } from './student.entity';
import { SupervisorEntity } from './supervisor.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column({ default: '', length: 256, type: 'varchar', unique: true })
    refresh_token: string;

    @Column({ default: '' })
    surname: string;

    @Column({ default: '' })
    name: string;

    @Column({ default: '' })
    patronymic: string;

    @OneToOne(() => StudentEntity, (student) => student.user, {
        nullable: true,
    })
    student: StudentEntity;

    @OneToOne(() => SupervisorEntity, { nullable: true })
    supervisor: SupervisorEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    saltOrRounds: string | number = 1;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, this.saltOrRounds);
    }
}
