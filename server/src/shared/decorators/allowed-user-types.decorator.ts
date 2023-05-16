import { SetMetadata } from '@nestjs/common';
import { UserType } from '../../user/enums/user-type.enum';

export const ALLOWED_USER_TYPES = 'ALLOWED_USER_TYPES';

export const AllowedUserTypes = (types: UserType[]) =>
    SetMetadata(ALLOWED_USER_TYPES, types);
