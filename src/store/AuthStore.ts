import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getAuthAccessToken, handleAuthLoginResponse, handleAuthLogout } from '@/utils/auth';

interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;
  userId: number | null;
  login: (token: string, name: string, userId: number) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: !!getAuthAccessToken(),
      userName: localStorage.getItem('adminName'),
      userId: Number(localStorage.getItem('adminUserId')) || null,

      login: (token, name, userId) => {
        handleAuthLoginResponse(token, name, userId);
        set({ isLoggedIn: true, userName: name, userId });
      },

      logout: () => {
        handleAuthLogout();
        set({ isLoggedIn: false, userName: null, userId: null });
      },

      checkAuth: () => {
        const token = getAuthAccessToken();
        const name = localStorage.getItem('adminName');
        const userId = Number(localStorage.getItem('adminUserId')) || null;
        set({ isLoggedIn: !!token, userName: name, userId });
      }
    }),
    {
      name: 'auth-store'
    }
  )
);
