import {
    BeforeInsert,
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
import { v4 as uuidv4 } from 'uuid';

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

    @Column({ type: 'varchar', length: '40' })
    ExternalUserID: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // GUID для конкретного пользователя
    @BeforeInsert()
    save() {
        this.ExternalUserID = uuidv4();
    }
}
