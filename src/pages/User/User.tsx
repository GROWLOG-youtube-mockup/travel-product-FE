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
        <div className={styles.tripCard} key={trip.product_id}>
          <div className={styles.tripCardHeader}>
            <span className={styles.orderNumber}>{trip.title}</span>
          </div>
          <div className={styles.tripInfo}>
            <div className={styles.tripImage} />
            <div className={styles.tripDetails}>
              <div className={styles.tripTitle}>{trip.title}</div>
              <div className={styles.tripDate}>
                {trip.start_date} ~ {trip.end_date}
              </div>
              <div className={styles.tripPrice}>₩{trip.price.toLocaleString()}</div>
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
    <div className={styles.userPageWrapper}>
      <div className={styles.sectionTitle}>
        {tab === 'upcoming' ? '예정된 여행' : '다녀온 여행'}
      </div>
      <TripList
        trips={tab === 'upcoming' ? upcoming : past}
        emptyMsg={tab === 'upcoming' ? '예정된 여행이 없습니다.' : '다녀온 여행이 없습니다.'}
      />
    </div>
  );
};

export default UserPage;
