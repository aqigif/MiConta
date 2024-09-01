import { TContact } from '@/types/contacts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContactFavoriteState {
	data?: TContact | null;
}

const initialState: ContactFavoriteState = {
	data: null,
};

export const contactDetailSlice = createSlice({
	name: 'contactFavorite',
	initialState,
	reducers: {
		setFavorite: (state, action: PayloadAction<TContact | null>) => {
			state.data = action.payload;
		},
	},
});

export const { setFavorite } = contactDetailSlice.actions;
export default contactDetailSlice.reducer;
