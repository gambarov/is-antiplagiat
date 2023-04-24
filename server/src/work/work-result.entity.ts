import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { WorkResultStatus } from './work-result-status.enum';
import { WorkEntity } from './work.entity';

@Entity('work_results')
export class WorkResultEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => WorkEntity, (work) => work.result)
    @JoinColumn({ name: 'work_id' })
    work: WorkEntity;

    @Column()
    DocId: number;

    @Column({
        type: 'enum',
        enum: WorkResultStatus,
        default: WorkResultStatus.None,
    })
    Status: WorkResultStatus;

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
