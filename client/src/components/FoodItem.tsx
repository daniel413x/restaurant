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
  bootstrapWidth?: number | boolean;
}

function FoodItem({
  foodItem,
  bootstrapWidth,
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
      <Image className="food-image" src={`${process.env.REACT_APP_API_URL}${image}`} />
      <Col>
        <span className="name">
          {name}
        </span>
        <span className="ingredients">
          {ingredients?.join(' • ')}
        </span>
        <span className="info">
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
        <Col className="order-now-button btn btn-primary">
          Order Now
        </Col>
      </Col>
    </Col>
  );
}

FoodItem.defaultProps = {
  bootstrapWidth: false,
};

export default FoodItem;
