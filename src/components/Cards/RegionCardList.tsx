import { useLayoutEffect, useRef, useState } from 'react';

import type { RegionItem } from '../../type/card';

import RegionCard from './RegionCard';

import styles from './RegionCardList.module.scss';

type RegionCardListProps = {
  RegionCardList: RegionItem[];
  handleRegionCardClick: (item: RegionItem) => void;
};

const RegionCardList = ({ RegionCardList, handleRegionCardClick }: RegionCardListProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState({ left: false, right: false });

  const updateButtonVisibility = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    setShowButton({
      left: scrollLeft > 0,
      right: scrollLeft + clientWidth < scrollWidth - 1
    });
  };

  useLayoutEffect(() => {
    updateButtonVisibility();
  }, [RegionCardList]);

  const handleClickArrow = (dir: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (!slider) return;

    const shift = window.innerWidth - 123;

    slider.scrollBy({ left: dir === 'left' ? -shift : shift, behavior: 'smooth' });

    // 스크롤 애니메이션 이후 버튼 상태 재확인
    setTimeout(updateButtonVisibility, 400);
  };

  return (
    <div className={styles.cardSlideWrapper}>
      <div className={styles.cardSlide} ref={sliderRef} onScroll={updateButtonVisibility}>
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
        className={`${styles.arrowButton} ${styles.left} ${!showButton.left ? styles.hidden : ''}`}
        onClick={() => handleClickArrow('left')}
      />

      <button
        className={`${styles.arrowButton} ${styles.right} ${!showButton.right ? styles.hidden : ''}`}
        onClick={() => handleClickArrow('right')}
      />
    </div>
  );
};

export default RegionCardList;
