import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface userState {
	isAuthenticated: boolean,
	isLoading: boolean,
	token?: string,
	user?: IUser,
	error: string[]
}

const initialState: userState = {
	isAuthenticated: false,
	isLoading: false,
	error: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		fetchToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
		setErrors(state, action: PayloadAction<string>) {
			state.error.push(action.payload);
		},
		fetchUser(state, action: PayloadAction<IUser>) {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		startFetching(state) {
			state.isLoading = true;
			state.error = [];
		},
		stopFetching(state) {
			state.isLoading = false;
		},
		clearErrors(state) {
			state.error = [];
		},
		logout(state) {
			state.isAuthenticated = false;
			state.token = undefined;
			state.user = undefined;
		},
	},
});

export default userSlice.reducer;
export const {
	fetchToken,
	startFetching,
	stopFetching,
	clearErrors,
	setErrors,
	fetchUser,
	logout,
} = userSlice.actions;
