import { useNavigate } from 'react-router-dom';

import styles from './DefaultHeader.module.scss';

// 현재는 로그인 상태를 props로 받지만, 추후 논의후 변경예정
interface DefaultHeaderProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const DefaultHeader = ({ isLoggedIn, onLogout }: DefaultHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logoArea} onClick={() => navigate('/')}>
          <label className={styles.logoStyle}>logo</label>
        </div>
        <nav className={styles.menuArea}>
          {isLoggedIn ? (
            <>
              <label>장바구니</label>
              <label>마이페이지</label>
              <span onClick={onLogout} style={{ cursor: 'pointer' }}>
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
