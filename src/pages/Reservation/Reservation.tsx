import Button from '../../components/atoms/Button/Button';

import styles from './Reservation.module.scss';

const ReservationPage = () => {
  const item = {
    cart_item_id: 10,
    product: {
      product_id: 101,
      name: '시드니 4박 5일 자유 여행',
      thumbnail_image_url:
        'https://cdn.pixabay.com/photo/2021/12/08/05/13/gyeongbok-palace-6854763_1280.jpg',
      price: 1200000
    },
    quantity: 2,
    start_date: '2025-12-23'
  };

  const userInfo = {
    user_id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    phone_number: '01012345678',
    role_code: 0
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
              <img src={item.product.thumbnail_image_url} alt="" />
            </div>
            <div className={styles.itemInfoWrapper}>
              <div>{item.product.name}</div>
              <div>{item.start_date}</div>
              <div>인원 {item.quantity}명</div>
            </div>
            <div className={styles.price}>₩{item.product.price.toLocaleString()}</div>
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>예약자 정보</h1>
          <p className={styles.description}>예약 변경 사항이 있는 경우 안내드립니다.</p>
          <div className={styles.infoWrapper}>
            <div>
              <span>이름 : </span>
              <span>{userInfo.name}</span>
            </div>
            <div>
              <span>전화번호 : </span>
              <span>{userInfo.phone_number}</span>
            </div>
            <div>
              <span>이메일 주소 : </span>
              <span>{userInfo.email}</span>
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <Button className={styles.nextButton}>
              <span>다음으로</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
