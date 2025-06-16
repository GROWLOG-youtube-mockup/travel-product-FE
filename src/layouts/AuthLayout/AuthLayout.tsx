import { Outlet } from 'react-router-dom';

import DefaultHeader from '../../components/Header/DefaultHeader/DefaultHeader';

import styles from './AuthLayout.module.scss';

const AuthLayout = () => {
  return (
    <>
      <DefaultHeader />
      <main className={styles.baseForm}>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
