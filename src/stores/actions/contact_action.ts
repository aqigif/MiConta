import { Contact, Contacts } from '@/types/contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

import contactListDummyData from '@/dummyDatas/contacts_list.json';

export const fetchContactList = createAsyncThunk(
	'contacts/fetchContactList',
	async () => {
		return new Promise<Contacts>(resolve => {
			setTimeout(() => {
				resolve(contactListDummyData as Contacts);
			}, 500);
		});
	},
);

export const fetchContactDetail = createAsyncThunk(
	'contacts/fetchContactList/id',
	async (id: string) => {
		return new Promise<Contact>((resolve, reject) => {
			const contact = contactListDummyData.find(item => item.id === id) as
				| Contact
				| undefined;

			if (contact) {
				resolve(contact);
			}
			reject(new Error('not found'));
		});
	},
);
