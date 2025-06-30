import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/atoms/Button/Button';
import { useCartStore } from '../../store/CartStore';
import type { Order } from '../../types/order';

import styles from './PaymentComplete.module.scss';

const PaymentCompletePage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const { selectedItem, clearSelectedItem } = useCartStore();

  useEffect(() => {
    fetch('/orders')
      .then((response) => {
        if (!response.ok) throw new Error('주문 실패');

        return response.json();
      })
      .then((data) => {
        const getOrder = data[0];
        setOrder(getOrder);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const processedOrders = useMemo(() => {
    if (!order) return null;
    return { ...order, order_date: new Date(order.order_date).toLocaleString() };
  }, [order]);

  const handleMainButtonClick = () => {
    navigate('/main');
    clearSelectedItem();
  };

  const handleUserButtonClick = () => {
    navigate('/user');
    clearSelectedItem();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.orderContent}>
          <dl className={styles.orderInfo}>
            <div className={styles.infoRow}>
              <dd>{selectedItem?.productName} 결제가 완료되었습니다.</dd>
            </div>
            <div className={styles.infoRow}>
              <dt>주문번호</dt>
              <dd>#{order?.order_id}</dd>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.line}></span>
            </div>
            <div className={styles.infoRow}>
              <dt>주문일시</dt>
              <dd>{processedOrders?.order_date}</dd>
            </div>
            <div className={styles.infoRow}>
              <dt>결제금액</dt>
              <dd>₩{processedOrders?.total_price.toLocaleString()}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.buttonWrapper}>
          <Button onClick={handleMainButtonClick}>
            <span>메인으로 돌아가기</span>
          </Button>
          <Button onClick={handleUserButtonClick}>
            <span>마이페이지에서 확인하기</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentCompletePage;
