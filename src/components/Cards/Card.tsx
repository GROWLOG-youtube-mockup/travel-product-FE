import type { CardProps } from '../../type/card';

import './Card.scss';

const Card = ({ styleName, image, title, price }: CardProps) => {
  return (
    <div className={`card ${styleName ?? 'normal'}`}>
      <div className="card_image">
        <img src={image} alt="Card" />
      </div>
      <div className="card_content">
        <span className="card_title">{title}</span>
        <p className="card_price">₩{price}</p>
      </div>
    </div>
  );
};

export default Card;
