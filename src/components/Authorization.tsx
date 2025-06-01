import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthorizationProps {
  redirectTo: string;
  requiredRole?: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  children: React.ReactNode;
}

const ROLE_PRIORITY = {
  SUPER_ADMIN: 3,
  ADMIN: 2,
  USER: 1
} as const;

type Role = keyof typeof ROLE_PRIORITY;

const Authorization = ({ redirectTo, requiredRole, children }: AuthorizationProps) => {
  // TODO: 현재 임시로 세션스토리지로 만들어진 상태임. 추후 인증 토큰 사용 여부등에 맞추어 사용자 정보를 가져오는 로직으로 변경 필요
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const currentRole = sessionStorage.getItem('role') as Role | null;

  if (!isLoggedIn || !currentRole) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && ROLE_PRIORITY[currentRole] < ROLE_PRIORITY[requiredRole]) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default Authorization;
