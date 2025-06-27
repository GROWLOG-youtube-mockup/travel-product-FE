import Button from '../../components/atoms/Button/Button';
import MyTripCard from '../../components/Cards/MyTripCard';
import UserInfo from '../../components/UserInfo/UserInfo';
import type { Trip } from '../../types/trip';

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
  const { title, emptyMsg } = tabInfo[tab];
  const trips = tab === 'upcoming' ? upcoming : past;
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
                  onClick={() => {
                    window.location.href = `/product/${trip.productId}`;
                  }}
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
