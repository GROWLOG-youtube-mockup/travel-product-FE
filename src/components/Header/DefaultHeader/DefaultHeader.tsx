import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/GrowLog.svg';
import { useAuthStore } from '@/store/AuthStore';

import styles from './DefaultHeader.module.scss';

const DefaultHeader = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const name = useAuthStore((state) => state.name);

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

  const handleMyPage = () => {
    navigate('/mypage');
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
