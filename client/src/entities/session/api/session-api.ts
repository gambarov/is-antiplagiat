import { baseApi } from '@/shared/api';
import { Session } from '../model/types';
import { RequestSigninBody, SessionDto } from './types';
import { mapSession } from '../lib/map-session';

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signin: build.mutation<Session, RequestSigninBody>({
            query: (body) => ({
                url: '/auth/signin',
                method: 'POST',
                body,
            }),
            transformResponse: (response: SessionDto) => mapSession(response),
        }),
    }),
});
