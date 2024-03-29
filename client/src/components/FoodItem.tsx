import React from 'react';
import {
  Col, Image,
} from 'react-bootstrap';
import { calcItemPrice } from '../utils/functions';
import { IFoodItem } from '../types/types';

function Time({ time }: { time: [number, number] | undefined }) {
  if (!time) {
    return null;
  }
  const [timeMin, timeMax] = time;
  return (
    <span>
      Time:
      {' '}
      {timeMin}
      -
      {timeMax}
      {' '}
      Minutes |
      {' '}
    </span>
  );
}

interface FoodItemProps {
  foodItem: IFoodItem;
  demo?: boolean;
  bootstrapWidth?: number | boolean;
}

function FoodItem({
  foodItem,
  bootstrapWidth,
  demo,
}: FoodItemProps) {
  const {
    image,
    name,
    time,
    serves,
    price,
    discount,
    ingredients,
  } = foodItem;
  const undiscountedPrice = calcItemPrice(price!);
  const discountedPrice = discount ? calcItemPrice(price!, discount) : null;
  return (
    <Col className="food-item" md={bootstrapWidth}>
      <Image className="food-image" src={`${demo ? '' : process.env.REACT_APP_API_URL}${image}`} />
      <Col className="below-image-col">
        <Col className="info-col">
          <span className="name">
            {name}
          </span>
          <span className="ingredients">
            {ingredients?.join(' • ')}
          </span>
          <span className="misc-info">
            <Time time={time} />
            <span>
              Serves:
              {' '}
              {serves}
            </span>
          </span>
          <div className="price-row">
            <span className="current-price">
              $
              {discount ? discountedPrice : undiscountedPrice}
              {' '}
            </span>
            {discount ? (
              <span className="previous-price">
                $
                {undiscountedPrice}
              </span>
            ) : null}
          </div>
        </Col>
        <Col className="order-now-button btn btn-primary">
          Order Now
        </Col>
      </Col>
    </Col>
  );
}

FoodItem.defaultProps = {
  bootstrapWidth: false,
  demo: false,
};

export default FoodItem;
