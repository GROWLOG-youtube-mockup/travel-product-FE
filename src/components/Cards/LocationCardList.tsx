import type { LocationCardListProps, LocationCardProps } from '../../type/card';

import LocationCard from './LocationCard';

import styles from './LocationCardList.module.scss';

const LocationCardList = ({ LocationCardList }: LocationCardListProps) => {
  return (
    <div className={styles['cardSlide']}>
      {LocationCardList.map((card: LocationCardProps) => (
        <LocationCard key={card.title} image={card.image} title={card.title} />
      ))}
    </div>
  );
};

export default LocationCardList;
