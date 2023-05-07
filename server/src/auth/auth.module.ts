import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { TokenService } from './token.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        TokenService,
    ],
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
        }),
        ConfigModule,
    ],
})
export class AuthModule {}
