import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/AuthStore';

import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleLogin = () => {
    navigate('/admin/login');
  };

  return (
    <header className={styles['header']}>
      <h1 className={styles['headerTitle']}>관리자 대시보드</h1>
      <div className={styles['userInfo']}>
        {isLoggedIn ? (
          <>
            <span>안녕하세요 관리자 {userName ?? '관리자'}님!</span>
            <button className={styles['logoutButton']} onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <button className={styles['logoutButton']} onClick={handleLogin}>
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
