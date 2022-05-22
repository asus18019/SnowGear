import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilters } from '../../models/IFilters';
import { initialFilters } from '../../utils/filters';

const initialState: IFilters = initialFilters;

export const FiltersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setFilterProperty(state, action: PayloadAction<string>) {
			// @ts-ignore
			state.categoryFilter[action.payload] = !state.categoryFilter[action.payload];
		},
		setFilterTitleProperty(state, action: PayloadAction<string>) {
			state.titleFilter.title = action.payload;
		},
	},
});

export default FiltersSlice.reducer;
export const { setFilterProperty, setFilterTitleProperty } = FiltersSlice.actions;
