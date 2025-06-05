import { Outlet } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/DefaultHeader';

import styles from './UserEditLayout.module.scss';

const UserLayout = () => {
  return (
    <>
      <DefaultHeader />
      <main className={styles.baseForm}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
