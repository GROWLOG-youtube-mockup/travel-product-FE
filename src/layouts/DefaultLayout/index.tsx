import { Outlet, useLocation } from 'react-router-dom';

import MainBanner from '../../components/Banner/MainBanner/index';
import ProductBanner from '../../components/Banner/ProductBanner/index';
import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/DefaultHeader/index';

import styles from './DefaultLayout.module.scss';

const DefaultLayout = () => {
  const location = useLocation();

  const renderBanner = () => {
    if (location.pathname === '/') {
      return <MainBanner />;
    }
    if (location.pathname.includes('/product')) {
      return <ProductBanner />;
    }
    return null;
  };

  return (
    <>
      <DefaultHeader />
      {renderBanner()}
      <main className={styles.baseForm}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
