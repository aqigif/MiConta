import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { FlashList } from '@shopify/flash-list';

import { Contacts } from '@/types/contacts';
import { useCallback, useMemo } from 'react';

import contactListDummyData from '@/dummyDatas/contacts_list.json';
import { RootScreenProps } from '@/types/navigation';
import CardContactItem from '@/components/molecules/CardContactItem/CardContactItem';

const contacts: Contacts = contactListDummyData;

function ContactList({ navigation }: RootScreenProps<'ContactList'>) {
	const { t } = useTranslation(['contact_list']);

	const { gutters, fonts, layout } = useTheme();

	const contactsMemoizedData = useMemo(
		() => contacts.sort((a, b) => a.name.localeCompare(b.name)),
		[],
	);

	const handleGoToContactDetail = useCallback(
		(id: string) => () => navigation.navigate('ContactDetail', { id }),
		[navigation],
	);
	return (
		<SafeScreen>
			<View style={[layout.flex_1, gutters.paddingHorizontal_12]}>
				<FlashList
					data={contactsMemoizedData}
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
