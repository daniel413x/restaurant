import React from 'react';
import { OrderOrCartFoodItem, IOrder } from '../types/types';
import List from './List';
import FoodItemOrder from './FoodItemOrder';
import { orderDate } from '../utils/functions';

interface FoodItemOrderProps {
  order: IOrder;
}

function PreviousOrder({
  order,
}: FoodItemOrderProps) {
  const formattedDate = orderDate(order.date);
  return (
    <div className="previous-order">
      <div className="date">
        {formattedDate}
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
