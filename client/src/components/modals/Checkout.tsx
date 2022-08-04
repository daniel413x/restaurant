import React, {
  useContext,
  useState,
  useEffect,
  FormEvent,
} from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Spinner,
  Dropdown,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import SmartInput from '../SmartInput';
import {
  IAddress,
  OrderOrCartFoodItem,
} from '../../types/types';
import {
  shortNotification,
  red,
  ACCOUNT_ROUTE,
  GUEST_ROUTE,
  ORDERS_ROUTE,
} from '../../utils/consts';
import { submitGuestOrder, submitOrder } from '../../http/orderAPI';
import { calcItemPrice } from '../../utils/functions';

interface CheckoutProps {
  onHide: () => void;
  show: boolean;
  checkoutItems: OrderOrCartFoodItem[];
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
    addresses,
  } = useContext(Context);
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [addressLineOne, setAddressLineOne] = useState<string>('');
  const [addressLineTwo, setAddressLineTwo] = useState<string | undefined>('');
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
  const [orderNumber, setOrderNumber] = useState<string>('');
  const navigate = useNavigate();
  // const UserId = user.id;
  const requiredFieldsIncomplete = !email || !firstName || !lastName
  || !addressLineOne || !city || !zip
  || !state || !cardName
  || !cardNumber || !cardExpiration || !cardCVC;
  const action = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    if (requiredFieldsIncomplete) {
      return notifications.message(
        'Please complete all required fields',
        red,
        shortNotification,
      );
    }
    const noItems = cart.foodItems.length === 0;
    if (noItems) {
      return notifications.message(
        'No items in cart',
        red,
        shortNotification,
      );
    }
    setLoading(true);
    try {
      const address = {
        firstName,
        lastName,
        addressLineOne,
        addressLineTwo,
        city,
        zip,
        state,
      };
      const CartId = cart.id;
      let order;
      if (user.isGuest) {
        const {
          foodItems,
        } = cart;
        order = await submitGuestOrder({
          address,
          foodItems,
          guestId: user.id,
        });
        localStorage.removeItem('guestCartItems');
      } else {
        const UserId = user.id;
        order = await submitOrder({
          UserId,
          CartId,
          address,
        });
      }
      // orders.addOrder(order);
      cart.clearItems();
      return navigate(
        user.isGuest ? `/${GUEST_ROUTE}/${ORDERS_ROUTE}`
          : `/${ACCOUNT_ROUTE}`,
      );
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
  const selectFromSavedAddresses = (obj: IAddress) => {
    setFirstName(obj.firstName);
    setLastName(obj.lastName);
    setAddressLineOne(obj.addressLineOne);
    setAddressLineTwo(obj.addressLineTwo);
    setCity(obj.city);
    setZip(obj.zip);
    setState(obj.state);
  };
  useEffect(() => {
    if (user.isRegistered) {
      setEmail(user.email);
    }
  }, [user.email]);
  useEffect(() => {
    if (addresses.defaultAddress) {
      selectFromSavedAddresses(addresses.defaultAddress!);
    }
  }, [addresses.defaultAddress]);
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
        <Form onSubmit={action}>
          {confirmation
            ? (
              <Modal.Body className="confirmation">
                {`A copy of your receipt will be sent to ${email}. Your order number is:`}
                <Col className="order-number">
                  {`Order #${orderNumber.slice(0, 7)}`}
                </Col>
                Click &apos;Track my order&apos; to follow your order!
              </Modal.Body>
            )
            : (
              <Modal.Body>
                <div className="receipt">
                  <h5>
                    Receipt
                  </h5>
                  {checkoutItems.map((item) => (
                    <Row
                      className="item-price-pair"
                      key={item.id}
                    >
                      <Col className="item">
                        {' '}
                        {item.name}
                        {' '}
                        {item.quantity > 1 && `(${item.quantity}) `}
                      </Col>
                      <Col className="price">
                        $
                        {calcItemPrice(item.price, item.discount)}
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
                  Shipping &amp; billing
                </h5>
                * = required field
                {addresses.all.length > 0 && (
                <Dropdown>
                  <Dropdown.Toggle>
                    Saved addresses
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {addresses.all.map((addressObj) => (
                      <Dropdown.Item
                        onClick={() => selectFromSavedAddresses(addressObj)}
                        key={addressObj.id}
                      >
                        {addressObj.addressLineOne}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                )}
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
                  value={addressLineOne}
                  onChange={setAddressLineOne}
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                />
                <SmartInput
                  label="Street address Line Two"
                  value={addressLineTwo}
                  onChange={setAddressLineTwo}
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
              </Modal.Body>
            )}
          <Modal.Footer>
            {confirmation ? (
              <NavLink to={`/${ACCOUNT_ROUTE}`}>
                <Button>Track my order</Button>
              </NavLink>
            )
              : <Button className={`${requiredFieldsIncomplete && 'disabled-2'}`} type="submit">Submit</Button>}
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
}

export default observer(Checkout);
