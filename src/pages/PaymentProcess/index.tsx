import styles from './PaymentProcess.module.scss';

const PaymentProcessPage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Payment Process</h1>
        <p>Please provide your payment information to complete the transaction.</p>
      </div>
    </>
  );
};

export default PaymentProcessPage;
