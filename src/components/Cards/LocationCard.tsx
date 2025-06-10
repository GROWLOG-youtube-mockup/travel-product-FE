import type { LocationCardProps } from '../../type/card';

import './LocationCard.scss';

const LocationCard = ({ image, title }: LocationCardProps) => {
  return (
    <div className="location_card">
      <img className="location_card_image" src={image} alt="" />
      <div className="location_card_content">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default LocationCard;
