import 'dayjs/locale/ko';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import Button from '@/components/atoms/Button/Button';
import { useDeleteCartItems } from '@/hooks/useDeleteCart';
import { useCartStore } from '@/store/CartStore';

import styles from './PaymentComplete.module.scss';

const PaymentCompletePage = () => {
  const navigate = useNavigate();
  const deleteCart = useDeleteCartItems();
  const { selectedItem, clearSelectedItem } = useCartStore();

  useEffect(() => {
    deleteCart.mutate({ itemIds: [selectedItem?.cartItemId ?? 0] });
  }, []);

  const handleMainButtonClick = () => {
    navigate('/');
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
              <dd>#{selectedItem?.order_id}</dd>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.line}></span>
            </div>
            <div className={styles.infoRow}>
              <dt>주문일시</dt>
              <dd>{dayjs(selectedItem?.order_date).format('YYYY-MM-DD HH:MM:ss')}</dd>
            </div>
            <div className={styles.infoRow}>
              <dt>결제금액</dt>
              <dd>₩{selectedItem?.totalPrice.toLocaleString()}</dd>
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
