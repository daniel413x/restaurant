import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faBan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { standardizePriceFormat } from '../utils/functions';
import { IFoodItemAbbreviated } from '../types/types';

interface ChooseQuantityProps {
  quantity: number;
}

function ChooseQuantity({ quantity }: ChooseQuantityProps) {
  return (
    <div className="quantity-wrapper">
      <input
        value={quantity}
        className="quantity"
        type="number"
        min="1"
        readOnly
      />
    </div>
  );
}

interface FoodItemAbbreviatedProps extends IFoodItemAbbreviated {
  deleteButton?: boolean;
}

function FoodItemAbbreviated({
  name = 'item',
  ingredients = [''],
  price = 0,
  discount,
  handleDeleteModal,
  deleteButton,
}: FoodItemAbbreviatedProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const formattedPrice = standardizePriceFormat(price * quantity, discount);
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity <= 1 ? 1 : quantity - 1);
  useEffect(() => {
    // axios update user cart or update in localStorage
  }, [quantity]);
  return (
    <div className="food-item-abbreviated">
      <div className="name-col">
        <div className="name">
          {name}
        </div>
        <div>
          {ingredients.join(', ')}
        </div>
      </div>
      <div className="price-quantity">
        <div className="quantity-input">
          <ChooseQuantity
            quantity={quantity}
          />
        </div>
        <div className="price">
          {`${formattedPrice}`}
        </div>
        <div className="buttons">
          {deleteButton && (
          <Button onClick={handleDeleteModal}>
            <FontAwesomeIcon icon={faBan} />
          </Button>
          )}
          <Button onClick={decrement}>
            <FontAwesomeIcon icon={faCaretDown} />
          </Button>
          <Button onClick={increment}>
            <FontAwesomeIcon icon={faCaretUp} />
          </Button>
        </div>
      </div>
    </div>
  );
}

FoodItemAbbreviated.defaultProps = {
  deleteButton: false,
};

export default FoodItemAbbreviated;
