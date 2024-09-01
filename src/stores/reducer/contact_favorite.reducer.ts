import { TContactDetail } from '@/types/contacts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContactFavoriteState {
	data?: TContactDetail | null;
}

const initialState: ContactFavoriteState = {
	data: null,
};

export const contactDetailSlice = createSlice({
	name: 'contactFavorite',
	initialState,
	reducers: {
		setFavorite: (state, action: PayloadAction<TContactDetail | null>) => {
			state.data = action.payload;
		},
	},
});

export const { setFavorite } = contactDetailSlice.actions;
export default contactDetailSlice.reducer;
