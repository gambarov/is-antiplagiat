import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SubmissionEntity } from '../../submission/entities/submission.entity';
import { CourseEntity } from '../../course/entities/course.entity';

@Entity('students')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity, (user) => user.student, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToMany(() => CourseEntity, (course) => course.students, {
        cascade: true,
    })
    courses: CourseEntity[];

    @OneToMany(() => SubmissionEntity, (sub) => sub.student)
    submissions: SubmissionEntity[];

    @Column()
    ExternalUserID: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
