import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import productGroupReducer from '../features/productGroup/productGroupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    productGroup: productGroupReducer,
  },
});
