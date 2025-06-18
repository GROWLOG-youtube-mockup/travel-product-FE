import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/atoms/Button/Button';
import Checkbox from '../../components/atoms/Checkbox/Checkbox';
import CartItemCard from '../../components/Cards/CartItemCard';
import { useCartStore } from '../../store/CartStore';
import type { CartItem, CartItems } from '../../type/cart';

import styles from './Cart.module.scss';

const CartPage = () => {
  const [items, setItems] = useState<CartItems>([]);
  const [checkedItems, setCheckedItems] = useState<{ [id: number]: boolean }>({});
  const { setSelectedItem } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/cart');
        if (!res.ok) throw new Error('네트워크 오류');
        const data = await res.json();
        setItems(data);
      } catch (err: any) {
        navigate('/error');
      }
    };

    fetchCart();
  }, []);

  const handlePaymentClick = (item: CartItem) => {
    setSelectedItem(item);
    navigate('/reservation');
  };

  const handleAllSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    const newChecked: { [id: number]: boolean } = {};
    items.forEach((item) => {
      newChecked[item.cart_item_id] = checked;
    });
    setCheckedItems(newChecked);
  };

  const handleItemCheck = (id: number, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleDeleteClick = () => {
    console.log(checkedItems);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selected}>
        <Checkbox label={'전체 선택'} onChange={handleAllSelectChange} />

        <Button
          variant="xs"
          color="white"
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        >
          <span>선택한 상품 삭제</span>
        </Button>
      </div>

      {items.map((item) => (
        <CartItemCard
          key={item.cart_item_id}
          item={item}
          checked={!!checkedItems[item.cart_item_id]}
          handlePaymentClick={handlePaymentClick}
          onCheckChange={(checked) => handleItemCheck(item.cart_item_id, checked)}
        />
      ))}
    </div>
  );
};

export default CartPage;
