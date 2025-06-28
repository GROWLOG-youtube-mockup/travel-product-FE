// POST /auth/login 응답 처리
export const handleAuthLoginResponse = (
  token: string,
  name: string,
  userId: number,
  roleCode: number
) => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('adminName', name);
  localStorage.setItem('adminUserId', userId.toString());
  localStorage.setItem('adminRoleCode', roleCode.toString());
};

// 로그아웃 처리
export const handleAuthLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('adminName');
  localStorage.removeItem('adminUserId');
  localStorage.removeItem('adminRoleCode');
};

// accessToken 조회
export const getAuthAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};
