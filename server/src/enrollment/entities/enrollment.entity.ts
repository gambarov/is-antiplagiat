import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CourseEntity } from '../../course/entities/course.entity';
import { StudentEntity } from '../../user/entities/student.entity';

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

    @Column({ nullable: false })
    student_id: number;

    @ManyToOne(() => CourseEntity, (course) => course.enrollments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity;

    @Column({ nullable: false })
    course_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
