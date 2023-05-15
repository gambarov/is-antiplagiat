import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../user/entities/user.entity';
import { createTestingModuleWithDatabase } from '../../shared/util/test.util';

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let moduleRef: TestingModule;

    beforeAll(async () => {
        moduleRef = await createTestingModuleWithDatabase(
            [UserEntity],
            [AuthService, JwtService, UserService, TokenService],
        );

        authService = moduleRef.get<AuthService>(AuthService);
        userService = moduleRef.get<UserService>(UserService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe('signin', () => {
        it('should return a JWT token if the user is authenticated', async () => {
            const signinDto = {
                login: 'testuser',
                password: 'testpassword',
            };

            await userService.createOne(signinDto);

            const result = await authService.signIn(signinDto);

            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
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
