import { configureStore } from '@reduxjs/toolkit';
import curUserReducer from '../reducers/curUserReducer';
import historyReducer from '../reducers/historyReducer';

export const store = configureStore({
    reducer: {
        current_user: curUserReducer,
        history: historyReducer
    }
});