import Contacts from 'react-native-contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { PermissionsAndroid } from 'react-native';
import { contactFavoriteSlice } from '@/stores/reducers/contact_reducer/contact_favorite.reducer';

export const fetchContactList = createAsyncThunk('contacts', async () => {
	const status = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
		{
			title: 'Contacts',
			message: 'This app would like to view your contacts.',
			buttonPositive: 'Please accept bare mortal',
		},
	);
	if (status !== 'granted') {
		throw new Error('Permission denied');
	}
	const contacts = await Contacts.getAll();
	return contacts.sort((a, b) => a.displayName.localeCompare(b.displayName));
});

export const fetchContactDetail = createAsyncThunk(
	'contacts/:id',
	async (id: string) => {
		const contact = await Contacts.getContactById(id);
		return contact;
	},
);

export const { setFavorite } = contactFavoriteSlice.actions;
