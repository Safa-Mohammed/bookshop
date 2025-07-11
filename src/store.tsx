// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Modules/HomeModule/components/Home/Redux/cartSlice';
import categoryReducer from './Modules/HomeModule/components/Home/Redux/categorySlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;