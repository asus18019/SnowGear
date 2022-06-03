import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILoader {
	isLoading: boolean
}

const initialState: ILoader = {
	isLoading: false
};

export const loaderSlice = createSlice({
	name: 'loader',
	initialState,
	reducers: {
		changeLoader(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		}
	},
});

export default loaderSlice.reducer;
export const { changeLoader } = loaderSlice.actions;
