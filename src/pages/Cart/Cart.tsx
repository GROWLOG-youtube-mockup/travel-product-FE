import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '@/hooks/useCart';

import Button from '../../components/atoms/Button/Button';
import Checkbox from '../../components/atoms/Checkbox/Checkbox';
import CartItemCard from '../../components/Cards/CartItemCard';
import { useCartStore } from '../../store/CartStore';
import type { CartItem, CartItems } from '../../types/cart';

import styles from './Cart.module.scss';

const CartPage = () => {
  const { data: cartItems, isLoading, isError, error, isFetching } = useCart();
  const [items, setItems] = useState<CartItems>(cartItems?.data || []);
  const [checkedItems, setCheckedItems] = useState<{ [id: number]: boolean }>({});
  const { setSelectedItem } = useCartStore();
  const navigate = useNavigate();

  const handlePaymentClick = (item: CartItem) => {
    setSelectedItem(item);
    navigate('/reservation');
  };

  const handleAllSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    const newChecked: { [id: number]: boolean } = {};
    items.forEach((item) => {
      newChecked[item.cartItemId] = checked;
    });
    setCheckedItems(newChecked);
  };

  const handleItemCheck = (id: number, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleDeleteClick = async () => {
    for (const id in checkedItems) {
      if (checkedItems[id]) {
        try {
          const res = await fetch(`/cart/${id}`, {
            method: 'DELETE'
          });
          if (!res.ok) throw new Error('삭제 실패');
        } catch (err: any) {
          console.error(err);
          return;
        }
      }
    }
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

      {cartItems?.data?.map((item) => (
        <CartItemCard
          key={item.cartItemId}
          item={item}
          checked={!!checkedItems[item.cartItemId]}
          handlePaymentClick={handlePaymentClick}
          onCheckChange={(checked) => handleItemCheck(item.cartItemId, checked)}
        />
      ))}
    </div>
  );
};

export default CartPage;
