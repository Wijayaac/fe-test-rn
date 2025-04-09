import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

type CategoryTabsProps = {
	categories: string[]
	selectedCategory: string
	onSelectCategory: (category: string) => void
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
	categories,
	selectedCategory,
	onSelectCategory,
}) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.container}>
			{categories.map(category => (
				<TouchableOpacity
					key={category}
					style={[
						styles.tab,
						selectedCategory === category && styles.selectedTab,
					]}
					onPress={() => onSelectCategory(category)}>
					<Text
						style={[
							styles.tabText,
							selectedCategory === category && styles.selectedTabText,
						]}>
						{category}
					</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 0,
		backgroundColor: 'white',
		paddingVertical: 8,
	},
	tab: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginHorizontal: 4,
		borderRadius: 20,
		backgroundColor: '#f0f0f0',
	},
	selectedTab: {
		backgroundColor: '#2196F3',
	},
	tabText: {
		fontSize: 14,
		color: '#666',
	},
	selectedTabText: {
		color: 'white',
	},
})