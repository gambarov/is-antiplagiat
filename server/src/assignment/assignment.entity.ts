import { CourseEntity } from 'src/course/course.entity';
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
import { AssignmentProgressEntity } from './assignment-progress.entity';

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

    @OneToMany(
        () => AssignmentProgressEntity,
        (progress) => progress.assignment,
    )
    progresses: AssignmentProgressEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
