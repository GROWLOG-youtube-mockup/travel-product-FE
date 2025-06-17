import { useEffect, useState } from 'react';

import axios from 'axios';

import UserBanner from '../../components/Banner/UserBanner/UserBanner';
import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/DefaultHeader/DefaultHeader';
import UserPage from '../../pages/User/User';

import styles from './UserLayout.module.scss';

interface Trip {
  product_id: number;
  title: string;
  start_date: string;
  end_date: string;
  price: number;
}

type TripTab = 'upcoming' | 'past';

const UserLayout = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tab, setTab] = useState<TripTab>('upcoming');
  const [upcoming, setUpcoming] = useState<Trip[]>([]);
  const [past, setPast] = useState<Trip[]>([]);

  useEffect(() => {
    axios.get('/users/me/trips').then((res) => setTrips(res.data));
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
    <>
      <DefaultHeader />
      <UserBanner
        tab={tab}
        setTab={setTab}
        upcomingCount={upcoming.length}
        pastCount={past.length}
      />
      <main className={styles.baseForm}>
        <UserPage tab={tab} upcoming={upcoming} past={past} />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
