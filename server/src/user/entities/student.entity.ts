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
import { StudentEduType } from '../enums/student-edu-type.enum';
import { EnrollmentEntity } from '../../course/entities/enrollment.entity';

@Entity('students')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity, (user) => user.student, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToMany(() => CourseEntity, (course) => course.students, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    courses: CourseEntity[];

    @OneToMany(() => SubmissionEntity, (sub) => sub.student, {
        cascade: true,
    })
    submissions: SubmissionEntity[];

    @OneToMany(() => EnrollmentEntity, (enr) => enr.student, {
        cascade: true,
    })
    enrollments: EnrollmentEntity[];

    @Column({ type: 'enum', enum: StudentEduType })
    edu_type: StudentEduType;

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
