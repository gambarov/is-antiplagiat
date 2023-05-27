import { SessionDto } from '../api/types';
import { Session } from '../model/types';

export const mapSession = (dto: SessionDto): Session => {
    return {
        accessToken: dto.tokens.accessToken,
        refreshToken: dto.tokens.refreshToken,
        userId: dto.user.id,
    };
};
