/* eslint-disable react-native/no-inline-styles */
import { Pressable, PressableProps, Text, View } from 'react-native';
import { useTheme } from '@/theme';

interface Props extends PressableProps {
	label: string | JSX.Element;
	icon?: JSX.Element | JSX.Element[] | null;
}

function Button({ label, icon = null, disabled, ...props }: Props) {
	const { layout, gutters, borders, backgrounds, fonts } = useTheme();

	return (
		<Pressable disabled={disabled} {...props}>
			{({ pressed: isPressed }) => (
				<View
					style={[
						layout.fullWidth,
						backgrounds.gray100,
						borders.gray200,
						borders.w_1,
						borders.rounded_16,
						gutters.marginTop_16,
						disabled || isPressed
							? {
									paddingRight: 0,
									paddingBottom: 0,
									marginBottom: 16,
							  }
							: {
									paddingRight: 4,
									paddingBottom: 6,
									marginBottom: 10,
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
							layout.row,
							layout.justifyCenter,
							layout.itemsCenter,
							gutters.gap_12,
							{
								marginTop: -12,
								marginLeft: -4,
							},
							disabled && backgrounds.gray100,
						]}
					>
						{icon}
						{typeof label === 'string' ? (
							<Text
								style={[
									fonts.size_16,
									fonts.alignCenter,
									disabled && fonts.gray200,
								]}
							>
								{label}
							</Text>
						) : (
							label
						)}
					</View>
				</View>
			)}
		</Pressable>
	);
}

export default Button;
