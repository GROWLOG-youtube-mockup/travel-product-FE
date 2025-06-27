import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearAuthFromLocalStorage, getAccessToken } from '@/utils/auth';

import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    const name = localStorage.getItem('adminName');

    setIsLoggedIn(!!token);
    setUserName(name);
  }, []);

  const handleLogout = () => {
    clearAuthFromLocalStorage();
    navigate('/admin/login');
  };

  return (
    <header className={styles['header']}>
      <h1 className={styles['headerTitle']}>관리자 대시보드</h1>
      {isLoggedIn && (
        <div className={styles['userInfo']}>
          <div>
            <span>안녕하세요 관리자 {userName ?? '관리자'}님!</span>
          </div>
          <button className={styles['logoutButton']} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
