import styles from './User.module.scss';

const UserPage = () => {
  return (
    <div className={styles.userPageWrapper}>
      {/* 예정된 여행 리스트 */}
      <div className={styles.sectionTitle}>예정된 여행</div>
      <div className={styles.tripCard}>
        <div className={styles.tripCardHeader}>
          <span className={styles.orderNumber}>주문번호 #1234</span>
        </div>
        <div className={styles.tripInfo}>
          <div className={styles.tripImage} />
          <div className={styles.tripDetails}>
            <div className={styles.tripTitle}>제주도 해변여행</div>
            <div className={styles.tripDate}>2025년 6월 20일부터</div>
            <div className={styles.tripDuration}>4일간</div>
            <div className={styles.tripPeople}>인원 4명</div>
            <div className={styles.tripPrice}>₩00,000</div>
          </div>
        </div>
        <div className={styles.tripUserInfo}>
          <div>이름: 000</div>
          <div>전화번호: 00-0000-0000</div>
          <div>이메일주소: qwer@qwer.com</div>
        </div>
        <div className={styles.tripCardFooter}>
          <button className={styles.productBtn}>해당 상품 페이지로</button>
          <button className={styles.cancelBtn}>결제 취소하기</button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
