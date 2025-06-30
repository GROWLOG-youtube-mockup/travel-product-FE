import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/AuthStore';

interface Props {
  children: React.ReactNode;
}

/**
 * 회원(로그인)만 접근 가능한 페이지 보호 컴포넌트
 * - 비로그인 시 로그인 페이지로 이동
 * - 확인 중엔 로딩 UI 표시
 */
const RequireUserAccess = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('로그인이 필요한 페이지입니다.', { id: 'require-login' });
      // 비로그인 상태면 로그인 페이지로 이동 (이동 전 경로 state로 전달)
      navigate('/login', { replace: true, state: { from: location.pathname } });
      return;
    }
    setChecked(true);
  }, [isLoggedIn, navigate, location]);

  if (!checked) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>접근 권한 확인 중...</div>;
  }

  return <>{children}</>;
};

export default RequireUserAccess;
