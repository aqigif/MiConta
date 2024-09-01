import { Contact } from 'react-native-contacts';
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
		const contact = { recordID: '1', displayName: 'Alice' };
		const action = contactFavoriteSlice.actions.setFavorite(
			contact as unknown as Contact,
		);
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
