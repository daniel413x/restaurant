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
    <li className="food-item-order">
      <div className="info">
        <div className="name">
          {name}
        </div>
        <div className="ingredients">
          {ingredients?.join(', ')}
        </div>
        <div>
          {`Quantity: ${quantity} Price: $${price}`}
        </div>
        {instructions && (
        <textarea
          value={instructions}
          readOnly
        />
        )}
      </div>
    </li>
  );
}

export default FoodItemOrder;
