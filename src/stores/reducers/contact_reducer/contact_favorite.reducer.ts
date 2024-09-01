import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from 'react-native-contacts';

export interface ContactFavoriteState {
	data?: Contact | null;
}

const initialState: ContactFavoriteState = {
	data: null,
};

export const contactFavoriteSlice = createSlice({
	name: 'contactFavorite',
	initialState,
	reducers: {
		setFavorite: (state, action: PayloadAction<Contact | null>) => {
			state.data = action.payload;
		},
	},
});

export default contactFavoriteSlice.reducer;
