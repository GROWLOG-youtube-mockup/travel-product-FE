import type { CardProps } from '../../type/card';

import styles from './Card.module.scss';

const Card = ({ styleName, image, title, price }: CardProps) => {
  return (
    <div className={`${styles.card} ${styles[`card--${styleName ?? 'normal'}`]}`}>
      <div className={styles['card__image']}>
        <img src={image} alt="Card" draggable="false" />
      </div>
      <div className={styles['card__content']}>
        <span className={styles['card__title']}>{title}</span>
        <p className={styles['card__price']}>₩{price}</p>
      </div>
    </div>
  );
};

export default Card;
