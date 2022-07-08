import React from 'react';
import { OrderOrCartFoodItem, IOrder } from '../types/types';
import List from './List';
import FoodItemOrder from './FoodItemOrder';

interface FoodItemOrderProps {
  order: IOrder;
}

function PreviousOrder({
  order,
}: FoodItemOrderProps) {
  return (
    <div className="previous-order">
      <div className="date">
        {order.date}
      </div>
      <List
        items={order?.foodItems}
        renderList={(foodItem: OrderOrCartFoodItem) => (
          <li key={foodItem.id}>
            <FoodItemOrder
              foodItem={foodItem}
            />
          </li>
        )}
      />
      <div className="date">
        <div>
          Total:
          {' $'}
          {order.total}
        </div>
      </div>
    </div>
  );
}

export default PreviousOrder;
