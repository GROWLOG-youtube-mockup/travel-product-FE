export interface AdminLoginResponse {
  success: boolean;
  data: {
    userId: number;
    name: string;
    accessToken: string;
    roleCode: number; // 0: 일반 사용자, 1: 일반 관리자, 2: 최고 관리자
  } | null;
  error: {
    code: string;
    message: string;
  } | null;
}
