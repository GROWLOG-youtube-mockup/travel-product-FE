import { Outlet } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/DefaultHeader/index';

import styles from './CheckoutLayout.module.scss';

const CheckoutLayout = () => {
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

export default CheckoutLayout;
