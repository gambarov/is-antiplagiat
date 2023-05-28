import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { rootReducer } from './root-reducer';
import { baseApi } from '@/shared/api';
import { invalidateAccessTokenListener } from './features/auth/invalidate-access-token/model/listener';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
};

export function makeStore() {
    const store = configureStore({
        // 👇 ATTENTION: persistReducer broke infering RootState
        reducer: persistReducer(
            persistConfig,
            rootReducer,
        ) as unknown as typeof rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(
                baseApi.middleware,
                invalidateAccessTokenListener.middleware,
            ),
    });

    setupListeners(store.dispatch);

    return store;
}

export const appStore = makeStore();
export const persistedStore = persistStore(appStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
