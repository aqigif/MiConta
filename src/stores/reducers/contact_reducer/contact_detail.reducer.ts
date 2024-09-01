import { TContactDetail } from '@/types/contacts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchContactDetail } from '../../actions/contact_action';

export interface ContactDetailState {
	data?: TContactDetail | null;
	loading: boolean;
	error: string | null;
}

const initialState: ContactDetailState = {
	data: null,
	loading: false,
	error: null,
};

export const contactDetailSlice = createSlice({
	name: 'contactDetail',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchContactDetail.pending, state => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchContactDetail.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchContactDetail.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Failed to fetch contacts';
		});
	},
});

export default contactDetailSlice.reducer;
