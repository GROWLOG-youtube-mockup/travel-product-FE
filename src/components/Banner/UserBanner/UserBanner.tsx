import Button from '../../atoms/Button/Button';

import styles from './UserBanner.module.scss';

type TripTab = 'upcoming' | 'past';

interface UserBannerProps {
  tab: TripTab;
  setTab: (tab: TripTab) => void;
  upcomingCount: number;
  pastCount: number;
}

const UserBanner = ({ tab, setTab, upcomingCount, pastCount }: UserBannerProps) => {
  return (
    <div className={styles.bannerBg}>
      <div className={styles.profileHeader}>
        <div className={styles.leftSection}>
          <div className={styles.userName}>홍길동</div>
          <div className={styles.userDesc}>
            반갑습니다! 여기에 회원님의 정보를 확인하실 수 있습니다.
          </div>
          <Button variant="xs">회원정보 수정</Button>
        </div>
        <div className={styles.tripSummary}>
          <div>
            <div
              className={
                tab === 'upcoming' ? `${styles.tripLabel} ${styles.active}` : styles.tripLabel
              }
              onClick={() => setTab('upcoming')}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              예정된 여행
            </div>
            <div className={styles.tripCount}>{upcomingCount}</div>
          </div>
          <div>
            <div
              className={tab === 'past' ? `${styles.tripLabel} ${styles.active}` : styles.tripLabel}
              onClick={() => setTab('past')}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              다녀온 여행
            </div>
            <div className={styles.tripCount}>{pastCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
