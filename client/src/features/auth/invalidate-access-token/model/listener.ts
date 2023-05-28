import {
    TypedStartListening,
    createListenerMiddleware,
} from '@reduxjs/toolkit';
import { invalidateAccessToken } from '@/shared/api';
import { logoutThunk } from '../../logout/model/logout';

export const invalidateAccessTokenListener = createListenerMiddleware();

export type TypedListening = TypedStartListening<RootState, AppDispatch>;

export const startInvalidateAccessTokenListener =
    invalidateAccessTokenListener.startListening as TypedListening;

startInvalidateAccessTokenListener({
    actionCreator: invalidateAccessToken,
    effect: async (_, api) => {
        // TODO: Add logic with refresh access token
        // @see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors
        api.dispatch(logoutThunk());
    },
});
