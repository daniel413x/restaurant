import React, { MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faBan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { calcItemPrice } from '../utils/functions';
import { OrderOrCartFoodItem } from '../types/types';

interface QuantityButtonsProps {
  foodItem: Omit<OrderOrCartFoodItem, 'quantity'>;
  handleDeleteModal?: MouseEventHandler<HTMLButtonElement>; // if handleDeleteModal is passed in then the delete button appears, used on /cart
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

function QuantityButtons({
  foodItem,
  quantity,
  handleDeleteModal,
  increment,
  decrement,
}: QuantityButtonsProps) {
  const { price, discount } = foodItem;
  const formattedPrice = calcItemPrice(price! * quantity, discount);
  return (
    <div className="price-buttons">
      <div className="quantity-input">
        <div className="quantity-wrapper">
          <input
            value={quantity}
            className="quantity"
            type="number"
            min="1"
            id="item-quantity-counter"
            readOnly
          />
        </div>
      </div>
      <div className="price">
        $
        {formattedPrice}
      </div>
      <div className="icon-buttons">
        {handleDeleteModal && (
        <Button id="delete-item-button" onClick={handleDeleteModal}>
          <FontAwesomeIcon icon={faBan} />
        </Button>
        )}
        <Button id="decrement-item-button" className={`${quantity <= 1 && 'blocked'}`} onClick={decrement}>
          <FontAwesomeIcon icon={faCaretDown} />
        </Button>
        <Button id="increment-item-button" onClick={increment}>
          <FontAwesomeIcon icon={faCaretUp} />
        </Button>
      </div>
    </div>
  );
}

QuantityButtons.defaultProps = {
  handleDeleteModal: false,
};

export default QuantityButtons;
