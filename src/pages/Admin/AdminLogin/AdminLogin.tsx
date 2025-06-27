import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import LoginForm from '@/components/LoginForm/LoginForm';
import type { UserInformation } from '@/types/login';
import { getAuthAccessToken, handleAuthLoginResponse } from '@/utils/auth';

import styles from './AdminLogin.module.scss';

interface AdminLoginResponse {
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

const AdminLoginPage = () => {
  const [loginError, setLoginError] = useState<string>('');

  useEffect(() => {
    const existingToken = getAuthAccessToken();
    if (existingToken) {
      window.location.href = '/admin/users';
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: UserInformation): Promise<AdminLoginResponse> => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || errorData.message || '로그인에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.data?.accessToken) {
        handleAuthLoginResponse(data.data.accessToken, data.data.name, data.data.userId);
        window.location.href = '/admin/users';
      } else {
        const errorMsg = data.error?.message || data.message || '로그인에 실패했습니다.';
        setLoginError(errorMsg);
      }
    },
    onError: (error: Error) => {
      setLoginError(error.message);
    }
  });

  const onSubmit = ({ email, password }: UserInformation) => {
    setLoginError('');
    loginMutation.mutate({ email, password });
  };

  return (
    <div className={styles['login']}>
      <div className={styles['title']}>
        <h1>관리자 로그인</h1>
      </div>
      <div className={styles['subtitle']}>
        <span>정보를 입력해주세요</span>
      </div>

      {loginMutation.isPending && <div className={styles['loading']}>로그인 처리 중...</div>}

      <LoginForm onSubmit={onSubmit} authError={loginError} />
    </div>
  );
};

export default AdminLoginPage;
