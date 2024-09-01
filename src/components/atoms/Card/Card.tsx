/* eslint-disable react-native/no-inline-styles */
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

function Card({
	children,
	style = {},
	isPressed = false,
}: {
	children: JSX.Element | JSX.Element[];
	style?: ViewStyle | ViewStyle[];
	isPressed?: boolean;
}) {
	const { layout, gutters, borders, backgrounds } = useTheme();

	return (
		<View
			style={[
				layout.relative,
				backgrounds.gray100,
				borders.gray200,
				borders.w_1,
				borders.rounded_16,
				{
					paddingHorizontal: isPressed ? 0 : 4,
					paddingBottom: isPressed ? 0 : 6,
					marginBottom: isPressed ? 16 : 10,
				},
			]}
		>
			<View
				style={[
					gutters.padding_12,
					borders.gray200,
					borders.w_1,
					borders.rounded_16,
					backgrounds.gray50,
					{
						marginTop: -gutters.marginTop_12.marginTop,
					},
					style,
				]}
			>
				{children}
			</View>
		</View>
	);
}

export default Card;
