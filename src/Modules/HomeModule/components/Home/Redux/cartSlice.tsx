// src/features/cart/cartSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../../store';
import {  BOOK_URLS, CART_URLS } from '../../../../../constant/END-POINT';

interface Book {
  _id: string;
  name: string;
  author: string;
  price: number;
  image?: string;
}

interface CartItem {
  _id: string;
  book: string;
  quantity: number;
}

interface CartResponse {
  _id: string;
  customer: string;
  items: CartItem[];
  total: number;
}

interface CartState {
  cart: CartResponse;
  booksMap: Record<string, Book>;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: { _id: '', customer: '', items: [], total: 0 },
  booksMap: {},
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (token: string) => {
  const res = await fetch(CART_URLS.GetCart, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch cart');
  return await res.json();
});

export const fetchBooks = createAsyncThunk('cart/fetchBooks', async () => {
  const res = await fetch(BOOK_URLS.GetAllBooks);
  if (!res.ok) throw new Error('Failed to fetch books');
  const data = await res.json();
  const booksMap: Record<string, Book> = {};
  (data.data || []).forEach((book: Book) => {
    booksMap[book._id] = book;
  });
  return booksMap;
});

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (
    {
      token,
      cartId,
      items,
    }: { token: string; cartId: string; items: { book: string; quantity: string }[] },
    { dispatch }
  ) => {
    const res = await fetch(CART_URLS.UpdateCart(cartId), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error('Failed to update cart');
    dispatch(fetchCart(token));
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ token, itemId }: { token: string; itemId: string }, { dispatch }) => {
    const res = await fetch(CART_URLS.DeleteCartItem(itemId), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete cart item');
    dispatch(fetchCart(token));
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Record<string, Book>>) => {
        state.booksMap = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch cart';
        state.loading = false;
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;