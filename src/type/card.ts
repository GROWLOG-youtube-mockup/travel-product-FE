export type CardProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  product_id: number;
  image: string;
  title: string;
  price: number;
  handleCardClick: (product_id: number) => void;
};

export type RegionItem = { title: string; regionId: number; image: string };

export type RegionCardProps = RegionItem & {
  handleRegionCardClick: (item: RegionItem) => void;
};
