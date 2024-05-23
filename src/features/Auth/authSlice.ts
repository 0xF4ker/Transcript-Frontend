import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AuthState {
	token: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	token: null,
	refreshToken: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (
			state,
			action: PayloadAction<{ token: string; refreshToken: string }>
		) => {
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.token = null;
			state.refreshToken = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setToken, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
