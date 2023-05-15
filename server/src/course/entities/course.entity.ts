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
import { EnrollmentEntity } from './enrollment.entity';

@Entity('courses')
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => AssignmentEntity, (ass) => ass.course, {
        cascade: true,
    })
    assignments: AssignmentEntity[];

    @ManyToMany(() => StudentEntity, (student) => student.courses, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinTable()
    students: StudentEntity[];

    @OneToMany(() => EnrollmentEntity, (enr) => enr.course, {
        cascade: true,
    })
    enrollments: EnrollmentEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
