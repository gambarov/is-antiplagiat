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
import { SubmissionStatus } from '../enums/submission-status.enum';

@Entity('submissions')
@Unique(['student', 'assignment'])
export class SubmissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StudentEntity, (student) => student.submissions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;

    @Column({ nullable: false })
    student_id: number;

    @ManyToOne(() => AssignmentEntity, (ass) => ass.submissions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'assignment_id' })
    assignment: AssignmentEntity;

    @Column({ nullable: false })
    assignment_id: number;

    @OneToMany(() => AnswerEntity, (answer) => answer.submission, {
        cascade: true,
    })
    answers: AnswerEntity[];

    @Column({
        type: 'enum',
        enum: SubmissionStatus,
        default: SubmissionStatus.NOT_SUBMITTED,
    })
    status: SubmissionStatus;

    @Column({ default: '' })
    comment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
