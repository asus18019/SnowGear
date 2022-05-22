import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilters } from '../../models/IFilters';

const initialState: IFilters = {
	categoryFilter: {
		skies: false,
		snowboard: false,
		sleds: false,
		boots: false,
		overalls: false,
		gloves: false,
		hats: false,
	},
	titleFilter: {
		title: ''
	},
	priceFilter: {
		min: -1,
		max: -1
	},
	sizeFilter: {
		sizes: []
	}
};

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
