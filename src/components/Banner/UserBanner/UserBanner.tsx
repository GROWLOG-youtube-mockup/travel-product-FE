import { useState } from 'react';

import Button from '../../atoms/Button/Button';

import styles from './UserBanner.module.scss';

const UserBanner = () => {
  const [activeTrip, setActiveTrip] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div className={styles.bannerBg}>
      <div className={styles.profileHeader}>
        <div className={styles.leftSection}>
          <div className={styles.userName}>홍길동</div>
          <div className={styles.userDesc}>
            반갑습니다! 여기에 회원님의 정보를 확인하실 수 있습니다.
          </div>
          <Button className={styles.editBtn}>회원정보 수정</Button>
        </div>
        <div className={styles.tripSummary}>
          <div>
            <div
              className={
                activeTrip === 'upcoming'
                  ? `${styles.tripLabel} ${styles.active}`
                  : styles.tripLabel
              }
              onClick={() => setActiveTrip('upcoming')}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              예정된 여행
            </div>
            <div className={styles.tripCount}>1</div>
          </div>
          <div>
            <div
              className={
                activeTrip === 'past' ? `${styles.tripLabel} ${styles.active}` : styles.tripLabel
              }
              onClick={() => setActiveTrip('past')}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              다녀온 여행
            </div>
            <div className={styles.tripCount}>0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
