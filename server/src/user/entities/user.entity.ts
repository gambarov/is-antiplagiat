import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { StudentEntity } from './student.entity';
import { SupervisorEntity } from './supervisor.entity';

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

    @OneToOne(() => StudentEntity, { nullable: true })
    student: StudentEntity;

    @OneToOne(() => SupervisorEntity, { nullable: true })
    supervisor: SupervisorEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
