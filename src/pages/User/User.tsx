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

const tabInfo = {
  upcoming: {
    title: '예정된 여행',
    emptyMsg: '예정된 여행이 없습니다.'
  },
  past: {
    title: '다녀온 여행',
    emptyMsg: '다녀온 여행이 없습니다.'
  }
};

const TripList = ({ trips, emptyMsg }: { trips: Trip[]; emptyMsg: string }) =>
  trips.length === 0 ? (
    <div>{emptyMsg}</div>
  ) : (
    trips.map(({ product_id, title, start_date, end_date, price }) => (
      <div className={styles.card} key={product_id}>
        <div className={styles.cardHeader}>
          <span className={styles.orderNumber}>{title}</span>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardImage} />
          <div className={styles.cardDetails}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.cardDate}>
              {start_date} ~ {end_date}
            </div>
            <div className={styles.cardPrice}>₩{price.toLocaleString()}</div>
          </div>
        </div>
      </div>
    ))
  );

interface UserPageProps {
  tab: TripTab;
  upcoming: Trip[];
  past: Trip[];
}

const UserPage = ({ tab, upcoming, past }: UserPageProps) => (
  <>
    <div className={styles.sectionTitle}>{tabInfo[tab].title}</div>
    <div className={styles.userPageWrapper}>
      <TripList trips={tab === 'upcoming' ? upcoming : past} emptyMsg={tabInfo[tab].emptyMsg} />
      <Button variant="xs">140px 버튼</Button>
    </div>
  </>
);

export default UserPage;
