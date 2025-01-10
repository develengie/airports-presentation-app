import { combineReducers, configureStore } from '@reduxjs/toolkit';
import airportReducer from './slices/airportSlice';
import airportDetailReducer from './slices/airportDetailSlice';
import handbookReducer from './slices/handbookSlice';
import authReducer from './slices/authSlice';
import commentReducer from './slices/commentSlice';

const rootReducer = combineReducers({
    airportReducer,
    airportDetailReducer,
    handbookReducer,
    authReducer,
    commentReducer,
});

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
