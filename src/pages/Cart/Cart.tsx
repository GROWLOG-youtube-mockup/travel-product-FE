import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import CartItemCard from '@/components/Cards/CartItemCard';
import { useDeleteCartItems } from '@/hooks/useDeleteCart';
import { useGetApi } from '@/hooks/useGetAPI';
import { usePostApi } from '@/hooks/usePostAPI';
import { useCartStore } from '@/store/CartStore';
import type { Carts } from '@/types/api/Carts.type';

import styles from './Cart.module.scss';

const CartPage = () => {
  const navigate = useNavigate();
  const cartRes = useGetApi('/carts');
  const userRes = useGetApi('/users/me');
  const { mutate: createOrder, isPending } = usePostApi('/orders');
  const [checkedItems, setCheckedItems] = useState<{ [id: number]: boolean }>({});
  const { setSelectedItem } = useCartStore();
  const deleteCart = useDeleteCartItems();

  const handlePaymentClick = (item: Carts) => {
    createOrder(
      {
        params: { email: userRes.data?.data?.email ?? '' },
        items: [
          {
            peopleCount: item.quantity,
            product_id: Number(item.productId),
            start_date: item.startDate
          }
        ]
      },
      {
        onSuccess: (data) => {
          setSelectedItem({
            cartItemId: item.cartItemId,
            productId: Number(item.productId),
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            startDate: item.startDate,
            stockQuantity: item.stockQuantity,
            totalPrice: item.totalPrice,
            productImage: item.productImage,
            ...data?.data
          });
          navigate('/reservation');
        },
        onError: (error: any) => {
          navigate(`/error/${error?.error?.code}`);
        }
      }
    );
  };

  const handleMoveProductPage = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleAllSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    const newChecked: { [id: number]: boolean } = {};
    cartRes?.data?.data.forEach((item) => {
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
    // deleteCart.mutate({ itemIds: [cartItemId] });
    deleteCart.mutate(
      { itemIds: [cartItemId] },
      {
        onSuccess: () => {
          cartRes.refetch();
        }
      }
    );
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

      {cartRes?.data?.data?.map((item) => (
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
