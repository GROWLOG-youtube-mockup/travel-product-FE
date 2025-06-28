import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getAuthAccessToken, handleAuthLoginResponse, handleAuthLogout } from '@/utils/auth';

interface AdminAuthState {
  isAdminLoggedIn: boolean;
  userName: string | null;
  userId: number | null;
  roleCode: number | null;
  login: (token: string, name: string, userId: number, roleCode: number) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAdminLoggedIn: !!getAuthAccessToken(),
      userName: localStorage.getItem('adminName'),
      userId: Number(localStorage.getItem('adminUserId')) || null,
      roleCode: Number(localStorage.getItem('adminRoleCode')) || null,

      login: (token, name, userId, roleCode) => {
        handleAuthLoginResponse(token, name, userId, roleCode);
        set({
          isAdminLoggedIn: true,
          userName: name,
          userId,
          roleCode
        });
      },

      logout: () => {
        handleAuthLogout();
        set({
          isAdminLoggedIn: false,
          userName: null,
          userId: null,
          roleCode: null
        });
      },

      checkAuth: () => {
        const token = getAuthAccessToken();
        const name = localStorage.getItem('adminName');
        const userId = Number(localStorage.getItem('adminUserId')) || null;
        const roleCode = Number(localStorage.getItem('adminRoleCode')) || null;

        set({
          isAdminLoggedIn: !!token,
          userName: name,
          userId,
          roleCode
        });
      }
    }),
    {
      name: 'admin-auth-store'
    }
  )
);
