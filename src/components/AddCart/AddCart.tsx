import { formatKoreanDate } from '../../utils/date';
import Button from '../atoms/Button/Button';

import styles from './AddCart.module.scss';

type AddCartProps = {
  data: {
    title: string;
    price: number;
    isSoldOut: boolean;
  };
  selectedData: {
    count: number;
    date: Date;
  };
  handleSelectedCount: (count: number) => void;
};

const AddCart = ({ data, selectedData, handleSelectedCount }: AddCartProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoLayout}>
        <h1 className={styles.title}>{data.title}</h1>

        <div className={styles.selectedWrapper}>
          <div>
            <span className={styles.text}>인원</span>
          </div>
          <div className={styles.countWrapper}>
            <Button
              color="white"
              className={styles.countButton}
              onClick={() => handleSelectedCount(-1)}
              disabled={data.isSoldOut || selectedData.count <= 0}
            >
              -
            </Button>
            <span>{selectedData.count}</span>
            <Button
              color="white"
              className={styles.countButton}
              onClick={() => handleSelectedCount(1)}
              disabled={data.isSoldOut}
            >
              +
            </Button>
          </div>
        </div>

        <span className={styles.line}></span>

        <div>
          <span>선택날짜: </span>
          <span>{formatKoreanDate(selectedData.date)}</span>
        </div>

        <span className={styles.line}></span>

        <div>
          <span className={styles.price}>₩{data.price.toLocaleString()}</span>
        </div>
      </div>

      {data.isSoldOut && (
        <div>
          <span className={styles.soldOut}>SLOD OUT</span>
        </div>
      )}

      <div className={styles.buttonLayout}>
        <Button variant="rounded" disabled={data.isSoldOut}>
          장바구니에 담기
        </Button>
        <Button variant="rounded" disabled={data.isSoldOut}>
          바로 예약하기
        </Button>
      </div>
    </div>
  );
};

export default AddCart;
