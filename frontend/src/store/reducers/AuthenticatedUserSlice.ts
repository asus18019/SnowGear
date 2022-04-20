import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
	isAuthenticated: boolean,
	isLoading: boolean,
	token?: string,
	user?: IUser,
	error?: string
}

const initialState: userState = {
	isAuthenticated: false,
	isLoading: false,
	token: 'Token test',
	error: 'Error string test',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearErrors(state) {
			state.error = undefined;
		},
		setErrors(state, action: PayloadAction<string>) {
			state.error = action.payload;
		}
	},
});

export default userSlice.reducer;
export const { clearErrors, setErrors } = userSlice.actions;
