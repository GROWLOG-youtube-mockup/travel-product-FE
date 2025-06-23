export type CardProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  product_id: number;
  image: string;
  title: string;
  price: number;
  handleCardClick: (product_id: number) => void;
};

export type LocationItem = { title: string; regionId: number[]; image: string };

export type LocationCardProps = {
  image: string;
  title: string;
  regionId: number;
  handleLocationCardClick: (regionId: number) => void;
};
