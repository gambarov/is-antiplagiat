import { AuthService } from '../auth.service';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/user.service';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../user/entities/user.entity';
import { StudentEntity } from '../../user/entities/student.entity';
import { SupervisorEntity } from '../../user/entities/supervisor.entity';
import { SubmissionEntity } from '../../submission/entities/submission.entity';
import { CourseEntity } from '../../course/entities/course.entity';
import { AssignmentEntity } from '../../assignment/entities/assignment.entity';
import { AnswerEntity } from '../../answer/entites/answer.entity';
import { AnswerResultEntity } from '../../answer/entites/answer-result.entity';

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ envFilePath: '.env' }),
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        type: 'mysql',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_TEST_DATABASE'),
                        entities: [
                            UserEntity,
                            StudentEntity,
                            SupervisorEntity,
                            CourseEntity,
                            AssignmentEntity,
                            AnswerEntity,
                            AnswerResultEntity,
                            SubmissionEntity,
                        ],
                        dropSchema: true,
                        synchronize: true,
                    }),
                }),
                TypeOrmModule.forFeature([UserEntity]),
            ],
            providers: [AuthService, JwtService, UserService, TokenService],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        userService = moduleRef.get<UserService>(UserService);
    });

    describe('signin', () => {
        it('should return a JWT token if the user is authenticated', async () => {
            await userService.createOne({
                login: 'testuser',
                password: await bcrypt.hash('testpassword', 1),
            });

            const signinDto = {
                login: 'testuser',
                password: 'testpassword',
            };

            const result = await authService.signIn(signinDto);

            expect(result).toHaveProperty('accessToken');
        });

        it('should throw an error if the user is not authenticated', async () => {
            const signinDto = {
                login: 'nonexisted',
                password: 'nonexisted',
            };

            await expect(authService.signIn(signinDto)).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });
});
