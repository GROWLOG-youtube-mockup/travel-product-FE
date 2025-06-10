import React from 'react';

import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className={styles.galleryGrid}>
      <div className={styles.subImage1}>
        {images[0] ? <img src={images[0]} alt="sub1" /> : <div className={styles.placeholder} />}
      </div>
      <div className={styles.subImage2}>
        {images[1] ? <img src={images[1]} alt="sub2" /> : <div className={styles.placeholder} />}
      </div>
      <div className={styles.subImage3}>
        {images[2] ? <img src={images[2]} alt="sub3" /> : <div className={styles.placeholder} />}
      </div>
      <div className={styles.subImage4}>
        {images[3] ? <img src={images[3]} alt="sub4" /> : <div className={styles.placeholder} />}
      </div>
    </div>
  );
};

export default ImageGallery;
