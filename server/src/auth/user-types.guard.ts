import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../user/enums/user-type.enum';
import { ALLOWED_USER_TYPES } from '../shared/decorators/allowed-user-types.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class UserTypesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const allowedUserTypes = this.reflector.getAllAndOverride<UserType[]>(
            ALLOWED_USER_TYPES,
            [context.getHandler(), context.getClass()],
        );
        if (!allowedUserTypes) return true;

        const { user } = context.switchToHttp().getRequest();

        return allowedUserTypes.some(
            (type) => (user as UserEntity).type == type,
        );
    }
}
