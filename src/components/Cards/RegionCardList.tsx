import { useRef, useState } from 'react';

import type { RegionItem } from '../../type/card';

import RegionCard from './RegionCard';

import styles from './RegionCardList.module.scss';

type RegionCardListProps = {
  RegionCardList: RegionItem[];
  handleRegionCardClick: (regionId: number) => void;
};

const RegionCardList = ({ RegionCardList, handleRegionCardClick }: RegionCardListProps) => {
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
          {RegionCardList.map((card) => (
            <RegionCard
              key={card.regionId}
              image={card.image}
              title={card.title}
              regionId={card.regionId}
              handleRegionCardClick={handleRegionCardClick}
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

export default RegionCardList;
