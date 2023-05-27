export type RequestSigninBody = {
    login: string;
    password: string;
};

export type UserDto = {
    id: number;
    login: string;
};

export type SessionDto = {
    user: UserDto;
    tokens: {
        refreshToken: string;
        accessToken: string;
    };
};
