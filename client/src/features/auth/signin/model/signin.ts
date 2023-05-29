import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestSigninBody, sessionApi } from '@/entities/session';
import { isFetchBaseQueryError } from '../../../../shared/api';

export const signinThunk = createAsyncThunk(
    'auth/login',
    async (body: RequestSigninBody, { dispatch, rejectWithValue }) => {
        try {
            await dispatch(sessionApi.endpoints.signin.initiate(body)).unwrap();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (typeof error.data == 'string') {
                    console.log('FetchBaseQueryError')
                    throw new Error(error.data);
                }
            }

            return rejectWithValue(error);
        }
    },
);
