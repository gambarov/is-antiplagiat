import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearSession, sessionApi } from '@/entities/session';
import { SESSION_TAG } from '@/shared/api';
import { wait } from '@/shared/lib';

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
    'auth/logout',
    async (_: unknown, { dispatch }) => {
        dispatch(clearSession());

        // Wait 10ms to invalidateTags in next event loop tick.
        // Otherwise after invalidate related requests with SESSION_TAG
        // will be started, but isAuth will still be equal to true
        await wait(10)

        dispatch(sessionApi.util.invalidateTags([SESSION_TAG]));
    },
);
