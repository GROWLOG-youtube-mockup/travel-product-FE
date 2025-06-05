import styles from './PaymentProcess.module.scss';

const PaymentProcessPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left__section}>
          <h1>Payment Process</h1>
          <p>Please provide your payment information to complete the transaction.</p>
        </div>
        <div className={styles.right__section}>
          <p>modal</p>
        </div>
      </div>
    </>
  );
};

export default PaymentProcessPage;
