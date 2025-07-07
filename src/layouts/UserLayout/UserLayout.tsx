import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';
import { useGetApi } from '@/hooks/useGetAPI';

import styles from './UserLayout.module.scss';

const UserLayout = () => {
  const navigate = useNavigate();

  // 공통 커스텀 훅으로 데이터 패칭
  const { isLoading: tripsLoading, isError: tripsError } = useGetApi('/users/me/trips');
  const { isLoading: userInfoLoading, isError: userInfoError } = useGetApi('/users/me');

  // 에러 처리
  useEffect(() => {
    if (tripsError || userInfoError) {
      navigate('/error');
    }
  }, [tripsError, userInfoError, navigate]);

  // 로딩 처리
  if (tripsLoading || userInfoLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <DefaultHeader />
      <main className={styles.baseForm}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
