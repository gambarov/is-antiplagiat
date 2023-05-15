import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { AssignmentEntity } from '../entities/assignment.entity';
import { StudentEntity } from '../../user/entities/student.entity';
import { SubmissionEntity } from '../../submission/entities/submission.entity';

@EventSubscriber()
export class AssignmentSubscriber
    implements EntitySubscriberInterface<AssignmentEntity>
{
    listenTo(): any {
        return AssignmentEntity;
    }

    async afterInsert(event: InsertEvent<AssignmentEntity>): Promise<any> {
        // FIXME: проблема N + 1 (курс на данный момент не загр. с помощью нетерпеливой (eager) загрузки)
        const assignment = event.entity;

        // Ищем студентов, которые записаны на курс, где размещено задание
        const students = await event.manager.find(StudentEntity, {
            where: { enrollments: { course_id: assignment.course.id } },
        });

        if (students.length > 0) {
            // Инициализируем прогресс по заданию для каждого студента
            students.forEach(async (student) => {
                const submission = event.manager.create(SubmissionEntity, {
                    assignment_id: assignment.id,
                    student_id: student.id,
                });
                await event.manager.save<SubmissionEntity>(submission);
            });
        }
    }
}
