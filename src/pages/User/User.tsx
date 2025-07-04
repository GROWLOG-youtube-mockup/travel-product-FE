import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import UserBanner from '@/components/Banner/UserBanner/UserBanner';
import MyTripCard from '@/components/Cards/MyTripCard';
import UserInfo from '@/components/UserInfo/UserInfo';
import { useGetApi } from '@/hooks/useGetAPI';
import type { Trip, TripDto } from '@/types/api/Trip.type';
import type { User } from '@/types/api/User.type';
import { toFETripArray } from '@/utils/trip';

import styles from './User.module.scss';

const tabInfo = {
  upcoming: {
    title: '예정된 여행',
    emptyMsg: '예정된 여행이 없습니다.'
  },
  past: {
    title: '다녀온 여행',
    emptyMsg: '다녀온 여행이 없습니다.'
  }
} as const;

type TripTab = 'upcoming' | 'past';

const UserPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TripTab>('upcoming');

  // 데이터 패칭
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

  // 데이터 가공 : **toFETripArray에서 thumbnailUrl이 반드시 string이어야 함**
  const tripsData: Trip[] = toFETripArray((tripsResponse?.data ?? []) as unknown as TripDto[]);
  const userInfoData: User | null = userInfoResponse?.data ?? null;
  const today = new Date();
  const upcoming = Array.isArray(tripsData)
    ? tripsData.filter((trip) => new Date(trip.end_date) >= today)
    : [];
  const past = Array.isArray(tripsData)
    ? tripsData.filter((trip) => new Date(trip.end_date) < today)
    : [];
  const userInfo = userInfoData
    ? {
        name: userInfoData.name,
        phone: userInfoData.phoneNumber,
        email: userInfoData.email
      }
    : null;

  const { title, emptyMsg } = tabInfo[tab];
  const trips = tab === 'upcoming' ? upcoming : past;

  const handleProductPageNavigation = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleCancelConfirm = (orderId: number) => {
    navigate(`/CancelConfirm/${orderId}`);
  };

  if (tripsLoading || userInfoLoading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }
  if (tripsError || userInfoError) {
    return <div className={styles.error}>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <UserBanner
        tab={tab}
        setTab={setTab}
        upcomingCount={upcoming.length}
        pastCount={past.length}
        userName={userInfo?.name || ''}
      />
      <div className={styles.userContentWrapper}>
        <div className={styles.sectionTitle}>{title}</div>
        <div key={tab} className={styles.userPageWrapper}>
          {trips.length === 0 ? (
            <div className={styles.emptyMsg}>{emptyMsg}</div>
          ) : (
            trips.map((trip) => (
              <div key={trip.orderItemId} className={styles.userTripWrapper}>
                <MyTripCard trip={trip} />
                {userInfo && (
                  <UserInfo name={userInfo.name} phone={userInfo.phone} email={userInfo.email} />
                )}
                <div className={styles.tripButtonWrapper}>
                  <Button
                    variant="sm"
                    color="gray"
                    style={{ margin: '16px 0 0 0' }}
                    onClick={() => handleProductPageNavigation(trip.productId)}
                  >
                    해당 상품 페이지로
                  </Button>
                  <Button
                    variant="sm"
                    style={{ margin: '16px 0 0 0' }}
                    onClick={() => handleCancelConfirm(trip.orderId)}
                  >
                    결제 취소하기
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
