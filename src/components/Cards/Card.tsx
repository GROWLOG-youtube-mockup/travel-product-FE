import type { CardProps } from '../../type/card';

import styles from './Card.module.scss';

const Card = ({ styleName, image, title, price }: CardProps) => {
  return (
    <div className={`${styles.card} ${styles[`${styleName ?? 'normal'}`]}`}>
      <div className={styles['cardImage']}>
        <img src={image} alt="Card" draggable="false" />
      </div>
      <div className={styles['cardContent']}>
        <span className={styles['cardTitle']}>{title}</span>
        <p className={styles['cardPrice']}>₩{price}</p>
      </div>
    </div>
  );
};

export default Card;
