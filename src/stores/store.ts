import { configureStore } from '@reduxjs/toolkit';
import {
	contactListReducer,
	contactDetailReducer,
	contactFavoriteReducer,
} from './reducers';

export const store = configureStore({
	reducer: {
		contactList: contactListReducer,
		contactDetail: contactDetailReducer,
		contactFavorite: contactFavoriteReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
