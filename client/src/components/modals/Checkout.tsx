import React, { useContext, useState } from 'react';
import {
  Modal, Button, Row, Col, Form, Spinner,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
// import { submitOrder } from '../../../http/orderAPI';
import Context from '../../context/context';
import SmartInput from '../SmartInput';
import {
  IFoodItem,
} from '../../types/types';
import {
  shortNotification,
  red,
  ACCOUNT_ROUTE,
} from '../../utils/consts';
import { timestamp } from '../../utils/functions';

interface CheckoutProps {
  onHide: () => void;
  show: boolean;
  checkoutItems: IFoodItem[];
}

function Checkout({
  onHide,
  show,
  checkoutItems,
}: CheckoutProps) {
  const {
    notifications,
    cart,
    user,
    orders,
  } = useContext(Context);
  const navigate = useNavigate();
  // const { cart /* user */ } = useContext(Context);
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [streetAddressLineTwo, setStreetAddressLineTwo] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiration, setCardExpiration] = useState<string>('');
  const [cardCVC, setCardCVC] = useState<string>('');
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<number>(0);
  // const userId = user.id;
  const action = async () => {
    setPressedSubmit(true);
    const requiredFieldsIncomplete = !email || !firstName || !lastName
    || !streetAddress || !city || !zip
    || !state || !cardName
    || !cardNumber || !cardExpiration || !cardCVC;

    if (requiredFieldsIncomplete) {
      return notifications.message(
        'Please complete all required fields',
        red,
        shortNotification,
      );
    }
    /* const noItems = basket.foodItems.length === 0;
    if (noItems) {
      return notifications.message(
        'No items in basket',
        red,
        shortNotification,
      );
    } */
    setLoading(true);/*
    const basketFoodItemIds = [];
    const foodItemIds = [];
    basket.foodItems.forEach((foodItem) => {
      basketFoodItemIds.push(foodItem.id || null);
      foodItemIds.push(foodItem.device.id || null);
    }); */
    try { /*
      const order = await submitOrder(
        email,
        firstName,
        lastName,
        streetAddress,
        city,
        zip,
        country,
        state,
        foodItemIds,
        userId,
      );
      basket.setFoodItems([]); */
      const order = {
        id: Math.floor(Math.random() * 100),
        userId: user.id,
        foodItems: cart.foodItems,
        status: {
          value: 0,
          actionLog: [
            {
              timestamp: timestamp(),
              message: 'Order received',
            },
          ],
        },
      };
      orders.addOrder(order);
      cart.clearItems();
      setConfirmation(true);
      return setOrderNumber(order.id);
    } catch (error: any) {
      return notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="shipping-form p-0"
      id="checkout"
    >
      {loading && <Spinner animation="grow" className="loading-anim" />}
      <div className={`${loading && 'disabled-2'} checkout`}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {confirmation ? 'Thank you!' : 'Checkout'}
            {' '}
          </Modal.Title>
        </Modal.Header>
        {confirmation
          ? (
            <Modal.Body className="confirmation">
              {`A copy of your receipt will be sent to ${email}. Your order number is:`}
              <Col className="order-number">
                {`Order #${orderNumber}`}
              </Col>
              Upon receival of your product you may leave a rating and a review on its product page.
            </Modal.Body>
          )
          : (
            <Modal.Body>
              <div className="receipt">
                <h5>
                  Receipt
                </h5>
                {checkoutItems.map((item) => (
                  <Row className="item-price-pair">
                    <Col className="item">
                      {' '}
                      {item.name}
                    </Col>
                    <Col className="price">
                      $
                      {item.price}
                    </Col>
                  </Row>
                ))}
                —
                <Row className="item-price-pair">
                  <Col>
                    Total
                  </Col>
                  <Col>
                    <strong>
                      $
                      {cart.total}
                    </strong>
                  </Col>
                </Row>
              </div>
              <hr />
              <h5>
                Shipping & billing
              </h5>
              <Form>
                * = required field
                <SmartInput
                  label="Email*"
                  value={email}
                  onChange={setEmail}
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  primaryStyle
                />
                <div className="name-row">
                  <SmartInput
                    label="First name*"
                    value={firstName}
                    onChange={setFirstName}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                  <SmartInput
                    primaryStyle
                    label="Last name*"
                    value={lastName}
                    onChange={setLastName}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                  />
                </div>
                <SmartInput
                  primaryStyle
                  label="Street address*"
                  value={streetAddress}
                  onChange={setStreetAddress}
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                />
                <SmartInput
                  label="Street address Line Two"
                  value={streetAddressLineTwo}
                  onChange={setStreetAddressLineTwo}
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  optional
                  placeholder="apt., suite"
                  primaryStyle
                />
                <div className="city-row">
                  <SmartInput
                    label="Territory/City*"
                    value={city}
                    onChange={setCity}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    bsWidth={6}
                    primaryStyle
                  />
                  <SmartInput
                    label="State*"
                    value={state}
                    onChange={setState}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                  <SmartInput
                    label="Zip address*"
                    value={zip}
                    onChange={setZip}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                </div>
                <hr />
                <h5>
                  Payment
                </h5>
                <SmartInput
                  label="Full name on card*"
                  value={cardName}
                  onChange={setCardName}
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  primaryStyle
                />
                <div className="card-number-row">
                  <SmartInput
                    label="Card number*"
                    value={cardNumber}
                    onChange={setCardNumber}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    bsWidth={6}
                    primaryStyle
                  />
                  <SmartInput
                    label="Expir.*"
                    value={cardExpiration}
                    onChange={setCardExpiration}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                  <SmartInput
                    label="CVC*"
                    value={cardCVC}
                    onChange={setCardCVC}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                </div>
              </Form>
            </Modal.Body>
          )}
        <Modal.Footer>
          {confirmation ? <Button onClick={() => navigate(ACCOUNT_ROUTE)}>Track my order</Button>
            : <Button variant="outline-success" onClick={action}>Submit</Button>}
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default observer(Checkout);
