import { fetchContactList } from '@/stores/actions';
import contactListReducer, { ContactListState } from './contact_list.reducer';

describe('contactList reducer', () => {
	const initialState: ContactListState = {
		data: [],
		loading: false,
		error: null,
	};

	it('should return the initial state', () => {
		expect(contactListReducer(undefined, { type: 'unknown' })).toEqual(
			initialState,
		);
	});

	it('should handle fetchContactList.pending', () => {
		const action = { type: fetchContactList.pending.type };
		const expectedState = {
			...initialState,
			loading: true,
		};
		expect(contactListReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchContactList.fulfilled', () => {
		const action = {
			type: fetchContactList.fulfilled.type,
			payload: [
				{ id: '1', name: 'Alice' },
				{ id: '2', name: 'Bob' },
			],
		};
		const expectedState = {
			...initialState,
			data: action.payload,
			loading: false,
		};
		expect(contactListReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchContactList.rejected', () => {
		const action = {
			type: fetchContactList.rejected.type,
			error: { message: 'Failed to fetch contacts' },
		};
		const expectedState = {
			...initialState,
			loading: false,
			error: 'Failed to fetch contacts',
		};
		expect(contactListReducer(initialState, action)).toEqual(expectedState);
	});
});
