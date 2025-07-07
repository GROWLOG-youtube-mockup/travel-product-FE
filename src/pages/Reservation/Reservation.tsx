import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button/Button';
import { useGetApi } from '@/hooks/useGetAPI';
import { useCartStore } from '@/store/CartStore';

import styles from './Reservation.module.scss';

const ReservationPage = () => {
  const navigate = useNavigate();
  const userRes = useGetApi(`/users/me`);
  const { selectedItem } = useCartStore();

  const onClickNextStep = () => {
    navigate('/payment-process');
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectedPage}>
        <div className={styles.reservation}>
          <span>예약 정보 확인</span>
        </div>
        <div>
          <span>결제 진행</span>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.item}>
          <h1 className={styles.title}>결제 상품</h1>
          <div className={styles.itemWrapper}>
            <div className={styles.itemImage}>
              <img
                src="https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg"
                alt=""
              />
            </div>
            <div className={styles.itemInfoWrapper}>
              <div>{selectedItem?.productName}</div>
              <div>{selectedItem?.startDate}</div>
              <div>인원 {selectedItem?.quantity}명</div>
            </div>
            <div className={styles.price}>
              ₩{((selectedItem?.price ?? 0) * (selectedItem?.quantity ?? 0)).toLocaleString()}
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>예약자 정보</h1>
          <p className={styles.description}>예약 변경 사항이 있는 경우 안내드립니다.</p>
          <div className={styles.infoWrapper}>
            <div>
              <span>이름 : </span>
              <span>{userRes?.data?.data?.name}</span>
            </div>
            <div>
              <span>전화번호 : </span>
              <span>{userRes?.data?.data?.phoneNumber}</span>
            </div>
            <div>
              <span>이메일 주소 : </span>
              <span>{userRes?.data?.data?.email}</span>
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

export default ReservationPage;
