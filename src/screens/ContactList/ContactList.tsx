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

function ContactList({ navigation }: RootScreenProps<'ContactList'>) {
	const { t } = useTranslation(['contact_list']);
	const { gutters, fonts, layout } = useTheme();
	const { data, loading, error } = useAppSelector(state => state.contactList);

	const handleGoToContactDetail = useCallback(
		(id: string) => () => navigation.navigate('ContactDetail', { id }),
		[navigation],
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(fetchContactList());
	}, [dispatch]);

	if (loading)
		return (
			<SafeScreen>
				<View style={[layout.flex_1, gutters.paddingHorizontal_12]}>
					<Text>Loading...</Text>
				</View>
			</SafeScreen>
		);
	if (error)
		return (
			<SafeScreen>
				<View style={[layout.flex_1, gutters.paddingHorizontal_12]}>
					<Text>Error: {error}</Text>
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
							id={item.id}
							name={item.name}
							phone={item.phone}
							email={item.email}
							address={item.address}
						/>
					)}
					keyExtractor={item => item.id}
					estimatedItemSize={80}
					ListHeaderComponent={
						<View style={[gutters.marginTop_40]}>
							<Text
								style={[
									fonts.gray800,
									fonts.bold,
									fonts.size_24,
									gutters.marginBottom_32,
								]}
							>
								{t('contact_list:title')}
							</Text>
						</View>
					}
				/>
			</View>
		</SafeScreen>
	);
}

export default ContactList;
