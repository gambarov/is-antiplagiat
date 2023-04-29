import { StudentEntity } from 'src/user/student.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AssignmentEntity } from './assignment.entity';

@Entity('assignment_progress')
export class AssignmentProgressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    student_id: number;

    @Column({ unique: true })
    assignment_id: number;

    @ManyToOne(() => StudentEntity, (student) => student.progresses)
    student: StudentEntity;

    @ManyToOne(() => AssignmentEntity, (ass) => ass.progresses)
    assignment: AssignmentEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
