import React, { MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faBan } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { standardizePriceFormat } from '../utils/functions';
import { IFoodItem } from '../types/types';

interface QuantityButtonsProps {
  foodItem: IFoodItem;
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
  const formattedPrice = standardizePriceFormat(price! * quantity, discount);
  return (
    <div className="price-buttons">
      <div className="quantity-input">
        <div className="quantity-wrapper">
          <input
            value={quantity}
            className="quantity"
            type="number"
            min="1"
            readOnly
          />
        </div>
      </div>
      <div className="price">
        {`${formattedPrice}`}
      </div>
      <div className="buttons">
        {handleDeleteModal && (
        <Button onClick={handleDeleteModal}>
          <FontAwesomeIcon icon={faBan} />
        </Button>
        )}
        <Button onClick={decrement} className={`${quantity <= 1 && 'disabled-2'}`}>
          <FontAwesomeIcon icon={faCaretDown} />
        </Button>
        <Button onClick={increment}>
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
