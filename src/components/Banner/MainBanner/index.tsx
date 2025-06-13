import { useEffect, useReducer, useRef } from 'react';

import 여행01 from '../../../assets/Banner/MainBanner/여행01.png';
import 여행02 from '../../../assets/Banner/MainBanner/여행02.png';
import 여행03 from '../../../assets/Banner/MainBanner/여행03.png';

import styles from './MainBanner.module.scss';

type Action = { type: 'NEXT' } | { type: 'GOTO'; index: number };

const images = [여행01, 여행02, 여행03];

const MainBanner = () => {
  const [imagesIndex, imagesIndexDispatch] = useReducer((index: number, action: Action) => {
    switch (action.type) {
      case 'NEXT':
        return (index + 1) % images.length;
      case 'GOTO':
        return action.index;
      default:
        return index;
    }
  }, 0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startAutoSlide();

    return stopAutoSlide;
  }, []);

  const handleIndicatorClick = (index: number) => {
    imagesIndexDispatch({ type: 'GOTO', index });
    startAutoSlide();
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      imagesIndexDispatch({ type: 'NEXT' });
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className={styles['mainBanner']}>
      <div
        className={styles['bannerTrack']}
        style={{ transform: `translateX(-${imagesIndex * 100}%)` }}
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
            className={`${styles['bannerIndicator']} ${imagesIndex === idx ? styles['active'] : ''}`}
            onClick={() => handleIndicatorClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBanner;
