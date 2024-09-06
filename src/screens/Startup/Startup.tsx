import { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import * as Updates from 'expo-updates';

import { useTheme } from '@/theme';
import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';

import type { RootScreenProps } from '@/types/navigation';

function Startup({ navigation }: RootScreenProps<'Startup'>) {
	const { layout } = useTheme();

	const redirectToDashboard = () => {
		setTimeout(() => {
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: 'ContactList' }],
				}),
			);
		}, 1000);
	};
	async function onFetchUpdateAsync() {
		try {
			if (__DEV__) {
				return redirectToDashboard();
			}
			const update = await Updates.checkForUpdateAsync();
			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
			return redirectToDashboard();
		} catch (error) {
			Alert.alert('error', `${JSON.stringify(error)}`);
			return null;
		}
	}

	useEffect(() => {
		void onFetchUpdateAsync();
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
