import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signIn(dto: SignInDTO) {
        const user = await this.userRepo.findOne({
            where: { login: dto.login },
        });

        if (!(await bcrypt.compare(dto.password, user?.password))) {
            throw new UnauthorizedException('Неправильный логин и/или пароль');
        }

        return await this.updateTokens(user);
    }

    async logout(refreshToken: string) {
        await this.userRepo.update(
            { refresh_token: refreshToken },
            { refresh_token: '' },
        );
        return true;
    }

    async refresh(refreshToken: string) {
        const user = await this.jwtService.verifyAsync<UserEntity>(
            refreshToken,
            {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            },
        );

        if (!user) throw new UnauthorizedException();

        return await this.updateTokens(user);
    }

    private async updateTokens(user: UserEntity) {
        const { password: _, ...payload } = user;

        const tokens = await this.generateTokens(payload);

        await this.userRepo.update(
            { id: user.id },
            { refresh_token: tokens.refreshToken },
        );

        return tokens;
    }

    private async generateTokens(payload: Partial<UserEntity>) {
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '30d',
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
