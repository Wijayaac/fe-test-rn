import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import { CategoryTabs } from '../components/CategoryTabs'
import { ProductCard } from '../components/ProductCard'
import { Product } from '../types/product'

type ProductListScreenProps = {
	navigation: any
}

export const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [favorites, setFavorites] = useState<number[]>([])

	useEffect(() => {
		fetchCategories()
		fetchProducts()
	}, [])

	const toggleFavorite = (productId: number) => {
		setFavorites(prev =>
			prev.includes(productId)
				? prev.filter(id => id !== productId)
				: [...prev, productId],
		)
	}

	const filteredProducts = products.filter(product =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.searchInput}
				placeholder="Search products..."
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>
			<CategoryTabs
				categories={categories}
				selectedCategory={selectedCategory}
				onSelectCategory={setSelectedCategory}
			/>
			<FlatList
				data={filteredProducts}
				renderItem={({ item }) => (
					<ProductCard
						{...item}
						onPress={() => navigation.navigate('ProductDetails', { product: item })}
						onFavoritePress={() => toggleFavorite(item.id)}
						isFavorite={favorites.includes(item.id)}
					/>
				)}
				keyExtractor={item => item.id.toString()}
				numColumns={2}
				contentContainerStyle={styles.productList}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	searchInput: {
		margin: 16,
		padding: 8,
		backgroundColor: 'white',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	productList: {
		paddingHorizontal: 8,
	},
})