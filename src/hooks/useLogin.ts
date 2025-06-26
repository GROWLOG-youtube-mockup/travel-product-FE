import { api } from '@/lib/api';
import type { UserInformation } from '@/type/login';

// 백엔드 응답 예시 타입
interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    name: string;
    userId: number;
  };
  error: string | null;
}

// POST /auth/login
export const useLogin = async (payload: UserInformation) => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
};
