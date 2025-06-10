import React from 'react';

interface LocalRecommendCardProps {
  children: React.ReactNode;
}

const ProductCardLocalRecommend: React.FC<LocalRecommendCardProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ProductCardLocalRecommend;
