import { Outlet } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import DefaultHeader from '../../components/Header/DefaultHeader/index';

const UserLayout = () => {
  return (
    <>
      <DefaultHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
