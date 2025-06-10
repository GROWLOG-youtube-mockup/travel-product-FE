export type CardProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  image: string;
  title: string;
  price: number;
};

export type CardSlideProps = {
  cardList: CardProps[];
};

export type LocationCardProps = {
  image: string;
  title: string;
};

export type LocationCardListProps = {
  LocationCardList: LocationCardProps[];
};
