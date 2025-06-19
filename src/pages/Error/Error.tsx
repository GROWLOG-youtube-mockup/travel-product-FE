import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';
import errorMessages from '@/constants/errorMessages';

import styles from './Error.module.scss';

export default function ErrorPage() {
  const { status } = useParams<{ status: string }>();
  const navigate = useNavigate();

  // 유효하지 않은 status 파라미터 처리
  const code = status && /^\d+$/.test(status) ? Number(status) : 500;
  const { title, description } = errorMessages[code] ?? errorMessages[500];

  // 페이지 타이틀 설정
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${code} - ${title}`;
    return () => {
      document.title = prevTitle; // 기본 타이틀로 복원
    };
  }, [code, title]);

  const handleGoHome = () => {
    navigate('/', { replace: true }); // replace로 히스토리 스택 정리
  };

  const handleGoBack = () => {
    // 이전 페이지가 에러 페이지가 아닌 경우에만 뒤로 가기
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      {/* 임시로 로그인 상태의 디폴트 헤더 사용 */}
      <DefaultHeader isLoggedIn />
      <div className={styles.container}>
        <h1 className={styles.code}>{code}</h1>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{description}</p>

        <div className={styles.buttonGroup}>
          <Button variant="xs" color="white" onClick={handleGoBack} className={styles.button1}>
            이전 페이지
          </Button>
          {code === 401 ? (
            <Button
              variant="xs"
              color="default"
              onClick={() => navigate('/login', { replace: true })}
              className={styles.button2}
            >
              로그인 페이지로
            </Button>
          ) : (
            <Button variant="xs" color="default" onClick={handleGoHome} className={styles.button2}>
              홈으로 돌아가기
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
