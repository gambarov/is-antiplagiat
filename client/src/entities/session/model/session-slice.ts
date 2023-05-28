import { createSlice } from '@reduxjs/toolkit';
import { sessionApi } from '../api/session-api';

type SessionSliceState =
    | {
          isAuth: true;
          userId: number;
          accessToken: string;
          refreshToken: string;
      }
    | {
          isAuth: false;
          userId?: number;
          accessToken?: string;
          refreshToken?: string;
      };

const initialState: SessionSliceState = {
    isAuth: false,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        clearSession: (state) => {
            state.isAuth = false;
            state.accessToken = undefined;
            state.refreshToken = undefined;
            state.userId = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            sessionApi.endpoints.signin.matchFulfilled,
            (state: SessionSliceState, { payload }) => {
                state.isAuth = true;
                state.userId = payload.userId;
                state.accessToken = payload.accessToken;
                state.refreshToken = payload.refreshToken;
            },
        );
    },
});

export const selectIsAuth = (state: RootState) => state.session.isAuth;
export const selectUserId = (state: RootState) => state.session.userId;

export const { clearSession } = sessionSlice.actions;
