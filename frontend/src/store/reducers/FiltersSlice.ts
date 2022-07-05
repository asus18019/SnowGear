import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilters } from '../../models/IFilters';
import { initialFilters } from '../../utils/filters';

const initialState: IFilters = initialFilters;

export const FiltersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setFilterCategoryProperty(state, action: PayloadAction<string>) {
			const property = action.payload as keyof typeof state.categoryFilter;
			state.categoryFilter[property] = !state.categoryFilter[property];
		},
		setFilterTitleProperty(state, action: PayloadAction<string>) {
			state.titleFilter.title = action.payload;
		},
		setFilterPriceProperty(state, action: PayloadAction<{ minmax: string, value: number }>) {
			const property = action.payload.minmax as keyof typeof state.priceFilter;
			state.priceFilter[property] = action.payload.value;
		},
		setFilterSizeProperty(state, action: PayloadAction<string>) {
			if(state.sizeFilter.sizes.includes(action.payload)) {
				state.sizeFilter.sizes = [...state.sizeFilter.sizes.filter(elem => elem !== action.payload)];
			} else {
				state.sizeFilter.sizes = [...state.sizeFilter.sizes, action.payload];
			}
		},
		resetFilters(state) {
			state.sizeFilter.sizes = [];
			state.priceFilter = { min: -1, max: -1 };
			state.titleFilter.title = '';
			state.categoryFilter = {
				skies: false,
				snowboard: false,
				sleds: false,
				boots: false,
				overalls: false,
				gloves: false,
				hats: false
			};
		},

	},
});

export default FiltersSlice.reducer;
export const {
	setFilterCategoryProperty,
	setFilterTitleProperty,
	setFilterPriceProperty,
	setFilterSizeProperty,
	resetFilters
} = FiltersSlice.actions;
