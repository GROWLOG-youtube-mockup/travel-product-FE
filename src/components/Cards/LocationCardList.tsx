import LocationCard from './LocationCard';

import styles from './LocationCardList.module.scss';

type LocationCardListProps = {
  locationCardList: {
    image: string;
    title: string;
    regionId: number;
  }[];
  handleLocationCardClick: (regionId: number) => void;
};

const LocationCardList = ({ locationCardList, handleLocationCardClick }: LocationCardListProps) => {
  return (
    <div className={styles['cardSlide']}>
      {locationCardList.map((card) => (
        <LocationCard
          key={card.regionId}
          image={card.image}
          title={card.title}
          regionId={card.regionId}
          handleLocationCardClick={handleLocationCardClick}
        />
      ))}
    </div>
  );
};

export default LocationCardList;
