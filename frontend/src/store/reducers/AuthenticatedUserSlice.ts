import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
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
	token: 'test'
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		fetchToken(state, action: PayloadAction<string>) {
			state.isAuthenticated = true;
			state.token = action.payload;
			state.isLoading = false;
		},
		setErrors(state, action: PayloadAction<string>) {
			state.error.push(action.payload);
			state.isLoading = false;
		},
		fetchUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
		},
		startFetching(state) {
			state.isLoading = true;
			state.error = [];
		},
		clearErrors(state) {
			state.error = [];
		},
	},
});

export default userSlice.reducer;
export const { fetchToken, startFetching, clearErrors, setErrors, fetchUser } = userSlice.actions;
