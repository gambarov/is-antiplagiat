import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService,
    ) {}

    async signIn(dto: SignInDTO) {
        const user = await this.userService.repo.findOne({
            where: { login: dto.login },
        });

        const isMatch =
            user && (await bcrypt.compare(dto.password, user.password));

        if (isMatch) return await this.updateUserTokens(user);
        else throw new UnauthorizedException('Неправильный логин и/или пароль');
    }

    async logout(refreshToken: string) {
        await this.userService.repo.update(
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

        return await this.updateUserTokens(user);
    }

    private async updateUserTokens(user: UserEntity) {
        const { id } = user;

        const tokens = await this.tokenService.generateTokens({ id });

        await this.userService.repo.update(
            { id: user.id },
            { refresh_token: tokens.refreshToken },
        );

        return tokens;
    }
}
