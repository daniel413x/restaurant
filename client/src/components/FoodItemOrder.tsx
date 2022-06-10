import React from 'react';
import { IFoodItem } from '../types/types';

interface FoodItemOrderProps {
  foodItem: IFoodItem;
}

function FoodItemOrder({
  foodItem,
}: FoodItemOrderProps) {
  const {
    name,
    ingredients,
    quantity,
    instructions,
    price,
  } = foodItem;
  return (
    <div className="food-item-order">
      <div className="info">
        <div className="name">
          {name}
        </div>
        <div className="ingredients">
          {ingredients?.join(', ')}
        </div>
        <div>
          <span className="quantity">
            {`Quantity: ${quantity}`}
          </span>
          {' '}
          <span className="price">
            {`Price: $${price}`}
          </span>
        </div>
        {instructions && (
        <textarea
          value={instructions}
          readOnly
        />
        )}
      </div>
    </div>
  );
}

export default FoodItemOrder;
