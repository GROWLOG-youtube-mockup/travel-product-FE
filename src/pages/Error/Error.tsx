import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';
import errorMessages from '@/constants/errorMessages';

import styles from './Error.module.scss';

export default function ErrorPage() {
  const { status } = useParams<{ status: string }>();
  const code = status ? Number(status) : 500;
  const { title, description } = errorMessages[code] ?? errorMessages[500];
  const navigate = useNavigate();

  return (
    <>
      {/* 임시로 로그인 상태의 디폴트 헤더 사용 */}
      <DefaultHeader isLoggedIn />
      <div className={styles.container}>
        <h1 className={styles.code}>{code}</h1>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{description}</p>
        <Button
          variant="xs"
          color="default"
          onClick={() => navigate('/')}
          className={styles.button}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </>
  );
}
