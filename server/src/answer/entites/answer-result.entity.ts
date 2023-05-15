import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AnswerResultStatus } from '../enums/answer-result-status.enum';
import { AnswerEntity } from './answer.entity';

@Entity('answer_results')
export class AnswerResultEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => AnswerEntity, (answer) => answer.result, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'answer_id' })
    answer: AnswerEntity;

    @Column()
    DocId: number;

    @Column({
        type: 'enum',
        enum: AnswerResultStatus,
        default: AnswerResultStatus.None,
    })
    Status: AnswerResultStatus;

    @Column({ default: 0 })
    Plagiarism: number;

    @Column({ default: 0 })
    Legal: number;

    @Column({ default: 0 })
    SelfCite: number;

    @Column({ default: 0 })
    Unknown: number;

    @Column({ default: false })
    IsSuspicious: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
