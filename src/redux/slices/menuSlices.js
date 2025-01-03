import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch food items
export const fetchFoodItems = createAsyncThunk(
  'menu/fetchFoodItems',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/food-items');
      if (response.data.success) {
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue('Failed to fetch food items');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch food categories
export const fetchFoodCategories = createAsyncThunk(
  'menu/fetchFoodCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/food-categories');
      if (response.data.success) {
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue('Failed to fetch food categories');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    foodItems: [],
    foodCategories: [],
    selectedCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Handle category selection
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    // Clear selected category (view all)
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Food items fetching
      .addCase(fetchFoodItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodItems.fulfilled, (state, action) => {
        state.foodItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchFoodItems.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Food categories fetching
      .addCase(fetchFoodCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodCategories.fulfilled, (state, action) => {
        state.foodCategories = action.payload;
        state.loading = false;
      })
      .addCase(fetchFoodCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedCategory, clearSelectedCategory } = menuSlice.actions;
export default menuSlice.reducer;
