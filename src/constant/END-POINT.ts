// src/constants/api.ts
export const BASE_URL = 'https://upskilling-egypt.com:3007/api';

export const AUTH_URLS = {
  Login: `${BASE_URL}/auth/login`,
  Register: `${BASE_URL}/auth/register`,
  ForgetPassword: `${BASE_URL}/auth/forgot-password`,
  ResetPassword: `${BASE_URL}/auth/reset-password`,
  ChangePassword: `${BASE_URL}/auth/change-password`,
};

export const BOOK_URLS = {
  GetAllBooks: `${BASE_URL}/book`,
  GetBookById: (id: string) => `${BASE_URL}/book/${id}`,
};

export const CART_URLS = {
  GetCart: `${BASE_URL}/basket`,
  AddCartItem: `${BASE_URL}/basket/item`,
  UpdateCart: (cartId: string) => `${BASE_URL}/basket/${cartId}`,
  DeleteCartItem: (itemId: string) => `${BASE_URL}/basket/item/${itemId}`,
};

export const CATEGORY_URLS = {
  GetAllCategories: `${BASE_URL}/category`,
  GetCategoryById: (id: string) => `${BASE_URL}/category/${id}`,
  GetCategoryBooks: (id: string) => `${BASE_URL}/category/${id}/books`,
};

export const ORDER_URLS = {
  CreateOrder: (cartId: string) => `${BASE_URL}/order/${cartId}`,
};

export const PAYMENT_URLS = {
  ProcessPayment: `${BASE_URL}/payment`,
};