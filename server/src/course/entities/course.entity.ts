import { StudentEntity } from 'src/user/entities/student.entity';
import { AssignmentEntity } from '../../assignment/entities/assignment.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('courses')
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => AssignmentEntity, (ass) => ass.course)
    assignments: AssignmentEntity[];

    @ManyToMany(() => StudentEntity, (student) => student.courses)
    @JoinTable()
    students: StudentEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
