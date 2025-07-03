import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from '@/components/Footer/Footer';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';
import { useGetApi } from '@/hooks/useGetAPI';
import UserPage from '@/pages/User/User';
import type { TripDto } from '@/types/api/Trip.type';
import type { User } from '@/types/api/User.type';

import styles from './UserLayout.module.scss';

type TripTab = 'upcoming' | 'past';

const UserLayout = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TripTab>('upcoming');

  // 공통 커스텀 훅으로 데이터 패칭
  const {
    data: tripsResponse,
    isLoading: tripsLoading,
    isError: tripsError
  } = useGetApi('/users/me/trips');
  const {
    data: userInfoResponse,
    isLoading: userInfoLoading,
    isError: userInfoError
  } = useGetApi('/users/me');

  // 명세 기반 데이터 추출
  const tripsData: TripDto[] = tripsResponse?.data ?? [];
  const userInfoData: User | null = userInfoResponse?.data ?? null;

  // 데이터 가공
  const today = new Date();
  const upcoming = Array.isArray(tripsData)
    ? tripsData.filter((trip) => new Date(trip.endDate) >= today)
    : [];
  const past = Array.isArray(tripsData)
    ? tripsData.filter((trip) => new Date(trip.endDate) < today)
    : [];
  const userInfo = userInfoData
    ? {
        name: userInfoData.name,
        phone: userInfoData.phoneNumber,
        email: userInfoData.email
      }
    : null;

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