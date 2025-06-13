import React from 'react';

import styles from '../Banner/ProductBanner/ProductBanner.module.scss';

interface LocalRecommendCardProps {
  children: React.ReactNode;
}

const ProductCardLocalRecommend: React.FC<LocalRecommendCardProps> = ({ children }) => {
  return <div className={styles.regionBarItem}>{children}</div>;
};

export default ProductCardLocalRecommend;
