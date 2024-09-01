import 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/theme';

import { store } from './stores/store';
import ApplicationNavigator from './navigators/Application';
import './translations';

export const storage = new MMKV();

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider storage={storage}>
				<ApplicationNavigator />
			</ThemeProvider>
		</Provider>
	);
}

export default App;
