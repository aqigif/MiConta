import { View, Text, Pressable } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { ArrowLeft, StarFilled, StarOutlined } from '@/theme/assets/icons';
import { RootScreenProps } from '@/types/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useEffect, useMemo } from 'react';
import { fetchContactDetail } from '@/stores/actions/contact_action';
import { getInitials } from '@/utils/string';
import { Button } from '@/components/atoms';
import { setFavorite } from '@/stores/reducer/contact_favorite.reducer';

function ContactDetail({
	navigation,
	route,
}: RootScreenProps<'ContactDetail'>) {
	const { id } = route.params;

	const dispatch = useAppDispatch();
	const { gutters, fonts, layout, components } = useTheme();
	const {
		data: contact,
		loading,
		error,
	} = useAppSelector(state => state.contactDetail);
	const favoritedContact = useAppSelector(state => state.contactFavorite.data);

	const isCurrentIsFavoritedContact = useMemo(
		() => contact?.id === favoritedContact?.id,
		[contact, favoritedContact],
	);

	useEffect(() => {
		if (id) {
			void dispatch(fetchContactDetail(id));
		}
	}, [dispatch, id]);

	const memoizedInitialsName = useMemo(
		() => getInitials(contact?.name),
		[contact?.name],
	);

	if (loading)
		return (
			<SafeScreen>
				<View
					style={[
						layout.flex_1,
						layout.itemsCenter,
						layout.justifyCenter,
						gutters.paddingHorizontal_12,
					]}
				>
					<Text style={[fonts.gray800]}>Loading...</Text>
				</View>
			</SafeScreen>
		);
	if (error || !contact)
		return (
			<SafeScreen>
				<View
					style={[
						layout.flex_1,
						layout.itemsCenter,
						layout.justifyCenter,
						gutters.paddingHorizontal_12,
					]}
				>
					<Text style={[fonts.gray800]}>
						Error: {!contact ? 'contact not found' : error}
					</Text>
				</View>
			</SafeScreen>
		);

	return (
		<SafeScreen>
			<View style={[layout.flex_1, gutters.paddingHorizontal_12]}>
				<View style={[gutters.paddingHorizontal_16, layout.flex_1]}>
					<View style={[layout.flex_1]}>
						<Pressable
							style={[gutters.marginBottom_24]}
							onPress={() => navigation.goBack()}
						>
							<ArrowLeft />
						</Pressable>
						<View style={[components.avatarBigCircle, gutters.marginBottom_16]}>
							<Text style={[fonts.size_32, fonts.gray800]}>
								{memoizedInitialsName}
							</Text>
						</View>
						<Text
							style={[
								fonts.gray800,
								fonts.size_24,
								fonts.bold,
								gutters.marginBottom_12,
							]}
						>
							{contact.name}
						</Text>
						<Text
							style={[fonts.gray800, fonts.size_16, gutters.marginBottom_12]}
						>
							{contact.email}
						</Text>
						<Text
							style={[fonts.gray800, fonts.size_16, gutters.marginBottom_12]}
						>
							{contact.phone}
						</Text>
						<Text style={[fonts.gray800, fonts.size_16]}>
							{`${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.zip}`}
						</Text>
					</View>
					<Button
						onPress={() =>
							dispatch(
								setFavorite(isCurrentIsFavoritedContact ? null : contact),
							)
						}
						label={isCurrentIsFavoritedContact ? 'Unfavorite' : 'Favorite'}
						icon={
							isCurrentIsFavoritedContact ? <StarFilled /> : <StarOutlined />
						}
					/>
				</View>
			</View>
		</SafeScreen>
	);
}

export default ContactDetail;
