import type { LocationCardProps } from '../../type/card';

import styles from './LocationCard.module.scss';

const LocationCard = ({ image, title }: LocationCardProps) => {
  return (
    <div className={styles.location_card}>
      <img className={styles.location_card_image} src={image} alt="" />
      <div className={styles.location_card_content}>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default LocationCard;
