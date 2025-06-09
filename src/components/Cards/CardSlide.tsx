import type { CardProps, CardSlideProps } from '../../type/card';

import Card from './Card';

const CardSlide = ({ cardList }: CardSlideProps) => {
  return (
    <>
      {cardList.map((card: CardProps) => (
        <Card
          key={card.title}
          styleName={card.styleName ?? 'normal'}
          image={card.image}
          title={card.title}
          price={card.price}
        />
      ))}
    </>
  );
};

export default CardSlide;
