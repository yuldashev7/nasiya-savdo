import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../store/product-reducer';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
