import type { LocationCardProps } from '../../type/card';

import './LocationCard.scss';

const LocationCard = ({ image, title }: LocationCardProps) => {
  return (
    <div>
      <img src={image} alt="" />
      <div>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default LocationCard;
