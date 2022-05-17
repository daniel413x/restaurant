import React from 'react';
import {
  Col, Image, Button,
} from 'react-bootstrap';
import { standardizePriceFormat } from '../utils/functions';
import { IFoodItem } from '../types/types';

function FoodItem({
  image,
  name,
  time,
  serves,
  price,
  discount,
  ingredients = [''],
  bootstrapWidth,
}: IFoodItem) {
  const hideIngredients = ingredients[0] === '';
  const [timeMin, timeMax] = time;
  const undiscountedPrice = standardizePriceFormat(price);
  const discountedPrice = discount ? standardizePriceFormat(price, discount) : null;
  return (
    <Col className="food-item" md={bootstrapWidth}>
      <Image className="food-image" src={image} />
      <Col>
        <span className="name">
          {name}
        </span>
        <span className={`ingredients ${hideIngredients ? 'none' : null}`}>
          {ingredients?.join(' • ')}
        </span>
        <span className="info">
          Time:
          {' '}
          {timeMin}
          -
          {timeMax}
          {' '}
          Minutes | Serves:
          {' '}
          {serves}
        </span>
        <div className="price-row">
          <span className="current-price">
            {discount ? discountedPrice : undiscountedPrice}
            {' '}
          </span>
          {discount ? (
            <span className="previous-price">
              {undiscountedPrice}
            </span>
          ) : null}
        </div>
        <Button>
          Order Now
        </Button>
      </Col>
    </Col>
  );
}

FoodItem.defaultProps = {
  discount: 0,
  ingredients: [''],
  bootstrapWidth: false,
};

export default FoodItem;
