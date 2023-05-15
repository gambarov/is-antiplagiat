import { CourseEntity } from '../../course/entities/course.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { SubmissionEntity } from '../../submission/entities/submission.entity';

@Entity('assignments')
export class AssignmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CourseEntity, (course) => course.assignments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity;

    @OneToMany(() => SubmissionEntity, (sub) => sub.assignment, {
        cascade: true,
    })
    submissions: SubmissionEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
