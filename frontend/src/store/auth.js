import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
