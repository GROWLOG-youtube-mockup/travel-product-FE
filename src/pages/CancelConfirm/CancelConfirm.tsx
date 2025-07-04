import { useLocation, useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import Button from '@/components/atoms/Button/Button';
import { useGetApi } from '@/hooks/useGetAPI';

import styles from './CancelConfirm.module.scss';

const CancelConfirmPage = () => {
  const { pathname } = useLocation();
  const orderId = pathname.split('/').pop();
  const navigate = useNavigate();
  const { data: userRes } = useGetApi('/users/me');
  const { data: orderRes } = useGetApi(`/orders/${orderId}`);

  const onClickNextStep = () => {
    navigate(`/CancelProgress/${orderId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectedPage}>
        <div className={styles.reservation}>
          <span className={styles.nowPage}>결제 취소 확인</span>
        </div>
        <div>
          <span>결제 취소 진행</span>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.item}>
          <h1 className={styles.title}>결제 취소 상품</h1>
          <div className={styles.itemWrapper}>
            <div className={styles.itemImage}>
              {/* <img src={orderRes?.data?.items[0]?.} alt="" /> */}
            </div>
            <div className={styles.itemInfoWrapper}>
              <div className={styles.itemName}>{orderRes?.data?.items[0]?.productName}</div>
              <div>{dayjs(orderRes?.data?.order_date).format('YYYY-MM-DD HH:MM:ss')}</div>
              <div>인원 {orderRes?.data?.items[0]?.peopleCount}명</div>
            </div>
            <div className={styles.price}>₩{orderRes?.data?.total_price?.toLocaleString()}</div>
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>예약자 정보</h1>
          <div className={styles.infoWrapper}>
            <div>
              <span>이름 : </span>
              <span>{userRes?.data?.name}</span>
            </div>
            <div>
              <span>전화번호 : </span>
              <span>{userRes?.data?.phoneNumber}</span>
            </div>
            <div>
              <span>이메일 주소 : </span>
              <span>{userRes?.data?.email}</span>
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <Button className={styles.nextButton} onClick={onClickNextStep}>
              <span>다음으로</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmPage;
