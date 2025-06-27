export type CardProps = {
  styleName: 'normal' | 'longHeight' | 'longWidth';
  productId: number;
  image: string;
  title: string;
  price: number;
  handleCardClick: (productId: number) => void;
};

export type RegionItem = { title: string; regionId: number; image: string; description?: string };

export type RegionCardProps = RegionItem & {
  handleRegionCardClick: (item: RegionItem) => void;
};
