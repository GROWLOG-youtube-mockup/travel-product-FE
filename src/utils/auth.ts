// @/utils/auth.ts

// POST /auth/login 응답 처리용
export const handleAuthLoginResponse = (token: string, name: string, userId: number) => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('adminName', name);
  localStorage.setItem('adminUserId', userId.toString());
};

// 로그아웃 처리용
export const handleAuthLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('adminName');
  localStorage.removeItem('adminUserId');
};

// accessToken 조회용
export const getAuthAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};
