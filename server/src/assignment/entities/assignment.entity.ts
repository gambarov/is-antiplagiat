import { CourseEntity } from 'src/course/entities/course.entity';
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
import { SubmissionEntity } from 'src/submission/entities/submission.entity';

@Entity('assignments')
export class AssignmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    topic: string;

    @ManyToOne(() => CourseEntity, (course) => course.assignments, {
        cascade: true,
    })
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity;

    @OneToMany(() => SubmissionEntity, (sub) => sub.assignment)
    submissions: SubmissionEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
