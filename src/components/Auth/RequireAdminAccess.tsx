import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAdminAuthStore } from '@/store/AdminAuthStore';

interface Props {
  children: React.ReactNode;
  requireSuperAdmin?: boolean; // 최고 관리자 전용 페이지인지 여부
}

/**
 * 어드민 페이지 접근을 보호하는 컴포넌트
 * - 비로그인 시: 로그인 페이지 이동
 * - 권한 없음 시: 에러 페이지로 이동
 */
const RequireAdminAccess = ({ children, requireSuperAdmin = false }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminLoggedIn, roleCode } = useAdminAuthStore();

  useEffect(() => {
    const currentPath = location.pathname;

    // 로그인 안 된 경우 → 에러 페이지로 이동 (리디렉션 경로 포함)
    if (!isAdminLoggedIn) {
      navigate(
        `/error/401?message=${encodeURIComponent(
          '로그인이 필요합니다.'
        )}&code=UNAUTHORIZED&redirect=${encodeURIComponent(currentPath)}`
      );
      return;
    }

    // 최고 관리자만 접근 가능한 페이지
    if (requireSuperAdmin && roleCode !== 2) {
      navigate(
        `/error/403?message=${encodeURIComponent(
          '최고 관리자 권한이 필요합니다.'
        )}&code=FORBIDDEN&redirect=${encodeURIComponent(currentPath)}`,
        { replace: true }
      );
      return;
    }

    // 일반 관리자도 접근 불가한 경우
    if (!requireSuperAdmin && roleCode !== 1 && roleCode !== 2) {
      navigate(
        `/error/403?message=${encodeURIComponent(
          '관리자 권한이 없습니다.'
        )}&code=FORBIDDEN&redirect=${encodeURIComponent(currentPath)}`,
        { replace: true }
      );
    }
  }, [isAdminLoggedIn, roleCode, navigate, requireSuperAdmin, location]);

  return <>{children}</>;
};

export default RequireAdminAccess;
