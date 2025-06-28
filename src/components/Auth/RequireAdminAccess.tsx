import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAdminAuthStore } from '@/store/AdminAuthStore';

interface Props {
  children: React.ReactNode;
  requireSuperAdmin?: boolean; // 최고 관리자 전용 페이지 여부
}

/**
 * 어드민 페이지 접근을 보호하는 컴포넌트
 * - 비로그인 시: 로그인 페이지 이동
 * - 권한 없음 시: 에러 페이지로 이동
 * - 권한 확인 중: 로딩 UI 표시
 */
const RequireAdminAccess = ({ children, requireSuperAdmin = false }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminLoggedIn, roleCode } = useAdminAuthStore();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;

    // 로그인 안 된 경우 → 에러 페이지로 이동 (리디렉션 경로 포함)
    if (!isAdminLoggedIn) {
      navigate(
        `/error/401?message=${encodeURIComponent(
          '로그인이 필요합니다.'
        )}&code=UNAUTHORIZED&redirect=${encodeURIComponent(currentPath)}`,
        { replace: true }
      );
      return;
    }

    // 최고 관리자 전용 페이지 접근 제한
    if (requireSuperAdmin && roleCode !== 2) {
      navigate(
        `/error/403?message=${encodeURIComponent(
          '최고 관리자 권한이 필요합니다.'
        )}&code=FORBIDDEN&redirect=${encodeURIComponent(currentPath)}`,
        { replace: true }
      );
      return;
    }

    // 일반 관리자 권한도 없는 경우
    if (!requireSuperAdmin && roleCode !== 1 && roleCode !== 2) {
      navigate(
        `/error/403?message=${encodeURIComponent(
          '관리자 권한이 없습니다.'
        )}&code=FORBIDDEN&redirect=${encodeURIComponent(currentPath)}`,
        { replace: true }
      );
      return;
    }

    // 권한 확인 완료 → 렌더링 허용
    setChecked(true);
  }, [isAdminLoggedIn, roleCode, navigate, requireSuperAdmin, location]);

  if (!checked) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>접근 권한 확인 중...</div>;
  }

  return <>{children}</>;
};

export default RequireAdminAccess;
