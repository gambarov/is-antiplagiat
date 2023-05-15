import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { AssignmentEntity } from '../../assignment/entities/assignment.entity';
import { SubmissionEntity } from '../../submission/entities/submission.entity';

@EventSubscriber()
export class EnrollmentSubscriber
    implements EntitySubscriberInterface<EnrollmentEntity>
{
    listenTo(): any {
        return EnrollmentEntity;
    }

    async afterInsert(event: InsertEvent<EnrollmentEntity>): Promise<any> {
        const enrollment = event.entity;

        const assignment = await event.manager.findOne(AssignmentEntity, {
            where: { course: { id: enrollment.course_id } },
        });

        const submission = event.manager.create(SubmissionEntity, {
            assignment_id: assignment.id,
            student_id: event.entity.student_id,
        });
        await event.manager.save<SubmissionEntity>(submission);
    }
}
