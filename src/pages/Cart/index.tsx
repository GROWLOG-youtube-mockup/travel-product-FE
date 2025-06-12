import styles from './Cart.module.scss';

const CartPage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Shopping Cart</h1>
        <p>Check your selected items and make adjustments before checkout.</p>
      </div>
    </>
  );
};

export default CartPage;
