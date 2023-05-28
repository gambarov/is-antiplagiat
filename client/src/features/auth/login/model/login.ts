import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/session';
import { isFetchBaseQueryError } from '../../../../shared/api';

type Params = {
    login: string;
    password: string;
};

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (body: Params, { dispatch }) => {
        try {
            await dispatch(sessionApi.endpoints.signin.initiate(body)).unwrap()
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (typeof error.data == 'string') {
                    throw new Error(error.data);
                }
            }

            throw error;
        }
    },
);
