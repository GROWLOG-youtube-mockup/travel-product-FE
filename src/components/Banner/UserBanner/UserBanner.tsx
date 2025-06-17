import styles from './UserBanner.module.scss';

const UserBanner = () => {
  return (
    <div className={styles.profileHeader}>
      <div>
        <div className={styles.userName}>홍길동</div>
        <div className={styles.userDesc}>
          반갑습니다! 여기에 회원님의 정보를 확인하실 수 있습니다.
        </div>
      </div>
      <button className={styles.editBtn}>회원정보 수정</button>
      <div className={styles.tripSummary}>
        <div>
          <div className={styles.tripLabel}>예정된 여행</div>
          <div className={styles.tripCount}>1</div>
        </div>
        <div>
          <div className={styles.tripLabel}>다녀온 여행</div>
          <div className={styles.tripCount}>0</div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
