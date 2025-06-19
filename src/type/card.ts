export type CardProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  product_id: number;
  image: string;
  title: string;
  price: number;
  handleCardClick: (product_id: number) => void;
};

export type LocationCardProps = {
  image: string;
  title: string;
};

export type LocationCardListProps = {
  LocationCardList: LocationCardProps[];
};
