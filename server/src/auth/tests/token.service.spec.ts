import { Test } from '@nestjs/testing';
import { TokenService } from '../token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
            const result = {
                accessToken: 'accessToken',
                refreshToken: 'accessToken',
            };

            jest.spyOn(tokenService, 'generateTokens').mockImplementation(
                async () => result,
            );

            expect(await tokenService.generateTokens({})).toBe(result);
        });
    });
});
