import { Outlet } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/DefaultHeader/DefaultHeader';

import styles from './SignupLayout.module.scss';

const SignupLayout = () => {
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

export default SignupLayout;
