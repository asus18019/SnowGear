import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilters } from '../../models/IFilters';
import { initialFilters } from '../../utils/filters';

const initialState: IFilters = initialFilters;

export const FiltersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setFilterCategoryProperty(state, action: PayloadAction<string>) {
			// @ts-ignore
			state.categoryFilter[action.payload] = !state.categoryFilter[action.payload];
		},
		setFilterTitleProperty(state, action: PayloadAction<string>) {
			state.titleFilter.title = action.payload;
		},
		setFilterPriceProperty(state, action: PayloadAction<{ minmax: string, value: number }>) {
			// @ts-ignore
			state.priceFilter[action.payload.minmax] = action.payload.value;
		},
		setFilterSizeProperty(state, action: PayloadAction<string>) {
			if(state.sizeFilter.sizes.includes(action.payload)) {
				state.sizeFilter.sizes = [...state.sizeFilter.sizes.filter(elem => elem !== action.payload)];
			} else {
				state.sizeFilter.sizes = [...state.sizeFilter.sizes, action.payload];
			}
		},

	},
});

export default FiltersSlice.reducer;
export const {
	setFilterCategoryProperty,
	setFilterTitleProperty,
	setFilterPriceProperty,
	setFilterSizeProperty,
} = FiltersSlice.actions;
