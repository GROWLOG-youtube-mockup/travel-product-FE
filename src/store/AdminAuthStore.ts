import { create } from 'zustand';

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

// localStorage에서 관리자 정보 읽기 헬퍼 함수
const getAdminData = () => {
  const stored = localStorage.getItem('admin-auth-store');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.state || {};
    } catch {
      return {};
    }
  }
  return {};
};

// localStorage에 관리자 정보 저장 헬퍼 함수
const setAdminData = (data: Partial<AdminAuthState>) => {
  const current = getAdminData();
  const updated = { ...current, ...data };
  localStorage.setItem('admin-auth-store', JSON.stringify({ state: updated }));
};

export const useAdminAuthStore = create<AdminAuthState>((set) => {
  const initialData = getAdminData();

  return {
    // 초기값을 localStorage에서 읽어옴
    isAdminLoggedIn: !!initialData.accessToken,
    name: initialData.name || null,
    userId: initialData.userId || null,
    roleCode: initialData.roleCode || null,
    accessToken: initialData.accessToken || null,

    login: (token, name, userId, roleCode) => {
      const newState = {
        isAdminLoggedIn: true,
        accessToken: token,
        name,
        userId,
        roleCode
      };

      // localStorage에 저장 (기존 키 유지)
      setAdminData(newState);

      // 일반 사용자 토큰과 동일한 키에도 저장 (API 호환성)
      localStorage.setItem('accessToken', token);

      // 상태 업데이트
      set(newState);
    },

    logout: () => {
      const newState = {
        isAdminLoggedIn: false,
        accessToken: null,
        name: null,
        userId: null,
        roleCode: null
      };

      // localStorage에서 제거
      localStorage.removeItem('admin-auth-store');
      localStorage.removeItem('accessToken');

      // 상태 초기화
      set(newState);

      const lastSafePath = sessionStorage.getItem('lastSafePath');
      if (lastSafePath?.startsWith('/admin')) {
        sessionStorage.removeItem('lastSafePath');
      }
    },

    checkAuth: () => {
      const data = getAdminData();
      set({
        isAdminLoggedIn: !!data.accessToken
      });
    },

    getAccessToken: () => {
      const data = getAdminData();
      return data.accessToken || null;
    }
  };
});

// 전역에서 사용할 수 있는 헬퍼 함수
export const getAuthAccessToken = () => {
  const data = getAdminData();
  return data.accessToken || null;
};

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface AdminAuthState {
//   isAdminLoggedIn: boolean;
//   name: string | null;
//   userId: number | null;
//   roleCode: number | null;
//   accessToken: string | null;
//   login: (token: string, name: string, userId: number, roleCode: number) => void;
//   logout: () => void;
//   checkAuth: () => void;
//   getAccessToken: () => string | null;
// }

// export const useAdminAuthStore = create<AdminAuthState>()(
//   persist(
//     (set, get) => ({
//       isAdminLoggedIn: false,
//       name: null,
//       userId: null,
//       roleCode: null,
//       accessToken: null,

//       login: (token, name, userId, roleCode) => {
//         set({
//           isAdminLoggedIn: true,
//           accessToken: token,
//           name,
//           userId,
//           roleCode
//         });
//       },

//       logout: () => {
//         set({
//           isAdminLoggedIn: false,
//           accessToken: null,
//           name: null,
//           userId: null,
//           roleCode: null
//         });
//         localStorage.removeItem('admin-auth-store');
//         const lastSafePath = sessionStorage.getItem('lastSafePath');
//         if (lastSafePath?.startsWith('/admin')) {
//           sessionStorage.removeItem('lastSafePath');
//         }
//       },

//       checkAuth: () => {
//         const { accessToken } = get();
//         set({
//           isAdminLoggedIn: !!accessToken
//         });
//       },

//       getAccessToken: () => {
//         return get().accessToken;
//       }
//     }),
//     {
//       name: 'admin-auth-store'
//     }
//   )
// );

// // 전역에서 사용할 수 있는 헬퍼 함수
// export const getAuthAccessToken = () => {
//   return useAdminAuthStore.getState().accessToken;
// };
