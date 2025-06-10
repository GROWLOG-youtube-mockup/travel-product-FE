import React from 'react';

interface LocalRecommendCardProps {
  children: React.ReactNode;
}

const LocalRecommendCard: React.FC<LocalRecommendCardProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default LocalRecommendCard;
