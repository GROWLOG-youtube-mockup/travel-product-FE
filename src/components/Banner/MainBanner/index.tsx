import { useEffect, useRef, useState } from 'react';

import 여행01 from '../../../assets/Banner/MainBanner/여행01.png';
import 여행02 from '../../../assets/Banner/MainBanner/여행02.png';
import 여행03 from '../../../assets/Banner/MainBanner/여행03.png';

import styles from './MainBanner.module.scss';

const images = [여행01, 여행02, 여행03];

const MainBanner = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const handleIndicatorClick = (index: number) => {
    setCurrent(index);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className={styles['mainBanner']}>
      <div
        className={styles['bannerTrack']}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div className={styles['bannerSlide']} key={idx}>
            <img src={src} alt={`banner-${idx}`} draggable="false" />
          </div>
        ))}
      </div>

      <div className={styles['bannerIndicators']}>
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`${styles['bannerIndicator']} ${current === idx ? styles['active'] : ''}`}
            onClick={() => handleIndicatorClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBanner;
