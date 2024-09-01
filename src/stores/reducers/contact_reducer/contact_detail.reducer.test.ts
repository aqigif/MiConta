import contactDetailReducer, {
	ContactDetailState,
} from './contact_detail.reducer';
import { fetchContactDetail } from '../../actions/contact_action/contact_action';

describe('contactDetail reducer', () => {
	const initialState: ContactDetailState = {
		data: null,
		loading: false,
		error: null,
	};

	it('should return the initial state', () => {
		expect(contactDetailReducer(undefined, { type: 'unknown' })).toEqual(
			initialState,
		);
	});

	it('should handle fetchContactDetail.pending', () => {
		const action = { type: fetchContactDetail.pending.type };
		const expectedState = {
			...initialState,
			loading: true,
		};
		expect(contactDetailReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchContactDetail.fulfilled', () => {
		const payload = { id: '1', name: 'Alice' }; // Mock data to simulate a successful fetch
		const action = {
			type: fetchContactDetail.fulfilled.type,
			payload,
		};
		const expectedState = {
			...initialState,
			loading: false,
			data: payload,
		};
		expect(contactDetailReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchContactDetail.rejected', () => {
		const errorMessage = 'Failed to fetch contact details';
		const action = {
			type: fetchContactDetail.rejected.type,
			error: { message: errorMessage },
		};
		const expectedState = {
			...initialState,
			loading: false,
			error: errorMessage,
		};
		expect(contactDetailReducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchContactDetail.rejected with default error message', () => {
		const action = {
			type: fetchContactDetail.rejected.type,
			error: {},
		};
		const expectedState = {
			...initialState,
			loading: false,
			error: 'Failed to fetch contacts',
		};
		expect(contactDetailReducer(initialState, action)).toEqual(expectedState);
	});
});
