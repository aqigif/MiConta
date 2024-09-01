import { TContactList } from '@/types/contacts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchContactList } from '../../actions/contact_action/contact_action';

export interface ContactListState {
	data: TContactList;
	loading: boolean;
	error: string | null;
}

const initialState: ContactListState = {
	data: [],
	loading: false,
	error: null,
};

export const contactSlice = createSlice({
	name: 'contactList',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchContactList.pending, state => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchContactList.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchContactList.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch contacts';
		});
	},
});

export default contactSlice.reducer;