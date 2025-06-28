import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminAuthState {
  isAdminLoggedIn: boolean;
  name: string | null;
  userId: number | null;
  roleCode: number | null;
  accessToken: string | null;
  login: (token: string, name: string, userId: number, roleCode: number) => void;
  logout: () => void;
  checkAuth: () => void;
  getAccessToken: () => string | null;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      isAdminLoggedIn: false,
      name: null,
      userId: null,
      roleCode: null,
      accessToken: null,

      login: (token, name, userId, roleCode) => {
        set({
          isAdminLoggedIn: true,
          accessToken: token,
          name,
          userId,
          roleCode
        });
      },

      logout: () => {
        set({
          isAdminLoggedIn: false,
          accessToken: null,
          name: null,
          userId: null,
          roleCode: null
        });
        localStorage.removeItem('admin-auth-store');
        const lastSafePath = sessionStorage.getItem('lastSafePath');
        if (lastSafePath?.startsWith('/admin')) {
          sessionStorage.removeItem('lastSafePath');
        }
      },

      checkAuth: () => {
        const { accessToken } = get();
        set({
          isAdminLoggedIn: !!accessToken
        });
      },

      getAccessToken: () => {
        return get().accessToken;
      }
    }),
    {
      name: 'admin-auth-store'
    }
  )
);

// 전역에서 사용할 수 있는 헬퍼 함수
export const getAuthAccessToken = () => {
  return useAdminAuthStore.getState().accessToken;
};
