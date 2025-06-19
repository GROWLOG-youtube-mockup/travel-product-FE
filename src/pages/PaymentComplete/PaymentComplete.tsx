import { useEffect, useMemo, useState } from 'react';

import Button from '../../components/atoms/Button/Button';
import { useCartStore } from '../../store/CartStore';
import type { Order } from '../../type/order';

import styles from './PaymentComplete.module.scss';

const PaymentCompletePage = () => {
  const selectedItem = useCartStore((state) => state.selectedItem);
  const [order, setOrder] = useState<Order | null>(null);

  const { setSelectedItem } = useCartStore();

  useEffect(() => {
    fetch('/orders')
      .then((response) => {
        if (!response.ok) throw new Error('주문 실패');

        return response.json();
      })
      .then((data) => {
        const latestOrder = data[data.length - 1];
        setOrder(latestOrder);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  useEffect(() => {
    setSelectedItem({
      cart_item_id: 10,
      product: {
        product_id: 101,
        name: '시드니 4박 5일 자유 여행',
        thumbnail_image_url: 'https://cdn.example.com/product101.jpg',
        price: 1200000
      },
      quantity: 2,
      start_date: '2025-12-23'
    });
  }, []);

  const processedOrders = useMemo(() => {
    if (!order) return null;
    return { ...order, order_date: new Date(order.order_date).toLocaleString() };
  }, [order]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.orderContent}>
          <p>
            <span>{selectedItem?.product.name} 결제가 완료되었습니다.</span>
          </p>
          <p>
            <span>주문번호 #{order?.order_id}</span>
          </p>

          <span className={styles.line}></span>

          <p>
            <span>주문일시 {processedOrders?.order_date}</span>
          </p>
          <p>
            <span>결제금액 ₩{processedOrders?.total_price.toLocaleString()}</span>
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button>
            <span>메인으로 돌아가기</span>
          </Button>
          <Button>
            <span>메인페이지에서 확인하기</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentCompletePage;
