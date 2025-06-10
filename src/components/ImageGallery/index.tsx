import React from 'react';

import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className={styles['image-gallery']}>
      <div className={styles['image-gallery__item'] + ' ' + styles['image-gallery__item--1']}>
        {images[0] ? (
          <img src={images[0]} alt="sub1" />
        ) : (
          <div className={styles['image-gallery__placeholder']} />
        )}
      </div>
      <div className={styles['image-gallery__item'] + ' ' + styles['image-gallery__item--2']}>
        {images[1] ? (
          <img src={images[1]} alt="sub2" />
        ) : (
          <div className={styles['image-gallery__placeholder']} />
        )}
      </div>
      <div className={styles['image-gallery__item'] + ' ' + styles['image-gallery__item--3']}>
        {images[2] ? (
          <img src={images[2]} alt="sub3" />
        ) : (
          <div className={styles['image-gallery__placeholder']} />
        )}
      </div>
      <div className={styles['image-gallery__item'] + ' ' + styles['image-gallery__item--4']}>
        {images[3] ? (
          <img src={images[3]} alt="sub4" />
        ) : (
          <div className={styles['image-gallery__placeholder']} />
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
