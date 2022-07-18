import { setupStore, AppStore, RootState, AppDispatch } from './store';
import {
	fetchToken,
	startFetching,
	stopFetching,
	clearErrors,
	setErrors,
	fetchUser,
	logout,
} from './reducers/AuthenticatedUserSlice';
import {
	setFilterTitleProperty,
	setFilterPriceProperty,
	setFilterSizeProperty,
	setFilterCategoryProperty,
	resetFilters,
} from './reducers/FiltersSlice';
import { changeLoader } from './reducers/LoaderSlice';

export {
	setupStore,
	fetchToken,
	startFetching,
	stopFetching,
	clearErrors,
	setErrors,
	fetchUser,
	logout,
	setFilterSizeProperty,
	setFilterPriceProperty,
	setFilterTitleProperty,
	setFilterCategoryProperty,
	resetFilters,
	changeLoader,
};

export type {
	AppStore,
	RootState,
	AppDispatch
};
