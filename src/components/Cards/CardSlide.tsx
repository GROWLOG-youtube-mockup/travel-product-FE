import type { CardProps, CardSlideProps } from '../../type/card';

import Card from './Card';

import styles from './CardSlide.module.scss';

const CardSlide = ({ cardList }: CardSlideProps) => {
  return (
    <div className={styles['cardSlide']}>
      {cardList.map((card: CardProps) => (
        <Card
          key={card.title}
          styleName={card.styleName ?? 'normal'}
          image={card.image}
          title={card.title}
          price={card.price}
        />
      ))}
    </div>
  );
};

export default CardSlide;
