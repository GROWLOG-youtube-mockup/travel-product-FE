import type { LocationCardProps } from '../../type/card';

import styles from './LocationCard.module.scss';

const LocationCard = ({ image, title, regionId, handleLocationCardClick }: LocationCardProps) => {
  return (
    <div
      className={styles['locationCard']}
      role="button"
      onClick={() => handleLocationCardClick(regionId)}
    >
      <img className={styles['cardImage']} src={image} alt="" />
      <div className={styles['content']}>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default LocationCard;
