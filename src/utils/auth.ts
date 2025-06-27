// @/utils/auth.ts

const ACCESS_TOKEN_KEY = 'accessToken';
const ADMIN_NAME_KEY = 'adminName';
const ADMIN_USER_ID_KEY = 'adminUserId';

export const saveAuthToLocalStorage = (token: string, name: string, userId: number) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_NAME_KEY, name);
  localStorage.setItem(ADMIN_USER_ID_KEY, userId.toString());
};

export const clearAuthFromLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ADMIN_NAME_KEY);
  localStorage.removeItem(ADMIN_USER_ID_KEY);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};
