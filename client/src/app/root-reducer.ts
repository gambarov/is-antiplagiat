import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from '@/entities/session';

export const rootReducer = combineReducers({
    [sessionSlice.name]: sessionSlice.reducer,
});
