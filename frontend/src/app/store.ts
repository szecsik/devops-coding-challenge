import { configureStore } from '@reduxjs/toolkit';
import fortuneReducer from '../features/fortune/fortuneSlice';

export const store = configureStore({
    reducer: {
        fortune: fortuneReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;