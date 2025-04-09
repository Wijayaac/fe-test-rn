import React, { useState } from 'react'
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from 'react-native'
import { Product } from '../types/product'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

type ProductDetailsScreenProps = {
	route: {
		params: {
			product: Product
		}
	}
	navigation: any
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
	route,
	navigation,
}) => {
	const { product } = route.params
	const [quantity, setQuantity] = useState(1)
	const [imageLoading, setImageLoading] = useState(true)
	const dispatch = useDispatch()

	const handleAddToCart = () => {
		dispatch(addToCart({ ...product, quantity }))
		navigation.navigate('Cart')
	}

	const handleQuantityChange = (increment: boolean) => {
		setQuantity(prev => (increment ? prev + 1 : Math.max(1, prev - 1)))
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: product.images[0] }}
					style={styles.image}
					onLoadStart={() => setImageLoading(true)}
					onLoadEnd={() => setImageLoading(false)}
					loadingIndicatorSource={require('../../src/assets/placeholder.png')}
				/>
				{imageLoading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator size="large" color="#2196F3" />
					</View>
				)}
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>{product.title}</Text>
				<Text style={styles.price}>${product.price.toFixed(2)}</Text>
				<Text style={styles.description}>{product.description}</Text>
				<View style={styles.quantityContainer}>
					<Text style={styles.quantityLabel}>Quantity:</Text>
					<View style={styles.quantityControls}>
						<TouchableOpacity
							style={styles.quantityButton}
							onPress={() => handleQuantityChange(false)}>
							<Text style={styles.quantityButtonText}>-</Text>
						</TouchableOpacity>
						<Text style={styles.quantity}>{quantity}</Text>
						<TouchableOpacity
							style={styles.quantityButton}
							onPress={() => handleQuantityChange(true)}>
							<Text style={styles.quantityButtonText}>+</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
					<Text style={styles.addToCartButtonText}>Add to Cart</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	imageContainer: {
		position: 'relative',
		width: '100%',
		height: 300,
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
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	price: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#2196F3',
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		color: '#666',
		marginBottom: 24,
	},
	quantityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	quantityLabel: {
		fontSize: 16,
		marginRight: 16,
	},
	quantityControls: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	quantityButton: {
		backgroundColor: '#f0f0f0',
		borderRadius: 20,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	quantityButtonText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	quantity: {
		fontSize: 18,
		marginHorizontal: 16,
	},
	addToCartButton: {
		backgroundColor: '#2196F3',
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
	},
	addToCartButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
})