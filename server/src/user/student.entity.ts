import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('students')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserEntity, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column()
    ExternalUserID: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
