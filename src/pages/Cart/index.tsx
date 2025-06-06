import styles from './Cart.module.scss';

const CartPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left__section}>
          <h1>Shopping Cart</h1>
          <p>Check your selected items and make adjustments before checkout.</p>
        </div>
        <div className={styles.right__section}>
          <p>modal place</p>
        </div>
      </div>
    </>
  );
};

export default CartPage;
