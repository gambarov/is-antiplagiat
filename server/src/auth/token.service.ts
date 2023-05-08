import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { TokenPair } from './interfaces/token-pair.interface';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateTokens(payload: Partial<UserEntity>): Promise<TokenPair> {
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
