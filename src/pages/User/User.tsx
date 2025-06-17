import { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './User.module.scss';

interface Trip {
  product_id: number;
  title: string;
  start_date: string;
  end_date: string;
  price: number;
}

const UserPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [upcoming, setUpcoming] = useState<Trip[]>([]);
  const [past, setPast] = useState<Trip[]>([]);

  useEffect(() => {
    axios.get('/users/me/trips').then((res) => {
      setTrips(res.data);
    });
  }, []);

  useEffect(() => {
    const today = new Date();
    const upcomingTrips: Trip[] = [];
    const pastTrips: Trip[] = [];
    trips.forEach((trip) => {
      const endDate = new Date(trip.end_date);
      if (endDate >= today) {
        upcomingTrips.push(trip);
      } else {
        pastTrips.push(trip);
      }
    });
    setUpcoming(upcomingTrips);
    setPast(pastTrips);
  }, [trips]);

  return (
    <div className={styles.userPageWrapper}>
      <div className={styles.sectionTitle}>예정된 여행</div>
      {upcoming.length === 0 && <div>예정된 여행이 없습니다.</div>}
      {upcoming.map((trip) => (
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
      <div className={styles.sectionTitle}>다녀온 여행</div>
      {past.length === 0 && <div>다녀온 여행이 없습니다.</div>}
      {past.map((trip) => (
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
    </div>
  );
};

export default UserPage;
