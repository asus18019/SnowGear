import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/AuthenticatedUserSlice';
import filtersReducer from './reducers/FiltersSlice';
import loaderReducer from './reducers/LoaderSlice';

const rootReducer = combineReducers({
	userReducer,
	filtersReducer,
	loaderReducer
});

export const setupStore = () => configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
