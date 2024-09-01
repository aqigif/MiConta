import { useEffect } from 'react';
import { View } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';

import type { RootScreenProps } from '@/types/navigation';

function Startup({ navigation }: RootScreenProps<'Startup'>) {
	const { layout } = useTheme();

	useEffect(() => {
		setTimeout(() => {
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: 'ContactList' }],
				}),
			);
		}, 1000);
	}, []);

	return (
		<SafeScreen>
			<View
				style={[
					layout.flex_1,
					layout.col,
					layout.itemsCenter,
					layout.justifyCenter,
				]}
			>
				<Brand />
			</View>
		</SafeScreen>
	);
}

export default Startup;
