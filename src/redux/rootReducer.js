import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from './slices/menuSlices';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
});

export default rootReducer;
