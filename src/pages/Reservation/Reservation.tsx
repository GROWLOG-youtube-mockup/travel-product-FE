import { useEffect, useState } from 'react';

import Button from '../../components/atoms/Button/Button';
import type { CartItems } from '../../type/cart';
import type { User } from '../../type/user';
import { normalizePhoneNumber } from '../../utils/phone';

import styles from './Reservation.module.scss';

const ReservationPage = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [items, setItems] = useState<CartItems | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/cart');
        if (!res.ok) throw new Error('네트워크 오류');
        const data = await res.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch('/users/me');
        if (!res.ok) throw new Error('네트워크 오류');
        const data = await res.json();
        setUserInfo(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCart();
    fetchUser();
  }, []);

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

          {items?.map((item) => (
            <div className={styles.itemWrapper} key={item.cart_item_id}>
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
          ))}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>예약자 정보</h1>
          <p className={styles.description}>예약 변경 사항이 있는 경우 안내드립니다.</p>
          <div className={styles.infoWrapper}>
            <div>
              <span>이름 : </span>
              <span>{userInfo?.name}</span>
            </div>
            <div>
              <span>전화번호 : </span>
              <span>{userInfo?.phone_number && normalizePhoneNumber(userInfo?.phone_number)}</span>
            </div>
            <div>
              <span>이메일 주소 : </span>
              <span>{userInfo?.email}</span>
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
