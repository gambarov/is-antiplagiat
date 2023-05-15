import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad,
} from 'typeorm';
import { StudentEntity } from './student.entity';
import { SupervisorEntity } from './supervisor.entity';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';
import { UserType } from '../enums/user-type.enum';

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

    @Column({ type: 'enum', enum: UserType })
    type: UserType;

    @OneToOne(() => StudentEntity, (student) => student.user, {
        nullable: true,
        cascade: true,
    })
    student: StudentEntity;

    @OneToOne(() => SupervisorEntity, (supervisor) => supervisor.user, {
        nullable: true,
        cascade: true,
    })
    supervisor: SupervisorEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    private loadedPassword: string;

    @AfterLoad()
    private loadPassword(): void {
        this.loadedPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword(): Promise<void> {
        if (this.loadedPassword != this.password) {
            this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        }
    }
}
