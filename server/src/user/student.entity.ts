import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AssignmentProgressEntity } from 'src/assignment/assignment-progress.entity';

@Entity('students')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => AssignmentProgressEntity, (progress) => progress.student)
    progresses: AssignmentProgressEntity[];

    @Column()
    ExternalUserID: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
