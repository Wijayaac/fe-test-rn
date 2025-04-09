import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { ProductListScreen } from './src/screens/ProductListScreen'
import { ProductDetailsScreen } from './src/screens/ProductDetailsScreen'
import { CartScreen } from './src/screens/CartScreen'

const Stack = createNativeStackNavigator()

function App(): React.JSX.Element {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="ProductList"
					screenOptions={{
						headerStyle: {
							backgroundColor: '#2196F3',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
					}}>
					<Stack.Screen
						name="ProductList"
						component={ProductListScreen}
						options={{ title: 'Products' }}
					/>
					<Stack.Screen
						name="ProductDetails"
						component={ProductDetailsScreen}
						options={{ title: 'Product Details' }}
					/>
					<Stack.Screen
						name="Cart"
						component={CartScreen}
						options={{ title: 'Shopping Cart' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}

export default App
