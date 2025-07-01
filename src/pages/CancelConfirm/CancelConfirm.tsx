import Button from '@/components/atoms/Button/Button';
import { useGetApi } from '@/hooks/useGetAPI';

import styles from './CancelConfirm.module.scss';

const CancelConfirmPage = () => {
  const { data: userRes } = useGetApi('/users/me');

  const onClickNextStep = () => {
    console.log('다음으로 버튼 클릭');
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
              {/* <img src={selectedItem?.product.thumbnail_image_url} alt="" /> */}
            </div>
            <div className={styles.itemInfoWrapper}>
              <div className={styles.itemName}>상품명</div>
              <div>2025년 00월 00일</div>
              <div>인원 00명</div>
            </div>
            <div className={styles.price}>₩0원</div>
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
