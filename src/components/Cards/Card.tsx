import type { CardProps } from '../../type/card';

import styles from './Card.module.scss';

const Card = ({ styleName, image, title, price }: CardProps) => {
  return (
    <div className={`${styles.card} ${styles[styleName ?? 'normal']}`}>
      <div className={styles.card_image}>
        <img src={image} alt="Card" draggable="false" />
      </div>
      <div className={styles.card_content}>
        <span className={styles.card_title}>{title}</span>
        <p className={styles.card_price}>₩{price}</p>
      </div>
    </div>
  );
};

export default Card;
