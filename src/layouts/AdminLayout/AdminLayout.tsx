import { Outlet } from 'react-router-dom';

import RequireAdminAccess from '@/components/Auth/RequireAdminAccess';
import AdminHeader from '@/components/Header/AdminHeader/AdminHeader';
import AdminSidebar from '@/components/Sidebar/AdminSidebar/AdminSidebar';
import { useAuthStore } from '@/store/AuthStore';

import styles from './AdminLayout.module.scss';

const AdminLayout = () => {
  const { isLoggedIn, roleCode } = useAuthStore();
  const isAuthorizedAdmin = isLoggedIn && (roleCode === 1 || roleCode === 2);

  return (
    <RequireAdminAccess>
      <div className={styles.layout}>
        <AdminHeader />
        <main className={styles.main}>
          {isAuthorizedAdmin && <AdminSidebar />}
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
    </RequireAdminAccess>
  );
};

export default AdminLayout;
