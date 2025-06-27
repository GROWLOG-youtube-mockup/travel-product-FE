import styles from './Card.module.scss';

type CardProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  productId: number;
  image: string;
  title: string;
  price: number;
  handleCardClick: (productId: number) => void;
  isGrid?: boolean;
};

const Card = ({
  styleName,
  productId,
  image,
  title,
  price,
  handleCardClick,
  isGrid
}: CardProps) => {
  return (
    <div
      role="button"
      className={`${styles.card} ${styles[`${styleName ?? 'normal'}`]} ${isGrid ? styles.gridCard : ''}`}
      onClick={() => handleCardClick(productId)}
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
