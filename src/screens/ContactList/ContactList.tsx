import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { FlashList } from '@shopify/flash-list';

import { useCallback, useEffect } from 'react';

import { RootScreenProps } from '@/types/navigation';
import CardContactItem from '@/components/molecules/CardContactItem/CardContactItem';
import { fetchContactList } from '@/stores/actions/contact_action';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Spacer } from '@/components/atoms';
import { setFavorite } from '@/stores/reducer/contact_favorite.reducer';
import { TContact } from '@/types/contacts';

function ContactList({ navigation }: RootScreenProps<'ContactList'>) {
	const { t } = useTranslation(['contact_list']);
	const { gutters, fonts, layout, backgrounds } = useTheme();
	const dispatch = useAppDispatch();
	const { data, loading, error } = useAppSelector(state => state.contactList);
	const favoritedContact = useAppSelector(state => state.contactFavorite.data);

	const handleGoToContactDetail = useCallback(
		(id: string) => () => navigation.navigate('ContactDetail', { id }),
		[navigation],
	);

	const handleFavorite = useCallback(
		(contact: TContact | null) => () => dispatch(setFavorite(contact || null)),
		[],
	);

	useEffect(() => {
		void dispatch(fetchContactList());
	}, [dispatch]);

	if (loading)
		return (
			<SafeScreen>
				<View
					style={[
						layout.flex_1,
						layout.itemsCenter,
						layout.justifyCenter,
						gutters.paddingHorizontal_12,
					]}
				>
					<Text style={[fonts.gray800]}>Loading...</Text>
				</View>
			</SafeScreen>
		);
	if (error)
		return (
			<SafeScreen>
				<View
					style={[
						layout.flex_1,
						layout.itemsCenter,
						layout.justifyCenter,
						gutters.paddingHorizontal_12,
					]}
				>
					<Text style={[fonts.gray800]}>Error: {error}</Text>
				</View>
			</SafeScreen>
		);

	return (
		<SafeScreen>
			<View style={[layout.flex_1, gutters.paddingHorizontal_12]}>
				<FlashList
					data={data}
					renderItem={({ item }) => (
						<CardContactItem
							onPress={handleGoToContactDetail(item.id)}
							onFavoritePress={handleFavorite(item)}
							id={item.id}
							name={item.name}
							phone={item.phone}
							isFavorited={item.id === favoritedContact?.id}
						/>
					)}
					extraData={{ favoritedContact }}
					keyExtractor={item => item.id}
					estimatedItemSize={80}
					ListHeaderComponent={
						<>
							<View style={[gutters.marginTop_40]}>
								<Text
									style={[
										fonts.gray800,
										fonts.bold,
										fonts.size_24,
										favoritedContact
											? gutters.marginBottom_12
											: gutters.marginBottom_24,
									]}
								>
									{t('contact_list:title')}
								</Text>
							</View>
							{!!favoritedContact && (
								<>
									<Text
										style={[
											fonts.gray800,
											fonts.bold,
											fonts.size_16,
											gutters.marginBottom_16,
										]}
									>
										Favorited Contact:
									</Text>
									<CardContactItem
										onPress={handleGoToContactDetail(favoritedContact.id)}
										onFavoritePress={handleFavorite(null)}
										id={favoritedContact.id}
										name={favoritedContact.name}
										phone={favoritedContact.phone}
										isFavorited
									/>
									<Spacer
										style={[backgrounds.gray100, gutters.marginBottom_12]}
										thickness={2}
									/>
									<Text
										style={[
											fonts.gray800,
											fonts.bold,
											fonts.size_16,
											gutters.marginBottom_16,
										]}
									>
										Your Contacts:
									</Text>
								</>
							)}
						</>
					}
				/>
			</View>
		</SafeScreen>
	);
}

export default ContactList;
