import type { RegionCardProps } from '@/types/card';

import styles from './RegionCard.module.scss';

const RegionCard = ({ image, title, regionId, handleRegionCardClick }: RegionCardProps) => {
  return (
    <div
      className={styles['RegionCard']}
      role="button"
      onClick={() => handleRegionCardClick({ image, title, regionId })}
    >
      <img className={styles['cardImage']} src={image} alt="" />
      <div className={styles['content']}>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default RegionCard;
