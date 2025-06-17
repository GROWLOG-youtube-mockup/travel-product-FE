import Button from '../../components/atoms/Button/Button';

import styles from './User.module.scss';

interface Trip {
  product_id: number;
  title: string;
  start_date: string;
  end_date: string;
  price: number;
}

type TripTab = 'upcoming' | 'past';

const TripList = ({ trips, emptyMsg }: { trips: Trip[]; emptyMsg: string }) => {
  return (
    <>
      {trips.length === 0 && <div>{emptyMsg}</div>}
      {trips.map((trip) => (
        <div className={styles.card} key={trip.product_id}>
          <div className={styles.cardHeader}>
            <span className={styles.orderNumber}>{trip.title}</span>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardImage} />
            <div className={styles.cardDetails}>
              <div className={styles.cardTitle}>{trip.title}</div>
              <div className={styles.cardDate}>
                {trip.start_date} ~ {trip.end_date}
              </div>
              <div className={styles.cardPrice}>₩{trip.price.toLocaleString()}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

interface UserPageProps {
  tab: TripTab;
  upcoming: Trip[];
  past: Trip[];
}

const UserPage = ({ tab, upcoming, past }: UserPageProps) => {
  return (
    <>
      <div className={styles.sectionTitle}>
        {tab === 'upcoming' ? '예정된 여행' : '다녀온 여행'}
      </div>

      <div className={styles.userPageWrapper}>
        <TripList
          trips={tab === 'upcoming' ? upcoming : past}
          emptyMsg={tab === 'upcoming' ? '예정된 여행이 없습니다.' : '다녀온 여행이 없습니다.'}
        />
        <Button variant="xs">140px 버튼</Button>
      </div>
    </>
  );
};

export default UserPage;
