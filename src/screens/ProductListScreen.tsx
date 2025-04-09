import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TextInput, View, ActivityIndicator, Text } from 'react-native'
import { CategoryTabs } from '../components/CategoryTabs'
import { ProductCard } from '../components/ProductCard'
import { Product } from '../types/product'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { fetchProducts, fetchCategories, setSelectedCategory, setSearchQuery, toggleFavorite, setPage } from '../store/productSlice'

type ProductListScreenProps = {
	navigation: any
}

export const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
	const dispatch = useDispatch()
	const { products, loading, categories, selectedCategory, searchQuery, favorites, page, limit, totalProducts } = useSelector((state: RootState) => state.product)

	useEffect(() => {
		dispatch(fetchCategories())
		dispatch(fetchProducts({ page, limit, category: selectedCategory }))
	}, [])

	useEffect(() => {
		dispatch(fetchProducts({ page, limit, category: selectedCategory }))
	}, [page, selectedCategory])

	const handleLoadMore = () => {
		if (!loading && products.length < totalProducts) {
			dispatch(setPage(page + 1))
		}
	}

	const filteredProducts = products.filter(product =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const renderFooter = () => {
		if (!loading) return null
		return (
			<View style={styles.loadingFooter}>
				<ActivityIndicator size="large" color="#2196F3" />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.searchInput}
				placeholder="Search products..."
				value={searchQuery}
				onChangeText={(text) => dispatch(setSearchQuery(text))}
			/>
			<CategoryTabs
				categories={categories.map(category => typeof category === 'string' ? category : category.name)}
				selectedCategory={selectedCategory}
				onSelectCategory={(category) => dispatch(setSelectedCategory(category))}
			/>
			<FlatList
				data={filteredProducts}
				renderItem={({ item }) => (
					<ProductCard
						{...item}
						onPress={() => navigation.navigate('ProductDetails', { product: item })}
						onFavoritePress={() => dispatch(toggleFavorite(item.id))}
						isFavorite={favorites.includes(item.id)}
					/>
				)}
				keyExtractor={item => item.id.toString()}
				numColumns={2}
				contentContainerStyle={styles.productList}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				ListFooterComponent={renderFooter}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							{loading ? 'Loading products...' : 'No products found'}
						</Text>
					</View>
				}
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
	loadingFooter: {
		padding: 16,
		alignItems: 'center',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	emptyText: {
		fontSize: 16,
		color: '#666',
	},
})