import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/cart";

// Fetch Cart from API
export const fetchCart = createAsyncThunk("cart/", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return thunkAPI.rejectWithValue("You need to be logged in to view the cart.");
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the cart data
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch the cart. Please try again."
    );
  }
});

// Add Item to Cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ foodItemId, quantity, options, img }, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return thunkAPI.rejectWithValue("You need to be logged in to add items to the cart.");
      }

      const payload = {
        foodItemId,
        quantity,
        options: [
          {
            name: options.name,
            price: options.price,
          },
        ],
        img
      };

      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data; // Return the updated cart from the server
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add item to the cart. Please try again."
      );
    }
  }
);

// Remove Item from Cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (cartItemId, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return thunkAPI.rejectWithValue("You need to be logged in to remove items from the cart.");
      }

      const response = await axios.delete(`${API_URL}/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Return the updated cart from the server
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove item from the cart. Please try again."
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch the cart.";
        state.loading = false;
      })

      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to add item to the cart.";
        state.loading = false;
      })

      // Remove Item from Cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove item from the cart.";
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
