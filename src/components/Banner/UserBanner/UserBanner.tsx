import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const tabList = [
    { label: '예정된 여행', tab: 'upcoming', count: upcomingCount },
    { label: '다녀온 여행', tab: 'past', count: pastCount }
  ];

  return (
    <div className={styles.banner}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.name}>홍길동</div>
          <div className={styles.desc}>
            반갑습니다! 여기에 회원님의 정보를 확인하실 수 있습니다.
          </div>
          <Button variant="xs" onClick={() => navigate('/user-edit')}>
            회원정보 수정
          </Button>
        </div>
        <div className={styles.tabs}>
          {tabList.map(({ label, tab: t, count }) => (
            <div
              key={t}
              onClick={() => setTab(t as TripTab)}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
              className={styles.tabBtn}
            >
              <div className={tab === t ? `${styles.tabLabel} ${styles.active}` : styles.tabLabel}>
                {label}
              </div>
              <div className={styles.tabCount}>{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
