import styles from './Card.module.scss';

type CardProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  product_id: number;
  image: string;
  title: string;
  price: number;
  handleCardClick: (product_id: number) => void;
};

const Card = ({ styleName, product_id, image, title, price, handleCardClick }: CardProps) => {
  return (
    <div
      role="button"
      className={`${styles.card} ${styles[`${styleName ?? 'normal'}`]}`}
      onClick={() => handleCardClick(product_id)}
    >
      <div className={styles['cardImage']}>
        <img src={image} alt="Card" draggable="false" />
      </div>
      <div className={styles['cardContent']}>
        <span className={styles['cardTitle']}>{title}</span>
        <p className={styles['cardPrice']}>₩{price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Card;
