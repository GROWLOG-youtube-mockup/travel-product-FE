import { Outlet } from 'react-router-dom';

import AdminHeader from '../../components/Header/AdminHeader/index';
import AdminSidebar from '../../components/Sidebar/AdminSidebar/AdminSidebar';

import styles from './AdminLayout.module.scss';

const AdminLayout = () => {
  return (
    <div className={styles['admin-layout']}>
      <AdminHeader />
      <main className={styles['admin-layout__main']}>
        <AdminSidebar />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
