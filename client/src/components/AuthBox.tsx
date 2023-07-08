import React, {
  useState, useContext, FormEvent,
} from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import {
  shortNotification,
  red,
  longNotification,
  GUEST,
} from '../utils/consts';
import SmartInput from './SmartInput';
import LabeledCheckboxButton from './LabeledCheckboxButton';
import Context from '../context/context';
import { registrationGuest, login, registration } from '../http/userAPI';
import { createAddress } from '../http/addressAPI';
import { fetchUserCart } from '../http/cartAPI';
import { validateEmail, validatePassword } from '../utils/functions';

interface AuthBoxProps {
  onSuccess: () => void;
  forLogin: boolean;
}

function AuthBox({
  onSuccess,
  forLogin,
}: AuthBoxProps) {
  const {
    notifications,
    user,
    cart,
    addresses,
  } = useContext(Context);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [saveDefaultAddress, setSaveDefaultAddress] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [username, setname] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [addressLineOne, setAddressLineOne] = useState<string>('');
  const [addressLineTwo, setAddressLineTwo] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    if (!email || !password) {
      notifications.message(
        'Please complete required fields',
        red,
        shortNotification,
      );
      return;
    }
    const validEmail = validateEmail(email);
    if (!validEmail) {
      notifications.message(
        'Invalid email format',
        red,
        longNotification,
      );
      return;
    }
    const validPassword = validatePassword(password);
    if (!validPassword && !forLogin) {
      notifications.message(
        'Please choose a password between 6 and 256 characters',
        red,
        longNotification,
      );
      return;
    }
    if (saveDefaultAddress && (!firstName || !lastName || !addressLineOne || !city || !state || !zip)) {
      notifications.message(
        'Please complete required fields',
        red,
        shortNotification,
      );
      return;
    }
    try {
      if (forLogin) {
        const mustAccreditGuestItems = cart.foodItems.length > 0 && cart.foodItems[0]?.UserId !== user.id;
        const fetchedUser = await login(email, password, mustAccreditGuestItems ? cart.foodItems : undefined);
        const fetchedCart = await fetchUserCart();
        user.set(fetchedUser);
        cart.set(fetchedCart);
        if (mustAccreditGuestItems) {
          // accredit items added as guest
          const accreditedItems = cart.foodItems.map((item) => ({ ...item, UserId: user.id }));
          cart.setItems(accreditedItems);
        }
      } else {
        const mustFullyRegisterGuest = user.roles.indexOf(GUEST) >= 0 && cart.UserId === user.id;
        if (mustFullyRegisterGuest) {
          const newUser = await registrationGuest(
            email,
            password,
          );
          user.set(newUser);
        } else {
          // regular registration/user registered before trying to add cart items
          const { newUser, newCart } = await registration({ email, password });
          user.set(newUser);
          cart.set(newCart);
        }
        if (saveDefaultAddress) {
          const defaultAddress = await createAddress({
            firstName,
            lastName,
            addressLineOne,
            addressLineTwo,
            city,
            state,
            zip,
            isDefault: true,
            UserId: user.id,
          });
          addresses.addAddress(defaultAddress);
        }
      }
      onSuccess();
    } catch (error: any) {
      notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  return (
    <Col className="auth-box">
      <Form onSubmit={(e) => submit(e)}>
        <SmartInput
          id="email-field"
          label="Email address"
          onChange={setEmail}
          value={email}
          placeholder={forLogin ? '' : 'Required'}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          primaryStyle
        />
        <SmartInput
          id="password-field"
          label="Password"
          type="password"
          onChange={setPassword}
          value={password}
          placeholder={forLogin ? '' : 'Required'}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          primaryStyle
        />
        {forLogin ? <div className="no-shift" /> : (
          <div className="default-address-form">
            <LabeledCheckboxButton
              id="save-default-address-button"
              label="Save a default delivery address (optional)"
              boolean={saveDefaultAddress}
              setBoolean={setSaveDefaultAddress}
              classes="toggle-default-address-form"
            />
            {saveDefaultAddress && (
              <div>
                <Row>
                  <SmartInput
                    id="first-name-field"
                    label="First name"
                    onChange={setFirstName}
                    value={firstName}
                    placeholder="Required"
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                  <SmartInput
                    label="Middle name"
                    id="middle-name-field"
                    classes="blocked"
                    onChange={setMiddleName}
                    value={middleName}
                    placeholder="Optional"
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    optional
                    primaryStyle
                  />
                </Row>
                <SmartInput
                  label="Last name"
                  id="last-name-field"
                  onChange={setLastName}
                  value={lastName}
                  placeholder="Required"
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  primaryStyle
                />
                <SmartInput
                  label="Address line one"
                  id="address-line-one-field"
                  onChange={setAddressLineOne}
                  value={addressLineOne}
                  placeholder="Required"
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  primaryStyle
                />
                <SmartInput
                  id="address-line-two-field"
                  label="Address line two"
                  onChange={setAddressLineTwo}
                  value={addressLineTwo}
                  placeholder="Optional"
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  optional
                  primaryStyle
                />
                <Row className="city-state-row">
                  <SmartInput
                    id="city-field"
                    label="City"
                    onChange={setCity}
                    value={city}
                    placeholder="Required"
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                  <SmartInput
                    label="State"
                    id="state-field"
                    classes="px-1"
                    onChange={setState}
                    value={state}
                    placeholder="Req."
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                  <SmartInput
                    label="Zip"
                    id="zip-field"
                    onChange={setZip}
                    value={zip}
                    placeholder="Req."
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    primaryStyle
                  />
                </Row>
              </div>
            )}
          </div>
        )}
        <Col md="auto">
          <Form.Control id="submit-button" type="submit" value="Submit" />
        </Col>
      </Form>
    </Col>
  );
}

export default AuthBox;
