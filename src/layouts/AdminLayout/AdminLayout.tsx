import { Outlet } from 'react-router-dom';

import AdminHeader from '@/components/Header/AdminHeader/AdminHeader';
import AdminSidebar from '@/components/Sidebar/AdminSidebar/AdminSidebar';
import { useAuthStore } from '@/store/AuthStore';

import styles from './AdminLayout.module.scss';

const AdminLayout = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className={styles.layout}>
      <AdminHeader />
      <main className={styles.main}>
        {isLoggedIn && <AdminSidebar />}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
