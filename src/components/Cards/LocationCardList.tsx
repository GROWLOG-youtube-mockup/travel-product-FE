import type { LocationCardListProps, LocationCardProps } from '../../type/card';

import LocationCard from './LocationCard';

import './LocationCardList.scss';

const LocationCardList = ({ LocationCardList }: LocationCardListProps) => {
  return (
    <div className="card_slide">
      {LocationCardList.map((card: LocationCardProps) => (
        <LocationCard key={card.title} image={card.image} title={card.title} />
      ))}
    </div>
  );
};

export default LocationCardList;
