import { Outlet } from 'react-router-dom';

import AdminHeader from './../components/Header/AdminHeader/index';

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
