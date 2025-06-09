export type CardProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  image: string;
  title: string;
  price: number;
};

export type CardSlideProps = {
  cardList: CardProps[];
};
