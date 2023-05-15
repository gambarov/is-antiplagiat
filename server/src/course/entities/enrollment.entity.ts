import { StudentEntity } from 'src/user/entities/student.entity';
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('enrollments')
export class EnrollmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StudentEntity, (student) => student.enrollments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;

    @ManyToOne(() => CourseEntity, (course) => course.enrollments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
