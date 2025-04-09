import React from 'react'
import {
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { Product } from '../types/product'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { updateQuantity, setCheckoutVisible, clearCart } from '../store/cartSlice'

type CartScreenProps = {
	navigation: any
}

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
	const dispatch = useDispatch()
	const { items: cartItems, isCheckoutVisible } = useSelector(
		(state: RootState) => state.cart,
	)

	const calculateTotal = () => {
		return cartItems
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2)
	}

	const handleCheckout = () => {
		dispatch(setCheckoutVisible(true))
	}

	const handleConfirmOrder = () => {
		dispatch(setCheckoutVisible(false))
		dispatch(clearCart())
		navigation.navigate('ProductList')
	}

	const renderItem = ({ item }: { item: Product & { quantity: number } }) => (
		<View style={styles.cartItem}>
			<View style={styles.itemInfo}>
				<Text style={styles.itemTitle}>{item.title}</Text>
				<Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
			</View>
			<View style={styles.quantityControls}>
				<TouchableOpacity
					style={styles.quantityButton}
					onPress={() =>
						dispatch(updateQuantity({ itemId: item.id, increment: false }))
					}>
					<Text style={styles.quantityButtonText}>-</Text>
				</TouchableOpacity>
				<Text style={styles.quantity}>{item.quantity}</Text>
				<TouchableOpacity
					style={styles.quantityButton}
					onPress={() =>
						dispatch(updateQuantity({ itemId: item.id, increment: true }))
					}>
					<Text style={styles.quantityButtonText}>+</Text>
				</TouchableOpacity>
			</View>
		</View>
	)

	return (
		<View style={styles.container}>
			<FlatList
				data={cartItems}
				renderItem={renderItem}
				keyExtractor={item => item.id.toString()}
				ListEmptyComponent={
					<Text style={styles.emptyCart}>Your cart is empty</Text>
				}
			/>
			{cartItems.length > 0 && (
				<View style={styles.bottomSheet}>
					<Text style={styles.total}>Total: ${calculateTotal()}</Text>
					<TouchableOpacity
						style={styles.checkoutButton}
						onPress={handleCheckout}>
						<Text style={styles.checkoutButtonText}>Checkout</Text>
					</TouchableOpacity>
				</View>
			)}

			<Modal
				visible={isCheckoutVisible}
				animationType="slide"
				transparent={true}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Order Summary</Text>
						{cartItems.map(item => (
							<View key={item.id} style={styles.summaryItem}>
								<Text style={styles.summaryItemTitle}>{item.title}</Text>
								<Text style={styles.summaryItemDetails}>
									{item.quantity} x ${item.price.toFixed(2)}
								</Text>
							</View>
						))}
						<Text style={styles.summaryTotal}>
							Total: ${calculateTotal()}
						</Text>
						<TouchableOpacity
							style={styles.confirmButton}
							onPress={handleConfirmOrder}>
							<Text style={styles.confirmButtonText}>Confirm Order</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cancelButton}
							onPress={() => dispatch(setCheckoutVisible(false))}>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	cartItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		backgroundColor: 'white',
		marginVertical: 4,
		marginHorizontal: 8,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	itemInfo: {
		flex: 1,
		marginRight: 16,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	itemPrice: {
		fontSize: 14,
		color: '#2196F3',
	},
	quantityControls: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	quantityButton: {
		backgroundColor: '#f0f0f0',
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	quantityButtonText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	quantity: {
		fontSize: 16,
		marginHorizontal: 12,
	},
	bottomSheet: {
		backgroundColor: 'white',
		padding: 16,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	total: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	checkoutButton: {
		backgroundColor: '#2196F3',
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
	},
	checkoutButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	emptyCart: {
		textAlign: 'center',
		fontSize: 16,
		color: '#666',
		marginTop: 32,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 24,
		borderRadius: 16,
		width: '90%',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 16,
		textAlign: 'center',
	},
	summaryItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	summaryItemTitle: {
		flex: 1,
		fontSize: 14,
	},
	summaryItemDetails: {
		fontSize: 14,
		color: '#666',
	},
	summaryTotal: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 16,
		marginBottom: 24,
		textAlign: 'right',
	},
	confirmButton: {
		backgroundColor: '#4CAF50',
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
		marginBottom: 8,
	},
	confirmButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	cancelButton: {
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
	},
	cancelButtonText: {
		color: '#666',
		fontSize: 16,
	},
})