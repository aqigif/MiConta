import { Card } from '@/components/atoms';
import { useTheme } from '@/theme';
import { StarFilled, StarOutlined } from '@/theme/assets/icons';
import { TContact } from '@/types/contacts';
import { getInitials } from '@/utils/string';
import { useMemo } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

interface Props extends TContact {
	onPress?: () => void;
	onFavoritePress?: () => void;
	isFavorited?: boolean;
}

function CardContactItem({
	onPress = () => {},
	onFavoritePress = () => {},
	isFavorited = false,
	name,
	phone,
}: Props) {
	const { gutters, fonts, layout, components } = useTheme();

	const memoizedInitialsName = useMemo(() => getInitials(name), [name]);

	return (
		<Pressable style={[gutters.marginBottom_12]} onPress={onPress}>
			{({ pressed }) => (
				<Card
					isPressed={pressed}
					style={[layout.row, layout.itemsCenter, gutters.gap_12]}
				>
					<View style={[components.avatarCircle]}>
						<Text style={[fonts.gray800]}>{memoizedInitialsName}</Text>
					</View>
					<View style={[layout.flex_1]}>
						<Text style={[fonts.gray800, fonts.bold, fonts.size_16]}>
							{name}
						</Text>
						<Text style={[fonts.gray800, fonts.size_12]}>{phone}</Text>
					</View>
					<TouchableOpacity onPress={onFavoritePress}>
						{isFavorited ? <StarFilled /> : <StarOutlined />}
					</TouchableOpacity>
				</Card>
			)}
		</Pressable>
	);
}

export default CardContactItem;
