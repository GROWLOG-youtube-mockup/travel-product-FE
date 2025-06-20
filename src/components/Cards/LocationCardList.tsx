import { useRef } from 'react';

import type { LocationItem } from '../../type/card';

import LocationCard from './LocationCard';

import styles from './LocationCardList.module.scss';

type LocationCardListProps = {
  locationCardList: LocationItem[];
  handleLocationCardClick: (regionId: number) => void;
};

const LocationCardList = ({ locationCardList, handleLocationCardClick }: LocationCardListProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleClickArrow = (dir: string) => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollLeft =
      dir === 'left'
        ? slider?.scrollLeft - (window.innerWidth - 123)
        : slider?.scrollLeft + (window.innerWidth - 123);
  };

  return (
    <>
      <button
        className={styles.arrowButton}
        onClick={() => {
          handleClickArrow('left');
        }}
      >
        next
      </button>
      <div className={styles['cardSlide']} ref={sliderRef}>
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
      <button
        className={styles.arrowButton}
        onClick={() => {
          handleClickArrow('right');
        }}
      >
        next
      </button>
    </>
  );
};

export default LocationCardList;
