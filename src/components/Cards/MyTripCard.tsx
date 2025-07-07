import type { Trip } from '@/types/api/Trip.type';

import styles from './MyTripCard.module.scss';

const formatDate = (dateStr: string) =>
  dateStr ? `${dateStr.slice(0, 4)}년 ${dateStr.slice(5, 7)}월 ${dateStr.slice(8, 10)}일` : '-';

const getTripDays = (start: string, end: string) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  if (isNaN(startTime) || isNaN(endTime)) {
    return '-';
  }

  return Math.round((endTime - startTime) / (1000 * 60 * 60 * 24)) + 1;
};

const MyTripCard = ({ trip }: { trip: Trip }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {trip.thumbnailUrl && <img src={trip.thumbnailUrl} alt={trip.title} />}
      </div>
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
