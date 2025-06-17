import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState<Trip[]>([]);
  const [past, setPast] = useState<Trip[]>([]);
  const [tab, setTab] = useState<TripTab>('upcoming');
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; phone: string; email: string } | null>(
    null
  );

  useEffect(() => {
    axios
      .get('/users/me/trips')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const today = new Date();
        setUpcoming(data.filter((trip) => new Date(trip.end_date) >= today));
        setPast(data.filter((trip) => new Date(trip.end_date) < today));
      })
      .catch(() => setError(true));
    // 사용자 정보 fetch
    axios.get('/users/me').then(({ data }) => {
      setUserInfo({
        name: data.name,
        phone: data.phone_number,
        email: data.email
      });
    });
  }, []);

  useEffect(() => {
    if (error) {
      navigate('/error');
    }
  }, [error, navigate]);

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
        <UserPage tab={tab} upcoming={upcoming} past={past} userInfo={userInfo} />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
