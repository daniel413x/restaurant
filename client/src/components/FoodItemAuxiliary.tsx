import React, { MouseEventHandler } from 'react';
import { IFoodItem } from '../types/types';
import QuantityButtons from './QuantityButtons';

interface FoodItemAuxiliaryProps {
  foodItem: IFoodItem;
  handleDeleteModal?: MouseEventHandler<HTMLButtonElement>;
  quantity: number;
  increment: (...args: number[]) => void;
  decrement: (...args: number[]) => void;
}

function FoodItemAuxiliary({
  foodItem,
  handleDeleteModal,
  quantity,
  increment,
  decrement,
}: FoodItemAuxiliaryProps) {
  const { name, ingredients } = foodItem;
  return (
    <div className="food-item-auxiliary">
      <div>
        <div className="name">
          {name}
        </div>
        <div>
          {ingredients?.join(', ')}
        </div>
      </div>
      <QuantityButtons
        foodItem={foodItem}
        handleDeleteModal={handleDeleteModal}
        quantity={quantity}
        increment={increment}
        decrement={decrement}
      />
    </div>
  );
}

FoodItemAuxiliary.defaultProps = {
  handleDeleteModal: false,
};

export default FoodItemAuxiliary;
