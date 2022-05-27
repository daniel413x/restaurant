import React from 'react';
import { IFoodItem, IOrder } from '../types/types';
import List from './List';
import FoodItemOrder from './FoodItemOrder';

interface FoodItemOrderProps {
  order: IOrder;
}

function PreviousOrder({
  order,
}: FoodItemOrderProps) {
  return (
    <li className="previous-order">
      <div className="date">
        {order.date}
      </div>
      <List
        items={order?.foodItems!}
        renderList={(foodItem: IFoodItem) => (
          <FoodItemOrder
            foodItem={foodItem}
            key={foodItem.id}
          />
        )}
      />
      <div className="date">
        <div>
          Total:
          {' $'}
          {order.total}
        </div>
      </div>
    </li>
  );
}

export default PreviousOrder;
