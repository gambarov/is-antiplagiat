import { AnswerEntity } from '../../answer/entites/answer.entity';
import { AssignmentEntity } from '../../assignment/entities/assignment.entity';
import { StudentEntity } from '../../user/entities/student.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

@Entity('submissions')
@Unique(['student', 'assignment'])
export class SubmissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StudentEntity, (student) => student.submissions)
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;

    @ManyToOne(() => AssignmentEntity, (ass) => ass.submissions)
    @JoinColumn({ name: 'assignment_id' })
    assignment: AssignmentEntity;

    @OneToMany(() => AnswerEntity, (answer) => answer.submission, {
        cascade: true,
    })
    answers: AnswerEntity[];

    @Column()
    comment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
