import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuthStore } from '@/store/AuthStore';

const PathTracker = () => {
  const location = useLocation();
  const { isLoggedIn, roleCode } = useAuthStore();

  useEffect(() => {
    const pathname = location.pathname;

    const isErrorPage = pathname.startsWith('/error');
    const isLoginPage = pathname === '/admin/login';

    // 일반 사용자 (roleCode === 0), 미로그인자 등 모든 경우에 대한 금지 페이지 설정
    const isRestrictedForRole = (role: number | null) => {
      // 미로그인 또는 일반 사용자
      if (!isLoggedIn || role === null || role === 0) return pathname.startsWith('/admin');
      // 일반 관리자
      if (role === 1) return pathname === '/admin/logs';
      // 최고 관리자는 제한 없음
      return false;
    };

    const shouldSkip = isErrorPage || isLoginPage || isRestrictedForRole(roleCode);

    if (!shouldSkip) {
      sessionStorage.setItem('lastSafePath', pathname);
    }
  }, [location, isLoggedIn, roleCode]);

  return null;
};

export default PathTracker;
