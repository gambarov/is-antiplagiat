import {
    Entity,
    Column,
    OneToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { WorkStatus } from './work-status.enum';
import { WorkResultEntity } from './work-result.entity';

@Entity('works')
export class WorkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: WorkStatus, default: WorkStatus.PENDING })
    status: WorkStatus;

    @Column()
    file_url: string;

    @OneToOne(() => WorkResultEntity, (result) => result.work)
    result: WorkResultEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
