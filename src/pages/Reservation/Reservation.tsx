import styles from './Reservation.module.scss';

const ReservationPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.selected}>
          <div>
            <span>예약 정보 확인</span>
          </div>
          <div>
            <span>결제 진행</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
