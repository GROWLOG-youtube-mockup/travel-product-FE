export interface AdminLoginResponse {
  success: boolean;
  data: {
    userId: number;
    name: string;
    accessToken: string;
  };
  message?: string;
  error?: {
    code: string;
    message: string;
  };
}
