import Contacts from 'react-native-contacts';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { PermissionsAndroid, PermissionStatus, Platform } from 'react-native';
import { contactFavoriteSlice } from '@/stores/reducers/contact_reducer/contact_favorite.reducer';

export const fetchContactList = createAsyncThunk('contacts', async () => {
	let status: PermissionStatus = 'granted';
	if (Platform.OS === 'android') {
		status = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
			{
				title: 'Contacts',
				message: 'This app would like to view your contacts.',
				buttonPositive: 'Please accept bare mortal',
			},
		);
	}
	if (status !== 'granted') {
		throw new Error('Permission denied');
	}
	const contacts = await Contacts.getAll();
	return contacts
		.map(item => {
			if (!item?.displayName) {
				return {
					...item,
					displayName: `${item?.givenName} ${item?.familyName}`,
				};
			}
			return item;
		})
		.sort((a, b) => {
			if (a?.displayName && b?.displayName) {
				return a.displayName.localeCompare(b.displayName);
			}
			return a.phoneNumbers?.[0]?.number.localeCompare(
				b.phoneNumbers?.[0]?.number,
			);
		});
});

export const fetchContactDetail = createAsyncThunk(
	'contacts/:id',
	async (id: string) => {
		const contact = await Contacts.getContactById(id);
		if (!contact?.displayName) {
			return {
				...contact,
				displayName: `${contact?.givenName} ${contact?.familyName}`,
			};
		}
		return contact;
	},
);

export const { setFavorite } = contactFavoriteSlice.actions;
