import Button from '../../components/atoms/Button/Button';
import MyTripCard from '../../components/Cards/MyTripCard';

import styles from './User.module.scss';

interface Trip {
  product_id: number;
  title: string;
  start_date: string;
  end_date: string;
  price: number;
}

type TripTab = 'upcoming' | 'past';

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

const UserPage = ({ tab, upcoming, past }: UserPageProps) => {
  const { title, emptyMsg } = tabInfo[tab];
  const trips = tab === 'upcoming' ? upcoming : past;
  return (
    <>
      <div className={styles.sectionTitle}>{title}</div>
      <div key={tab} className={styles.userPageWrapper}>
        {trips.length === 0 ? (
          <div>{emptyMsg}</div>
        ) : (
          trips.map((trip) => (
            <div key={`${trip.product_id}_${trip.start_date}_${trip.end_date}`}>
              <MyTripCard trip={trip} />
              <Button
                variant="sm"
                color="gray"
                onClick={() => {
                  window.location.href = `/product/${trip.product_id}`;
                }}
              >
                해당 상품 페이지로
              </Button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserPage;
