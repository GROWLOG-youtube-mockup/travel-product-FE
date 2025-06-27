import type { Product } from '@/types/api/Product.type';

import Card from './Card';

import styles from './CardSlide.module.scss';

type CardSlideProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  productList: Product[];
  handleCardClick: (product_id: number) => void;
};

const CardSlide = ({ styleName, productList, handleCardClick }: CardSlideProps) => {
  return (
    <div className={styles['cardSlide']}>
      {productList.map((card: Product) => (
        <Card
          key={card.productId}
          productId={card.productId}
          styleName={styleName ?? 'normal'}
          image={card.imageUrls[0]}
          title={card.name}
          price={card.price}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default CardSlide;
