import Label from '../../atoms/Label/Label';

import styles from './DefaultHeader.module.scss';

//props로 받아오도록 되어있는데 추후 zustand에 맞춰서 변경 예정
interface DefaultHeaderProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const DefaultHeader = ({ isLoggedIn, onLogout }: DefaultHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Label className={styles.logo} variant="title" style={{ fontWeight: 700 }}>
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
  );
};

export default DefaultHeader;
