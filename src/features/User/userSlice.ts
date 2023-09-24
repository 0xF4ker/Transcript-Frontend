import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userId: null,
	route: null,
};

export const userSlice: any = createSlice({
	initialState,
	name: "userSlice",
	reducers: {
		logout: () => initialState,
		setUserId: (state, action) => {
			state.userId = action.payload;
		},
		setRoute: (state, action) => {
			state.route = action.payload;
		},
	},
});

export default userSlice.reducer;

export const { logout, setUserId, setRoute } = userSlice.actions;
