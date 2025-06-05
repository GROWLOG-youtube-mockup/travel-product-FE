import { Outlet } from 'react-router-dom';

import UserBanner from '../../components/Banner/UserBanner';
import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/DefaultHeader/index';

import styles from './UserLayout.module.scss';

const UserLayout = () => {
  return (
    <>
      <DefaultHeader />
      <UserBanner />
      <main className={styles.baseForm}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
