import { useNavigate } from 'react-router-dom';

import styles from './MyTripCard.module.scss';

export interface MyTripCardProps {
  trip: {
    product_id: number;
    title: string;
    start_date: string;
    end_date: string;
    price: number;
  };
}

const formatDate = (dateStr: string) =>
  dateStr ? `${dateStr.slice(0, 4)}년 ${dateStr.slice(5, 7)}월 ${dateStr.slice(8, 10)}일` : '-';

const getTripDays = (start: string, end: string) =>
  isNaN(new Date(start).getTime()) || isNaN(new Date(end).getTime())
    ? '-'
    : Math.round((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)) + 1;

const MyTripCard = ({ trip }: MyTripCardProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.image} />
      <div className={styles.card}>
        <div className={styles.details}>
          <div className={styles.title}>{trip.title}</div>
          <div className={styles.date}>{formatDate(trip.start_date)}부터</div>
          <div className={styles.date}>{getTripDays(trip.start_date, trip.end_date)}일간</div>
        </div>
        <div className={styles.price}>₩{trip.price.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default MyTripCard;
