import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/AuthStore';

interface Props {
  children: React.ReactNode;
}

/**
 * 비회원(로그아웃 상태)만 접근 가능한 페이지 보호 컴포넌트
 * - 로그인 상태면 메인(혹은 지정 경로)으로 이동
 * - 비로그인 상태면 게스트 전용 페이지(children) 노출
 * - 확인 중엔 로딩 UI 표시
 */
const RequireGuestAccess = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn === true && location.pathname !== '/') {
      toast.error('이미 로그인된 상태입니다.', { id: 'already-logged-in' });
      navigate('/', { replace: true });
    }
    // 비로그인 상태면 children 노출(redirect 없음)
  }, [isLoggedIn, navigate, location.pathname]);

  if (isLoggedIn === false) {
    // 비로그인 상태면 게스트 전용 페이지(children) 노출
    return <>{children}</>;
  }

  if (isLoggedIn === true) {
    // 로그인 상태면 리다이렉트 중이므로 아무것도 렌더링하지 않음
    return null;
  }

  // 인증 상태 확인 중(로딩)
  return <div style={{ padding: '2rem', textAlign: 'center' }}>접근 권한 확인 중...</div>;
};

export default RequireGuestAccess;
