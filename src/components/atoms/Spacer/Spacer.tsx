import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
	thickness?: number;
	style?: ViewStyle | ViewStyle[];
	vertical?: boolean;
};

const styles = StyleSheet.create({
	horizontal: {
		width: '100%',
	},
	vertical: {
		height: '100%',
	},
});

function Spacer({ thickness = 1, style = {}, vertical = false }: Props) {
	return (
		<View
			style={[
				vertical ? styles.vertical : styles.horizontal,
				// eslint-disable-next-line react-native/no-inline-styles
				{
					height: vertical ? '100%' : thickness,
					width: vertical ? thickness : '100%',
				},
				style,
			]}
		/>
	);
}

export default Spacer;
