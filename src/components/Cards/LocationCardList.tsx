import { useRef, useState } from 'react';

import type { LocationItem } from '../../type/card';

import LocationCard from './LocationCard';

import styles from './LocationCardList.module.scss';

type LocationCardListProps = {
  locationCardList: LocationItem[];
  handleLocationCardClick: (regionId: number) => void;
};

const LocationCardList = ({ locationCardList, handleLocationCardClick }: LocationCardListProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState({
    right: false,
    left: true
  });

  const handleClickArrow = (dir: string) => {
    const slider = sliderRef.current;

    if (!slider) return;

    if (dir === 'left') {
      slider.scrollLeft = slider?.scrollLeft - (window.innerWidth - 123);
      setShowButton({
        right: false,
        left: true
      });
    } else {
      slider.scrollLeft = slider?.scrollLeft + (window.innerWidth - 123);
      setShowButton({
        right: true,
        left: false
      });
    }
  };

  return (
    <>
      <div className={styles['cardSlideWrapper']}>
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
          className={`${styles.arrowButton} ${styles.left} ${showButton.left ? styles.hidden : ''}`}
          onClick={() => {
            handleClickArrow('left');
          }}
        ></button>
        <button
          className={`${styles.arrowButton} ${styles.right} ${showButton.right ? styles.hidden : ''}`}
          onClick={() => {
            handleClickArrow('right');
          }}
        ></button>
      </div>
    </>
  );
};

export default LocationCardList;
