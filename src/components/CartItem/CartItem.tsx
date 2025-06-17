import Button from '../../components/atoms/Button/Button';
import Checkbox from '../../components/atoms/Checkbox/Checkbox';

import styles from './CartItem.module.scss';

type CartItemProps = {
  item: {
    cart_item_id: number;
    product: {
      product_id: number;
      name: string;
      thumbnail_image_url: string;
      price: number;
    };
    quantity: number;
    start_date: string;
  };
};

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className={styles.cartItemWrapper}>
      <div className={styles.itemLayout}>
        <Checkbox />
        <div className={styles.itemImage}>
          <img src={item.product.thumbnail_image_url} alt="" />
        </div>
        <div className={styles.itemInfoWrapper}>
          <div>{item.product.name}</div>
          <div>{item.start_date}</div>
          <div>인원 {item.quantity}명</div>
        </div>
        <div className={styles.price}>₩{item.product.price.toLocaleString()}</div>
      </div>
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
          <Button className={`${styles.itemButton} ${styles.paymentButton}`}>결제</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
