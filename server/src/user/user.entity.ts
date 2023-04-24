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

    @Column()
    surname: string;

    @Column()
    name: string;

    @Column()
    patronymic: string;

    @OneToOne(() => StudentEntity)
    student: StudentEntity;

    @OneToOne(() => SupervisorEntity)
    supervisor: SupervisorEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
