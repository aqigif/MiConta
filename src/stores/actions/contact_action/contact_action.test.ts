import contactListDummyData from '@/dummyDatas/contacts_list.json';
import { configureStore } from '@reduxjs/toolkit';
import {
	contactListReducer,
	contactDetailReducer,
	contactFavoriteReducer,
} from '@/stores/reducers';
import {
	fetchContactList,
	fetchContactDetail,
	setFavorite,
} from './contact_action';

// Mock contact list data
jest.mock('@/dummyDatas/contacts_list.json', () => [
	{ id: '1', name: 'Alice' },
	{ id: '2', name: 'Bob' },
]);

// Setup store with reducer
const store = configureStore({
	reducer: {
		contactList: contactListReducer,
		contactDetail: contactDetailReducer,
		contactFavorite: contactFavoriteReducer,
	},
});

describe('Contact Actions', () => {
	it('fetches the contact list successfully', async () => {
		await store.dispatch(fetchContactList());

		const state = store.getState().contactList;
		expect(state.loading).toBe(false);
		expect(state.data).toEqual(
			contactListDummyData.sort((a, b) => a.name.localeCompare(b.name)),
		);
		expect(state.error).toBeNull();
	});

	it('fetches contact detail successfully', async () => {
		const contactId = '1';
		await store.dispatch(fetchContactDetail(contactId));

		const state = store.getState().contactList;
		expect(state.loading).toBe(false);
		expect(state.data.find(contact => contact.id === contactId)).toEqual(
			contactListDummyData.find(contact => contact.id === contactId),
		);
		expect(state.error).toBeNull();
	});

	it('handles contact detail not found error', async () => {
		const contactId = 'non-existing-id';
		await store.dispatch(fetchContactDetail(contactId));

		const state = store.getState().contactDetail;
		expect(state.loading).toBe(false);
		expect(state.error).toEqual('not found');
	});

	it('sets a contact as favorite', () => {
		const contactId = '1';
		const contact = contactListDummyData.find(c => c.id === contactId);
		if (contact) {
			store.dispatch(setFavorite(contact));

			const state = store.getState().contactFavorite;
			expect(state.data?.id).toContain(contact.id);
		}
	});

	it('removes a contact from favorites when setFavorite is called with null', () => {
		const contactId = '1';
		const contact = contactListDummyData.find(c => c.id === contactId);

		if (contact) {
			store.dispatch(setFavorite(contact));
			store.dispatch(setFavorite(null));

			const state = store.getState().contactFavorite;

			expect(state.data).toEqual(null);
		}
	});
});
