import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/AuthenticatedUserSlice';
import filtersReducer from './reducers/FiltersSlice';

const rootReducer = combineReducers({
	userReducer,
	filtersReducer
});

export const setupStore = () => configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
