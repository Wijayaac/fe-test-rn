import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../types/product';

interface ProductState {
  products: Product[];
  totalProducts: number;
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  favorites: number[];
  page: number;
  limit: number;
}

const initialState: ProductState = {
  products: [],
  totalProducts: 0,
  loading: false,
  error: null,
  categories: [],
  selectedCategory: 'all',
  searchQuery: '',
  favorites: [],
  page: 1,
  limit: 10,
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({
    page,
    limit,
    category,
  }: {
    page: number;
    limit: number;
    category: string;
  }) => {
    try {
      let url = 'https://dummyjson.com/products';

      // If category is specified and not 'all', append it to the URL
      if (category && category !== 'all') {
        url = `${url}/category/${category}`;
      }

      // Calculate skip for pagination and append query parameters
      const skip = (page - 1) * limit;
      url = `${url}?limit=${limit}&skip=${skip}`;

      const response = await fetch(url).catch(error => {
        console.error('Fetch error:', error);
        throw error;
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.products) {
        throw new Error('Invalid data format received from the API');
      }

      return data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to fetch products',
      );
    }
  },
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    return data;
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.page = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      // Reset page to 1 when searching to prevent pagination loop
      state.page = 1;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);
      if (index === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = ['all', ...action.payload];
      });
  },
});

export const {setSelectedCategory, setSearchQuery, toggleFavorite, setPage} =
  productSlice.actions;
export default productSlice.reducer;
