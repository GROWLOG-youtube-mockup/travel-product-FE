import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import MyTripCard from '@/components/Cards/MyTripCard';
import UserInfo from '@/components/UserInfo/UserInfo';
import { useAuthStore } from '@/store/AuthStore';
import type { Trip } from '@/types/api/Trip.type';

import styles from './User.module.scss';

interface UserPageProps {
  tab: 'upcoming' | 'past';
  upcoming: Trip[];
  past: Trip[];
  userInfo: { name: string; phone: string; email: string } | null;
}

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

const UserPage = ({ tab, upcoming, past, userInfo }: UserPageProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  // 인증 체크
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('로그인이 필요한 페이지입니다.');
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // 로그인되지 않은 경우 렌더링하지 않음
  if (!isLoggedIn) {
    return null;
  }

  const { title, emptyMsg } = tabInfo[tab];
  const trips = tab === 'upcoming' ? upcoming : past;

  const handleProductPageNavigation = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className={styles.sectionTitle}>{title}</div>
      <div key={tab} className={styles.userPageWrapper}>
        {trips.length === 0 ? (
          <div className={styles.emptyMsg}>{emptyMsg}</div>
        ) : (
          trips.map((trip) => (
            <div
              key={`${trip.productId}_${trip.start_date}_${trip.end_date}`}
              className={styles.userTripWrapper}
            >
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
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserPage;
