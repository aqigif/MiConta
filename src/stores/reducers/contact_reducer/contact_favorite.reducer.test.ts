import { TContact } from '@/types/contacts';
import contactFavoriteReducer, {
	ContactFavoriteState,
	contactFavoriteSlice,
} from './contact_favorite.reducer';

describe('contactFavorite reducer', () => {
	const initialState: ContactFavoriteState = {
		data: null,
	};

	it('should return the initial state', () => {
		expect(contactFavoriteReducer(undefined, { type: 'unknown' })).toEqual(
			initialState,
		);
	});

	it('should handle setFavorite with a valid contact', () => {
		const contact: TContact = { id: '1', name: 'Alice', phone: '+1 2313 1231' }; // Mock contact data
		const action = contactFavoriteSlice.actions.setFavorite(contact);
		const expectedState = {
			data: contact,
		};

		expect(contactFavoriteReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle setFavorite with null', () => {
		const action = contactFavoriteSlice.actions.setFavorite(null);
		const expectedState = {
			data: null,
		};

		expect(contactFavoriteReducer(initialState, action)).toEqual(expectedState);
	});
});
