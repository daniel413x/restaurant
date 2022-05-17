import React, { useState, useContext } from 'react';
import {
  Container, Col, Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketShopping,
} from '@fortawesome/free-solid-svg-icons';
import { IFoodItemAbbreviated } from '../types/types';
import List from '../components/List';
import FoodItemAbbreviated from '../components/FoodItemAbbreviated';
import { cartPlaceholders, basketPlaceholder } from '../utils/consts';
import RemoveFromCart from '../components/modals/RemoveFromCart';
import Checkout from '../components/modals/Checkout';
import Context from '../context/context';

function Cart() {
  const { notifications } = useContext(Context);
  console.log(notifications);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(true);
  const [deletedItem, setDeletedItem] = useState<IFoodItemAbbreviated>({});
  const handleDeleteModal = (item: IFoodItemAbbreviated) => {
    setDeletedItem(item);
    setShowDeleteModal(true);
  };
  return (
    <Container id="cart">
      <RemoveFromCart
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        itemName={deletedItem.name}
      />
      <Checkout
        show={showCheckoutModal}
        onHide={() => setShowCheckoutModal(false)}
        checkoutItems={basketPlaceholder.foodItems}
      />
      <Col>
        <h2>
          Cart
          {' '}
          <FontAwesomeIcon icon={faBasketShopping} />
        </h2>
        <Col className="items" md={3}>
          3 Items in your cart:
        </Col>
        <List
          items={cartPlaceholders}
          renderList={(foodItem: IFoodItemAbbreviated) => (
            <li>
              <FoodItemAbbreviated
                name={foodItem.name}
                ingredients={foodItem.ingredients}
                price={foodItem.price}
                discount={foodItem.discount}
                handleDeleteModal={() => handleDeleteModal(foodItem)}
                deleteButton
              />
            </li>
          )}
        />
        <div className="checkout-total">
          <Col className="divider" />
          <Col md="auto" className="total">
            <div className="label">
              Total
            </div>
            <div className="figure">
              $20.54
            </div>
          </Col>
          <Col md="auto">
            <Button onClick={() => setShowCheckoutModal(true)}>
              Checkout
            </Button>
          </Col>
        </div>
      </Col>
    </Container>
  );
}

export default Cart;
