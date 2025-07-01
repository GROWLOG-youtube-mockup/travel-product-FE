import 'dayjs/locale/ko';

import { useLocation, useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import Button from '@/components/atoms/Button/Button';
import { useGetApi } from '@/hooks/useGetAPI';

import styles from './CancelComplete.module.scss';

const CancelCompletePage = () => {
  const { pathname } = useLocation();
  const orderId = pathname.split('/').pop();
  const { data: orderRes } = useGetApi(`/orders/${orderId}`);

  const navigate = useNavigate();

  const handleMainButtonClick = () => {
    navigate('/main');
  };

  const handleUserButtonClick = () => {
    navigate('/user');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.orderContent}>
          <dl className={styles.orderInfo}>
            <div className={styles.infoRow}>
              <dd>{orderRes?.data?.items[0]?.productName} 결제 취소가 완료되었습니다.</dd>
            </div>
            <div className={styles.infoRow}>
              <dt>주문번호</dt>
              <dd>#{orderRes?.data?.order_id}</dd>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.line}></span>
            </div>
            <div className={styles.infoRow}>
              <dt>주문일시</dt>
              <dd>{dayjs(orderRes?.data?.order_date).format('YYYY-MM-DD HH:MM:ss')}</dd>
            </div>
            <div className={styles.infoRow}>
              <dt>결제금액</dt>
              <dd>₩{(orderRes?.data?.total_price ?? 0).toLocaleString()}</dd>
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

export default CancelCompletePage;
