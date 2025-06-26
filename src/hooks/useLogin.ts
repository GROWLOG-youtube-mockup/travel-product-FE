import { api } from '@/lib/api';
import type { UserInformation } from '@/type/login';

// 백엔드 응답 예시 타입
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    roles: string[];
  };
}

// POST /auth/login
export const useLogin = async (payload: UserInformation) => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
};
