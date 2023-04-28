import { CourseEntity } from 'src/course/course.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
