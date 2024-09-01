import { View, Text, Pressable } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { Contact } from '@/types/contacts';
import { ArrowLeft } from '@/theme/assets/icons';
import { RootScreenProps } from '@/types/navigation';

const contact: Contact = {
	id: '8a1e1757-3aac-450a-aebe-111df51c9740',
	name: 'Aaron Phillips',
	email: 'crussell@hotmail.com',
	phone: '+1 001-245-8167',
	address: {
		street: '87864 Roberts Pike Suite 192',
		city: 'Blairmouth',
		state: 'Texas',
		zip: '42265',
	},
};

function ContactDetail({ navigation }: RootScreenProps<'ContactDetail'>) {
	const { gutters, fonts, layout, components } = useTheme();

	return (
		<SafeScreen>
			<View style={[layout.flex_1, gutters.paddingHorizontal_12]}>
				<View style={[gutters.paddingHorizontal_16]}>
					<Pressable
						style={[gutters.marginBottom_24]}
						onPress={() => navigation.goBack()}
					>
						<ArrowLeft />
					</Pressable>
					<View style={[components.avatarBigCircle, gutters.marginBottom_16]} />
					<Text style={[fonts.size_24, fonts.bold, gutters.marginBottom_12]}>
						{contact.name}
					</Text>
					<Text style={[fonts.size_16, gutters.marginBottom_12]}>
						{contact.email}
					</Text>
					<Text style={[fonts.size_16, gutters.marginBottom_12]}>
						{contact.phone}
					</Text>
					<Text style={[fonts.size_16]}>
						{`${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.zip}`}
					</Text>
				</View>
			</View>
		</SafeScreen>
	);
}

export default ContactDetail;
