import React, { useState, useContext } from 'react';
import {
  Container, Col, Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketShopping,
} from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { IFoodItem } from '../types/types';
import List from '../components/List';
import FoodItemAuxiliary from '../components/FoodItemAuxiliary';
import { basketPlaceholder } from '../utils/consts';
import { countItems } from '../utils/functions';
import RemoveFromCart from '../components/modals/RemoveFromCart';
import Checkout from '../components/modals/Checkout';
import Context from '../context/context';

function Cart() {
  const { cart } = useContext(Context);
  const cartCount = countItems(cart.foodItems);
  const thereAreItems = cartCount > 0;
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState<IFoodItem>({});
  const handleDeleteModal = (item: IFoodItem) => {
    setDeletedItem(item);
    setShowDeleteModal(true);
  };
  return (
    <Container id="cart">
      <RemoveFromCart
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        itemName={deletedItem.name}
        itemId={deletedItem.id}
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
          {cartCount ? `${cartCount} item${cartCount > 1 ? 's' : ''} in your cart:` : 'No items in your cart'}
        </Col>
        <List
          items={cart.foodItems}
          renderList={(foodItem: IFoodItem) => (
            <li>
              <FoodItemAuxiliary
                foodItem={foodItem}
                handleDeleteModal={() => handleDeleteModal(foodItem)}
                quantity={foodItem.quantity!}
                increment={() => cart.changeItemQuantity(foodItem.id!, 1)}
                decrement={() => cart.changeItemQuantity(foodItem.id!, -1)}
              />
            </li>
          )}
        />
        {thereAreItems && (
          <div className="checkout-total">
            <Col className="divider" />
            <Col md="auto" className="total">
              <div className="label">
                Total
              </div>
              <div className="figure">
                $
                {cart.total}
              </div>
            </Col>
            <Col md="auto">
              <Button onClick={() => setShowCheckoutModal(true)}>
                Checkout
              </Button>
            </Col>
          </div>
        )}
      </Col>
    </Container>
  );
}

export default observer(Cart);
