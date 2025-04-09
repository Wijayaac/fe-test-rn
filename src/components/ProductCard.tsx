import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { Product } from '../types/product'
import { prefetchImage, getImageDimensions } from '../utils/imageCache'

type ProductCardProps = Product & {
	onPress: () => void
	onFavoritePress: () => void
	isFavorite: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({
	id,
	title,
	price,
	images,
	onPress,
	onFavoritePress,
	isFavorite,
}) => {
	const [imageLoading, setImageLoading] = React.useState(true)
	const [imageError, setImageError] = React.useState(false)

	useEffect(() => {
		prefetchImage(images[0])
	}, [images])

	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: images[0] }}
					style={styles.image}
					onLoadStart={() => setImageLoading(true)}
					onLoadEnd={() => setImageLoading(false)}
					onError={() => setImageError(true)}
					loadingIndicatorSource={require('../../src/assets/placeholder.png')}
				/>
				{imageLoading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator size="small" color="#2196F3" />
					</View>
				)}
			</View>
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={2}>
					{title}
				</Text>
				<Text style={styles.price}>${price.toFixed(2)}</Text>
			</View>
			<TouchableOpacity
				style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
				onPress={onFavoritePress}>
				<Text style={styles.favoriteButtonText}>♥</Text>
			</TouchableOpacity>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 8,
		backgroundColor: 'white',
		borderRadius: 8,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	imageContainer: {
		position: 'relative',
		width: '100%',
		height: 150,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	loadingOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		padding: 12,
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 8,
	},
	price: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#2196F3',
	},
	favoriteButton: {
		position: 'absolute',
		top: 8,
		right: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	favoriteButtonActive: {
		backgroundColor: '#ff4081',
	},
	favoriteButtonText: {
		color: '#ff4081',
		fontSize: 18,
		fontWeight: 'bold',
	},
})