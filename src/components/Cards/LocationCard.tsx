import type { LocationCardProps } from '../../type/card';

import styles from './LocationCard.module.scss';

const LocationCard = ({ image, title }: LocationCardProps) => {
  return (
    <div className={styles['location-card']}>
      <img className={styles['location-card__image']} src={image} alt="" />
      <div className={styles['location-card__content']}>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default LocationCard;
