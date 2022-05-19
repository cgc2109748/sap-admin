import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import productLogsReducer from '../features/productLogs/productLogsSlice';
import productGroupReducer from '../features/productGroup/productGroupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    productLogs: productLogsReducer,
    productGroup: productGroupReducer,
  },
});
