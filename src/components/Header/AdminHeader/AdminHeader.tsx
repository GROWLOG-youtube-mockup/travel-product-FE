import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/AuthStore';

import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { isLoggedIn, name } = useAuthStore();

  const handleLogout = () => {
    toast.success('로그아웃되었습니다.');
    navigate('/admin/login', { replace: true });
  };
  return (
    <div className={styles.headerWrapper}>
      <header className={styles['header']}>
        <h1 className={styles['headerTitle']}>관리자 대시보드</h1>
        <div className={styles['userInfo']}>
          {isLoggedIn ? (
            <>
              <span>안녕하세요, 관리자 {name}님!</span>
              <button className={styles['logoutButton']} onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            ''
          )}
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
