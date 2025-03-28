import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";  // Import product slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,  // Add to store
  },
});

export default store;