import { Outlet } from 'react-router-dom';

import AdminHeader from '../../components/Header/AdminHeader/index';
import AdminSidebar from '../../components/Sidebar/AdminSidebar/AdminSidebar';

import styles from './AdminLayout.module.scss';

const AdminLayout = () => {
  // TODO: 로그인 상태에 따라 보여지는 요소가 변경될 수 있도록 수정 필요(store 연동 필요)
  const isLoggedIn = false;

  return (
    <div className={styles['layout']}>
      <AdminHeader />
      <main className={styles['main']}>
        {isLoggedIn && <AdminSidebar />}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
