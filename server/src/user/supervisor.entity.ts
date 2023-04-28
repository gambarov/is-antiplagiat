import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('supervisors')
export class SupervisorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
