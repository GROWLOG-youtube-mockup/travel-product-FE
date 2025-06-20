import { Outlet } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/DefaultHeader/DefaultHeader';

import styles from './CheckoutLayout.module.scss';

const CheckoutLayout = () => {
  return (
    <div className={styles.layout}>
      <DefaultHeader />
      <main className={styles.baseForm}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
