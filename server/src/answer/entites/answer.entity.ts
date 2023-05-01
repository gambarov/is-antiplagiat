import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AnswerStatus } from '../enums/answer-status.enum';
import { AnswerResultEntity } from './answer-result.entity';
import { SubmissionEntity } from 'src/submission/entities/submission.entity';

@Entity('answers')
export class AnswerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SubmissionEntity, (sub) => sub.answers, {
        nullable: false,
    })
    @JoinColumn({ name: 'submission_id' })
    submission: SubmissionEntity;

    @Column({ type: 'enum', enum: AnswerStatus, default: AnswerStatus.PENDING })
    status: AnswerStatus;

    @Column()
    file_url: string;

    @OneToOne(() => AnswerResultEntity, (result) => result.answer, {
        eager: true,
        cascade: true,
    })
    result: AnswerResultEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
