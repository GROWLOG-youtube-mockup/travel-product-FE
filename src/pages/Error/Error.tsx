import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import errorMessages from '@/constants/errorMessages';

import styles from './Error.module.scss';

export default function ErrorPage() {
  const { status } = useParams<{ status: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const code = status && /^\d+$/.test(status) ? Number(status) : 500;
  const { title, description } = errorMessages[code] ?? errorMessages[500];

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');
  const messageFromQuery = queryParams.get('message');
  const codeFromQuery = queryParams.get('code');

  const isAdminPath = redirectPath?.startsWith('/admin') ?? false;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${code} - ${title}`;
    return () => {
      document.title = prevTitle;
    };
  }, [code, title]);

  const handleGoHome = () => navigate('/', { replace: true });

  const handleGoBack = () => {
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>{code}</h1>
      <h2 className={styles.title}>{title}</h2>

      {codeFromQuery && <p className={styles.codeText}>{codeFromQuery}</p>}
      <p className={styles.desc}>{messageFromQuery || description}</p>

      <div className={styles.buttonGroup}>
        <Button variant="xs" color="white" onClick={handleGoBack} className={styles.button1}>
          이전 페이지
        </Button>

        {/* 로그인 관련 에러 */}
        {(code === 401 || (code === 403 && isAdminPath)) && (
          <Button
            variant="xs"
            color="default"
            onClick={() => navigate(isAdminPath ? '/admin/login' : '/login', { replace: true })}
            className={styles.button2}
          >
            다시 로그인하기
          </Button>
        )}

        {/* 그 외 에러 */}
        {code !== 401 && !(code === 403 && isAdminPath) && (
          <Button variant="xs" color="default" onClick={handleGoHome} className={styles.button2}>
            홈으로 돌아가기
          </Button>
        )}
      </div>
    </div>
  );
}
