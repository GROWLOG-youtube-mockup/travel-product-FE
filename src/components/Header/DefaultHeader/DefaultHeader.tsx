import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/GrowLog.svg';
import { useAuthStore } from '@/store/AuthStore';

import styles from './DefaultHeader.module.scss';

const DefaultHeader = () => {
  const navigate = useNavigate();
  const { name, roleCode, isLoggedIn, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('로그아웃되었습니다.');
    navigate('/', { replace: true });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/Join');
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  const handleMyPage = () => {
    navigate('/user');
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logoArea} onClick={() => navigate('/')}>
          <img src={logo} alt="GrowLog" />
        </div>
        <nav className={styles.menuArea}>
          {isLoggedIn ? (
            <>
              {name && <span>안녕하세요, {name}님!</span>}
              {roleCode !== 1 && (
                <label onClick={handleAdmin} style={{ cursor: 'pointer' }}>
                  관리자페이지
                </label>
              )}
              <label onClick={handleCart} style={{ cursor: 'pointer' }}>
                장바구니
              </label>
              <label onClick={handleMyPage} style={{ cursor: 'pointer' }}>
                마이페이지
              </label>
              <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <label>로그아웃</label>
              </span>
            </>
          ) : (
            <>
              <label onClick={handleSignup} style={{ cursor: 'pointer' }}>
                회원가입
              </label>
              <label onClick={handleLogin} style={{ cursor: 'pointer' }}>
                로그인
              </label>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default DefaultHeader;
