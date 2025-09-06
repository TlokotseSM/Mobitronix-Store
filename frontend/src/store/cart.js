import { create } from 'zustand';
import { getCart, addToCart, removeFromCart } from '../api/api';

export const useCartStore = create((set, get) => ({
  cart: {},
  fetchCart: async (token) => {
    const cart = await getCart(token);
    set({ cart });
  },
  addToCart: async (productId, quantity, token) => {
    const cart = await addToCart(productId, quantity, token);
    set({ cart });
  },
  removeFromCart: async (productId, token) => {
    const cart = await removeFromCart(productId, token);
    set({ cart });
  },
}));
