import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteCartItems } from '@/hooks/useDeleteCart';
import { useGetApi } from '@/hooks/useGetAPI';
import type { Carts } from '@/types/api/Carts.type';

import Button from '../../components/atoms/Button/Button';
import Checkbox from '../../components/atoms/Checkbox/Checkbox';
import CartItemCard from '../../components/Cards/CartItemCard';
import { useCartStore } from '../../store/CartStore';

import styles from './Cart.module.scss';

const CartPage = () => {
  const getCarts = useGetApi('/carts');
  const [checkedItems, setCheckedItems] = useState<{ [id: number]: boolean }>({});
  const { setSelectedItem } = useCartStore();
  const navigate = useNavigate();
  const deleteCart = useDeleteCartItems();

  const handlePaymentClick = (item: Carts) => {
    setSelectedItem(item);
    navigate('/reservation');
  };

  const handleMoveProductPage = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleAllSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    const newChecked: { [id: number]: boolean } = {};
    getCarts?.data?.data.forEach((item) => {
      newChecked[item.cartItemId] = checked;
    });
    setCheckedItems(newChecked);
  };

  const handleItemCheck = (id: number, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleDeleteChecked = () => {
    const items: number[] = [];

    for (const [key, value] of Object.entries(checkedItems)) {
      if (value) items.push(Number(key));
      else continue;
    }

    if (items.length > 0) deleteCart.mutate({ itemIds: items });
  };

  const handleDeleteClick = (cartItemId: number) => {
    deleteCart.mutate({ itemIds: [cartItemId] });
  };

  return (
    <div className={styles.container}>
      <div className={styles.selected}>
        <Checkbox label={'전체 선택'} onChange={handleAllSelectChange} />

        <Button
          variant="xs"
          color="white"
          className={styles.deleteButton}
          onClick={handleDeleteChecked}
        >
          <span>선택한 상품 삭제</span>
        </Button>
      </div>

      {getCarts?.data?.data?.map((item) => (
        <CartItemCard
          key={item.cartItemId}
          item={item}
          checked={!!checkedItems[item.cartItemId]}
          handlePaymentClick={handlePaymentClick}
          onCheckChange={(checked) => handleItemCheck(item.cartItemId, checked)}
          handleDeleteClick={handleDeleteClick}
          handleMoveProductPage={handleMoveProductPage}
        />
      ))}
    </div>
  );
};

export default CartPage;
