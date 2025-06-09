import type { CardProps } from '../../type/card';

const Card = ({ styleName, image, title, price }: CardProps) => {
  return (
    <div className={`card ${styleName ?? 'normal'}`}>
      <div className="card_image">
        <img src={image} alt="Card" />
      </div>
      <div className="card_content">
        <h3 className="card_title">{title}</h3>
        <p className="card_price">₩{price}</p>
      </div>
    </div>
  );
};

export default Card;
