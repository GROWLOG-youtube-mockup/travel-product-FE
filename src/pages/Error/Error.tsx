import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import errorMessages from '@/constants/errorMessages';
import { useAuthStore } from '@/store/AuthStore';

import styles from './Error.module.scss';

const STORAGE_KEYS = {
  LAST_SAFE_PATH: 'lastSafePath'
} as const;

export default function ErrorPage() {
  const { status } = useParams<{ status: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const code = status && /^\d+$/.test(status) ? Number(status) : 500;

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');
  const messageFromQuery = queryParams.get('message');
  const codeFromQuery = queryParams.get('code');

  // 준비된 에러 메시지가 있는지 확인
  const preparedErrorInfo = errorMessages[code];

  const errorInfo = preparedErrorInfo
    ? {
        // 준비된 메시지가 있으면 기존 title 사용, description은 서버 응답 우선
        title: preparedErrorInfo.title,
        description: messageFromQuery || preparedErrorInfo.description
      }
    : {
        // 준비된 메시지가 없으면 서버 응답을 title로 사용하거나 기본값
        title: messageFromQuery || `오류가 발생했습니다 (${code})`,
        description: messageFromQuery || '알 수 없는 오류가 발생했습니다.'
      };

  const { title, description } = errorInfo;

  const isAdminPath =
    redirectPath?.startsWith('/admin') || location.pathname.startsWith('/admin') || false;

  const isAdmin403 = code === 403 && isAdminPath;
  const showLoginButton = code === 401 || isAdmin403;
  const lastSafePath = sessionStorage.getItem(STORAGE_KEYS.LAST_SAFE_PATH);
  const { roleCode, isLoggedIn } = useAuthStore();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${code} - ${title}`;
    return () => {
      document.title = prevTitle;
    };
  }, [code, title]);

  const handleGoHome = () => navigate('/', { replace: true });

  // 로그인 경로 결정 함수
  const getLoginPath = () => {
    return isAdminPath ? '/admin/login' : '/login';
  };

  const handleGoBack = () => {
    const currentPath = location.pathname + location.search;

    // 관리자 경로는 권한이 있을 때만 이동
    const canAccessAdminPath = (path: string) => {
      if (!path.startsWith('/admin')) return true;
      if (!isLoggedIn || roleCode === null || roleCode === 0) return false;
      if (roleCode === 1 && path === '/admin/logs') return false;
      return true;
    };

    const targetPath =
      lastSafePath && lastSafePath !== currentPath && canAccessAdminPath(lastSafePath)
        ? lastSafePath
        : redirectPath && redirectPath !== currentPath && canAccessAdminPath(redirectPath)
          ? redirectPath
          : '/';

    navigate(targetPath, { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>{code}</h1>
      <h2 className={styles.title}>{title}</h2>

      {codeFromQuery && <p className={styles.codeText}>{codeFromQuery}</p>}
      <p className={styles.desc}>{description}</p>

      <div className={styles.buttonGroup}>
        <Button variant="xs" color="white" onClick={handleGoBack} className={styles.button1}>
          이전 페이지
        </Button>

        {showLoginButton ? (
          <Button
            variant="xs"
            color="default"
            onClick={() => navigate(getLoginPath(), { replace: true })}
            className={styles.button2}
          >
            로그인 페이지로
          </Button>
        ) : (
          <Button variant="xs" color="default" onClick={handleGoHome} className={styles.button2}>
            홈으로
          </Button>
        )}
      </div>
    </div>
  );
}
