import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { Card } from '@/components/atoms';
import { FlashList } from '@shopify/flash-list';

import { Contacts } from '@/types/contacts';
import { useMemo } from 'react';

import contactListDummyData from '@/dummy_data/contacts_list.json';
import { RootScreenProps } from '@/types/navigation';

const contacts: Contacts = contactListDummyData;

function ContactList({ navigation }: RootScreenProps<'ContactList'>) {
	const { t } = useTranslation(['contact_list']);

	const { gutters, fonts, layout, components } = useTheme();

	const contactsMemoizedData = useMemo(
		() => contacts.sort((a, b) => a.name.localeCompare(b.name)),
		[],
	);
	return (
		<SafeScreen>
			<View style={[layout.flex_1, gutters.paddingHorizontal_12]}>
				<FlashList
					data={contactsMemoizedData}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={[gutters.marginBottom_12]}
							onPress={() => navigation.navigate('ContactDetail')}
						>
							<Card style={[layout.row, layout.itemsCenter, gutters.gap_12]}>
								<View style={[components.avatarCircle]} />
								<View>
									<Text style={[fonts.gray800, fonts.bold, fonts.size_16]}>
										{item.name}
									</Text>
									<Text style={[fonts.gray800, fonts.size_12]}>
										{item.phone}
									</Text>
								</View>
							</Card>
						</TouchableOpacity>
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
