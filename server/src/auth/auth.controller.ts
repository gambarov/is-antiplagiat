import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { Public } from 'src/shared/decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() dto: SignInDTO) {
        return await this.authService.signIn(dto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Body('refresh_token') refreshToken: string) {
        return await this.authService.logout(refreshToken);
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body('refresh_token') refreshToken: string) {
        return await this.authService.refresh(refreshToken);
    }
}
