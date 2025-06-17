import { useNavigate } from 'react-router-dom';

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
} as const;

const formatKoreanDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '-';
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
};

const getTripDays = (start: string, end: string) =>
  isNaN(new Date(start).getTime()) || isNaN(new Date(end).getTime())
    ? '-'
    : Math.round((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)) + 1;

const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.cardImage} />
        <div className={styles.cardDetails}>
          <div className={styles.cardTitle}>{trip.title}</div>
          <div className={styles.cardDate}>{formatKoreanDate(trip.start_date)}부터</div>
          <div className={styles.cardDate}>{getTripDays(trip.start_date, trip.end_date)}일간</div>
          <div className={styles.cardPrice}>₩{trip.price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

const UserPage = ({ tab, upcoming, past }: UserPageProps) => {
  const navigate = useNavigate();
  const { title, emptyMsg } = tabInfo[tab];
  const trips = tab === 'upcoming' ? upcoming : past;
  const firstProductId = trips[0]?.product_id;
  return (
    <>
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.userPageWrapper}>
        {trips.length === 0 ? (
          <div>{emptyMsg}</div>
        ) : (
          trips.map((trip) => <TripCard key={trip.product_id} trip={trip} />)
        )}
        {firstProductId && (
          <Button
            variant="sm"
            color="gray"
            onClick={() => navigate(`/product/${firstProductId}`)}
            style={{ marginTop: 12 }}
          >
            해당 상품 페이지로
          </Button>
        )}
      </div>
    </>
  );
};

export default UserPage;
