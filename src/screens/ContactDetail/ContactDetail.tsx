import {
	View,
	Text,
	Pressable,
	ScrollView,
	RefreshControl,
} from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { ArrowLeft, StarFilled, StarOutlined } from '@/theme/assets/icons';
import { RootScreenProps } from '@/types/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchContactDetail, setFavorite } from '@/stores/actions';
import { getInitials } from '@/utils/string';
import { Button } from '@/components/atoms';

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
	const [isRefresh, setRefresh] = useState(false);

	const isCurrentIsFavoritedContact = useMemo(
		() => contact?.recordID === favoritedContact?.recordID,
		[contact, favoritedContact],
	);

	const handleRefresh = useCallback(() => {
		setRefresh(true);
		setTimeout(() => {
			if (id) {
				void dispatch(fetchContactDetail(id));
			}
			setTimeout(() => {
				setRefresh(false);
			}, 500);
		}, 500);
	}, [id]);

	useEffect(() => {
		if (id) {
			void dispatch(fetchContactDetail(id));
		}
	}, [dispatch, id]);

	const memoizedInitialsName = useMemo(
		() => getInitials(contact?.displayName),
		[contact?.displayName],
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
			<Pressable
				style={[gutters.padding_24]}
				onPress={() => navigation.goBack()}
			>
				<ArrowLeft />
			</Pressable>
			<View style={[layout.flex_1, gutters.paddingHorizontal_24]}>
				<View style={[layout.flex_1]}>
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={isRefresh}
								onRefresh={() => handleRefresh()}
							/>
						}
						style={[layout.flex_1]}
					>
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
							{contact.displayName}
						</Text>
						<Text
							style={[fonts.gray800, fonts.size_16, gutters.marginBottom_12]}
						>
							{contact.phoneNumbers?.[0]?.number}
						</Text>
						<Text
							style={[fonts.gray800, fonts.size_16, gutters.marginBottom_12]}
						>
							{contact.emailAddresses?.[0]?.email}
						</Text>
						<Text style={[fonts.gray800, fonts.size_16]}>
							{contact?.postalAddresses?.[0]?.formattedAddress}
						</Text>
					</ScrollView>
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
