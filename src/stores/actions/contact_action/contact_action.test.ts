import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { configureStore } from '@reduxjs/toolkit';
import {
	contactListReducer,
	contactDetailReducer,
	contactFavoriteReducer,
} from '@/stores/reducers';
import { fetchContactList, fetchContactDetail } from './contact_action';

jest.mock('react-native', () => ({
	PermissionsAndroid: {
		request: jest.fn(),
		PERMISSIONS: {
			READ_CONTACTS: 'android.permission.READ_CONTACTS',
		},
		RESULTS: {
			GRANTED: 'granted',
			DENIED: 'denied',
		},
	},
	Platform: {
		OS: 'android',
	},
}));

jest.mock('react-native-contacts', () => ({
	getAll: jest.fn(),
	getContactById: jest.fn(),
}));

const store = configureStore({
	reducer: {
		contactList: contactListReducer,
		contactDetail: contactDetailReducer,
		contactFavorite: contactFavoriteReducer,
	},
});

describe('Contact Actions', () => {
	test('fetchContactList - should fetch and sort contact list', async () => {
		const mockContacts = [
			{ recordID: '2', displayName: 'Bob' },
			{ recordID: '1', displayName: 'Alice' },
		];

		(PermissionsAndroid.request as jest.Mock).mockResolvedValue(
			PermissionsAndroid.RESULTS.GRANTED,
		);
		(Contacts.getAll as jest.Mock).mockResolvedValue(mockContacts); // This line ensures Contacts.getAll returns the mock contacts.

		await store.dispatch(fetchContactList());

		const state = store.getState().contactList;
		expect(state.data).toEqual([
			{ recordID: '1', displayName: 'Alice' },
			{ recordID: '2', displayName: 'Bob' },
		]);
		expect(state.loading).toBe(false);
		expect(state.error).toBeNull();
	});

	test('fetchContactList - should handle permission denied', async () => {
		(PermissionsAndroid.request as jest.Mock).mockResolvedValue(
			PermissionsAndroid.RESULTS.DENIED,
		);

		await store.dispatch(fetchContactList());

		const state = store.getState().contactList;
		expect(state.data).toEqual([]);
		expect(state.loading).toBe(false);
		expect(state.error).toEqual('Permission denied');
	});

	test('fetchContactDetail - should fetch contact details by ID', async () => {
		const mockContact = { recordID: '1', displayName: 'Alice' };
		(Contacts.getContactById as jest.Mock).mockResolvedValue(mockContact);

		await store.dispatch(fetchContactDetail('1'));

		const state = store.getState().contactDetail;
		expect(state.data).toEqual(mockContact);
		expect(state.loading).toBe(false);
		expect(state.error).toBeNull();
	});

	test('fetchContactDetail - should handle error if contact not found', async () => {
		(Contacts.getContactById as jest.Mock).mockRejectedValue(
			new Error('Contact not found'),
		);

		await store.dispatch(fetchContactDetail('non-existing-id'));

		const state = store.getState().contactDetail;
		expect(state.data).toBeNull();
		expect(state.loading).toBe(false);
		expect(state.error).toEqual('Contact not found');
	});
});
