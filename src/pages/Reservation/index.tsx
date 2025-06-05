import styles from './Reservation.module.scss';

const ReservationPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left__section}>
          <h1>Reservation Page</h1>
          <p>This is the reservation page where users can make reservations.</p>
        </div>
        <div className={styles.right__section}>
          <p>modal place</p>
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
