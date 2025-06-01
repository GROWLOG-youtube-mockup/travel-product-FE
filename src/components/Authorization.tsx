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
