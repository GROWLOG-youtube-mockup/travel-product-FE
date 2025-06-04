import { Outlet } from 'react-router-dom';

import DefaultHeader from '../components/Header/DefaultHeader/index';

const AuthLayout = () => {
  return (
    <>
      <DefaultHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
