import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPair } from './interfaces/token-pair.interface';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateTokens(payload: TokenPayload): Promise<TokenPair> {
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
