import styles from './PaymentComplete.module.scss';

const PaymentCompletePage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Payment Complete</h1>
        <p>Thank you for your purchase! Your payment has been successfully processed.</p>
      </div>
    </>
  );
};

export default PaymentCompletePage;
