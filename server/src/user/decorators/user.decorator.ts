import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export const User = createParamDecorator(
    (data: any, ctx: ExecutionContext): UserEntity => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return user;
    },
);
