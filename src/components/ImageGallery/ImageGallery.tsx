import React from 'react';

import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className={`${styles.gallery} ${images.length === 4 ? styles.four : ''}`}>
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`${styles.item} ${images.length === 4 ? styles[`item${idx + 1}`] : ''}`}
        >
          <img src={src} alt={`image-${idx}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
