import { createSlice } from '@reduxjs/toolkit';

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
    extraReducers: {},
});

export const selectIsAuth = (state: RootState) => state.session.isAuth;
export const selectUserId = (state: RootState) => state.session.userId;

export const { clearSession } = sessionSlice.actions;
