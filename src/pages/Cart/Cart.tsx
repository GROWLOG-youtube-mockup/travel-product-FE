import Button from '../../components/atoms/Button/Button';

import styles from './Cart.module.scss';

const CartPage = () => {
  // TODO: API에서 장바구니 아이템을 가져오는 로직을 추가 후 수정 필요
  const items = [
    {
      cart_item_id: 10,
      product: {
        product_id: 101,
        name: '시드니 4박 5일 자유 여행',
        thumbnail_image_url:
          'https://cdn.pixabay.com/photo/2021/12/08/05/13/gyeongbok-palace-6854763_1280.jpg',
        price: 1200000
      },
      quantity: 2,
      start_date: '2025-12-23'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.selected}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="" id="" className={styles.checkbox} />
          전체선택
        </label>

        <Button variant="xs" color="white" className={styles.deleteButton}>
          <span>선택한 상품 삭제</span>
        </Button>
      </div>

      <div>
        {items.map((item) => (
          <div key={item.cart_item_id}>
            <div>
              <input type="checkbox" name="" id="" />
            </div>
            <div>
              <img src={item.product.thumbnail_image_url} />
            </div>
            <div>
              <div>{item.product.name}</div>
              <div>{item.start_date}</div>
              <div>{item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
