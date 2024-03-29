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
import { useNavigate } from 'react-router-dom';
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
import { submitOrder } from '../../http/orderAPI';
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
      const UserId = user.id;
      await submitOrder({
        UserId,
        CartId,
        address,
      });
      // orders.addOrder(order);
      cart.clearItems();
      return navigate(
        user.isGuest ? `/${GUEST_ROUTE}/${ORDERS_ROUTE}`
          : `${ACCOUNT_ROUTE}`,
      );
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
      <div className={`${loading && 'blocked'} checkout`}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Checkout
            {' '}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={action}>
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
              id="email-field"
              label="Email*"
              value={email}
              onChange={setEmail}
              pressedSubmit={pressedSubmit}
              setPressedSubmit={setPressedSubmit}
              primaryStyle
            />
            <div className="name-row">
              <SmartInput
                id="first-name-field"
                label="First name*"
                value={firstName}
                onChange={setFirstName}
                pressedSubmit={pressedSubmit}
                setPressedSubmit={setPressedSubmit}
                primaryStyle
              />
              <SmartInput
                primaryStyle
                id="last-name-field"
                label="Last name*"
                value={lastName}
                onChange={setLastName}
                pressedSubmit={pressedSubmit}
                setPressedSubmit={setPressedSubmit}
              />
            </div>
            <SmartInput
              primaryStyle
              id="address-line-one-field"
              label="Street address*"
              value={addressLineOne}
              onChange={setAddressLineOne}
              pressedSubmit={pressedSubmit}
              setPressedSubmit={setPressedSubmit}
            />
            <SmartInput
              label="Street address Line Two"
              id="address-line-two-field"
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
                id="city-field"
                value={city}
                onChange={setCity}
                pressedSubmit={pressedSubmit}
                setPressedSubmit={setPressedSubmit}
                bsWidth={6}
                primaryStyle
              />
              <SmartInput
                label="State*"
                id="state-field"
                value={state}
                onChange={setState}
                pressedSubmit={pressedSubmit}
                setPressedSubmit={setPressedSubmit}
                primaryStyle
              />
              <SmartInput
                label="Zip address*"
                id="zip-field"
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
              id="card-name-field"
              value={cardName}
              onChange={setCardName}
              pressedSubmit={pressedSubmit}
              setPressedSubmit={setPressedSubmit}
              primaryStyle
            />
            <div className="card-number-row">
              <SmartInput
                label="Card number*"
                id="card-number-field"
                value={cardNumber}
                onChange={setCardNumber}
                pressedSubmit={pressedSubmit}
                setPressedSubmit={setPressedSubmit}
                bsWidth={6}
                primaryStyle
              />
              <SmartInput
                label="Expir.*"
                id="card-expiration-field"
                value={cardExpiration}
                onChange={setCardExpiration}
                pressedSubmit={pressedSubmit}
                setPressedSubmit={setPressedSubmit}
                primaryStyle
              />
              <SmartInput
                label="CVC*"
                id="card-cvc-field"
                value={cardCVC}
                onChange={setCardCVC}
                pressedSubmit={pressedSubmit}
                setPressedSubmit={setPressedSubmit}
                primaryStyle
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className={`${requiredFieldsIncomplete && 'blocked'}`} type="submit" id="submit-button">Submit</Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
}

export default observer(Checkout);
