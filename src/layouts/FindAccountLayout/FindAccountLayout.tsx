import { Outlet } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';

import styles from './FindAccountLayout.module.scss';

const FindAccountLayout = () => {
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

export default FindAccountLayout;
