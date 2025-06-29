import { Outlet } from 'react-router-dom';

import RequireAdminAccess from '@/components/Auth/RequireAdminAccess';
import AdminHeader from '@/components/Header/AdminHeader/AdminHeader';
import AdminSidebar from '@/components/Sidebar/AdminSidebar/AdminSidebar';
import { useAdminAuthStore } from '@/store/AdminAuthStore';

import styles from './AdminLayout.module.scss';

const AdminLayout = () => {
  const { isAdminLoggedIn, roleCode } = useAdminAuthStore();
  const isAuthorizedAdmin = isAdminLoggedIn && (roleCode === 1 || roleCode === 2);

  return (
    <RequireAdminAccess>
      <div className={styles.layout}>
        <AdminHeader />
        <main className={styles.main}>
          {isAuthorizedAdmin && <AdminSidebar />}
          <Outlet />
        </main>
      </div>
    </RequireAdminAccess>
  );
};

export default AdminLayout;
