import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ProductCardProps = {
	id: number
	title: string
	description: string
	price: number
	image: string
	onPress: () => void
	onFavoritePress?: () => void
	isFavorite?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({
	title,
	description,
	price,
	image,
	onPress,
	onFavoritePress,
	isFavorite,
}) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={1}>
					{title}
				</Text>
				<Text style={styles.description} numberOfLines={2}>
					{description}
				</Text>
				<Text style={styles.price}>${price.toFixed(2)}</Text>
			</View>
			{onFavoritePress && (
				<TouchableOpacity
					style={styles.favoriteButton}
					onPress={onFavoritePress}>
					<Text>{isFavorite ? '❤️' : '🤍'}</Text>
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderRadius: 8,
		margin: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
	},
	content: {
		padding: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	description: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#2196F3',
	},
	favoriteButton: {
		position: 'absolute',
		top: 8,
		right: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 20,
		padding: 8,
	},
})