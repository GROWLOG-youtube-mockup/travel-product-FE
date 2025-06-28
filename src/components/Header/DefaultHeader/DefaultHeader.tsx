import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

import logo from '../../../assets/GrowLog.svg';

import styles from './DefaultHeader.module.scss';

const DefaultHeader = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logoArea} onClick={() => navigate('/')}>
          <img src={logo} alt="" />
        </div>
        <nav className={styles.menuArea}>
          {isLoggedIn ? (
            <>
              <label>장바구니</label>
              <label>마이페이지</label>
              <span onClick={logout} style={{ cursor: 'pointer' }}>
                <label>로그아웃</label>
              </span>
            </>
          ) : (
            <>
              <label>회원가입</label>
              <label>로그인</label>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default DefaultHeader;
