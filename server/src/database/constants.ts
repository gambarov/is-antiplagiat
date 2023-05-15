import { AnswerResultEntity } from '../answer/entites/answer-result.entity';
import { AnswerEntity } from '../answer/entites/answer.entity';
import { AssignmentEntity } from '../assignment/entities/assignment.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { EnrollmentEntity } from '../enrollment/entities/enrollment.entity';
import { SubmissionEntity } from '../submission/entities/submission.entity';
import { StudentEntity } from '../user/entities/student.entity';
import { SupervisorEntity } from '../user/entities/supervisor.entity';
import { UserEntity } from '../user/entities/user.entity';

export const ALL_ENTITIES = [
    UserEntity,
    StudentEntity,
    SupervisorEntity,
    CourseEntity,
    AssignmentEntity,
    AnswerEntity,
    AnswerResultEntity,
    SubmissionEntity,
    EnrollmentEntity,
];
