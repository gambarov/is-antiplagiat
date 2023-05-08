import { Test } from '@nestjs/testing';
import { TokenService } from '../token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('The TokenService', () => {
    let tokenService: TokenService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [TokenService],
            imports: [JwtModule, ConfigModule.forRoot({ envFilePath: '.env' })],
        }).compile();

        tokenService = moduleRef.get<TokenService>(TokenService);
    });

    describe('generateTokens', () => {
        it('should generate access and refresh tokens', async () => {
            const tokens = await tokenService.generateTokens({ id: 1 });
            expect(tokens.accessToken).toBeDefined();
            expect(tokens.refreshToken).toBeDefined();
        });

        it('should throws an error when expiresIn or secret are invalid', async () => {
            const jwtServiceMock = {
                signAsync: jest.fn().mockRejectedValueOnce(new Error()),
            };
            const configServiceMock = {
                get: jest.fn().mockReturnValueOnce(null),
            };
            const tokenService = new TokenService(
                jwtServiceMock as any,
                configServiceMock as any,
            );
            await expect(
                tokenService.generateTokens({ id: 1 }),
            ).rejects.toThrow();
            expect(jwtServiceMock.signAsync).toHaveBeenCalledTimes(1);
            expect(configServiceMock.get).toHaveBeenCalledTimes(2);
        });
    });
});
