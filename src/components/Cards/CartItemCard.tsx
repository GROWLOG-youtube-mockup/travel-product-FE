import type { CartItem } from '../../type/cart';
import Button from '../atoms/Button/Button';
import Checkbox from '../atoms/Checkbox/Checkbox';

import styles from './CartItemCard.module.scss';

type CartItemProps = {
  item: CartItem;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  handlePaymentClick: (item: CartItem) => void;
};

const CartItemCard = ({ item, checked, handlePaymentClick, onCheckChange }: CartItemProps) => {
  return (
    <div className={styles.cartItemWrapper}>
      <div className={styles.itemLayout}>
        <Checkbox checked={checked} onChange={(e) => onCheckChange(e.target.checked)} />
        <div className={styles.itemImage}>
          <img src="https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg" alt="" />
        </div>
        <div className={styles.itemInfoWrapper}>
          <div>{item.productName}</div>
          <div>{item.startDate}</div>
          <div>인원 {item.quantity}명</div>
        </div>
        <div className={styles.price}>₩{item.price.toLocaleString()}</div>
      </div>
      <span className={styles.line}></span>
      <div className={styles.buttonLayout}>
        <div>
          <Button className={`${styles.itemButton} ${styles.secondary}`}>
            <span>해당 상품 페이지로</span>
          </Button>
          <Button className={`${styles.itemButton} ${styles.secondary}`}>
            <span>삭제</span>
          </Button>
        </div>
        <div>
          <Button
            className={`${styles.itemButton} ${styles.paymentButton}`}
            onClick={() => handlePaymentClick(item)}
          >
            결제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
