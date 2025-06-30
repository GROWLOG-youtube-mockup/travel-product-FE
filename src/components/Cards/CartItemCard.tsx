import type { Carts } from '@/types/api/Carts.type';

import Button from '../atoms/Button/Button';
import Checkbox from '../atoms/Checkbox/Checkbox';

import styles from './CartItemCard.module.scss';

type CartItemProps = {
  item: Carts;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  handlePaymentClick: (item: Carts) => void;
  handleDeleteClick: (cartItemId: number) => void;
  handleMoveProductPage: (productId: number) => void;
};

const CartItemCard = ({
  item,
  checked,
  handlePaymentClick,
  onCheckChange,
  handleDeleteClick,
  handleMoveProductPage
}: CartItemProps) => {
  return (
    <div className={styles.cartItemWrapper}>
      <div className={styles.itemLayout}>
        <Checkbox checked={checked} onChange={(e) => onCheckChange(e.target.checked)} />
        <div className={styles.itemImage}>
          <img src="https://cdn.pixabay.com/photo/2021/11/04/16/19/travel-6768660_1280.png" />
        </div>
        <div className={styles.itemInfoWrapper}>
          <div>{item.productName}</div>
          <div>{item.startDate}</div>
          <div>인원 {item.quantity}명</div>
        </div>
        <div className={styles.price}>₩{(item.price * item.quantity).toLocaleString()}</div>
      </div>
      <span className={styles.line}></span>
      <div className={styles.buttonLayout}>
        <div>
          <Button
            className={`${styles.itemButton} ${styles.secondary}`}
            onClick={() => {
              handleMoveProductPage(item?.productId);
            }}
          >
            <span>해당 상품 페이지로</span>
          </Button>
          <Button
            className={`${styles.itemButton} ${styles.secondary}`}
            onClick={() => {
              handleDeleteClick(item?.cartItemId ?? 0);
            }}
          >
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
