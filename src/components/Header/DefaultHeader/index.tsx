import { useNavigate } from 'react-router-dom';

import Label from '../../atoms/Label/Label';

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
        <div
          className={styles.logoArea}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <Label variant="title" style={{ fontWeight: 700 }}>
            logo
          </Label>
        </div>
        <nav className={styles.menuArea}>
          {isLoggedIn ? (
            <>
              <Label variant="bodyText">장바구니</Label>
              <Label variant="bodyText">마이페이지</Label>
              <span onClick={onLogout} style={{ cursor: 'pointer' }}>
                <Label variant="bodyText">로그아웃</Label>
              </span>
            </>
          ) : (
            <>
              <Label variant="bodyText">회원가입</Label>
              <Label variant="bodyText">로그인</Label>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default DefaultHeader;
