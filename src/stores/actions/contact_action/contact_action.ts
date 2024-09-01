import { TContactDetail, TContactList } from '@/types/contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contactListDummyData from '@/dummyDatas/contacts_list.json';
import { contactFavoriteSlice } from '../../reducers/contact_reducer/contact_favorite.reducer';

export const fetchContactList = createAsyncThunk('contacts', async () => {
	return new Promise<TContactList>(resolve => {
		setTimeout(() => {
			resolve(
				[...(contactListDummyData as TContactList)].sort((a, b) =>
					a.name.localeCompare(b.name),
				),
			);
		}, 500);
	});
});

export const fetchContactDetail = createAsyncThunk(
	'contacts/:id',
	async (id: string) => {
		return new Promise<TContactDetail>((resolve, reject) => {
			const contact = contactListDummyData.find(item => item.id === id) as
				| TContactDetail
				| undefined;

			if (contact) {
				resolve(contact);
			}
			reject(new Error('not found'));
		});
	},
);

export const { setFavorite } = contactFavoriteSlice.actions;
