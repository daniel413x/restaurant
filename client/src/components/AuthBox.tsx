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
} from '../utils/consts';
import SmartInput from './SmartInput';
import LabeledCheckboxButton from './LabeledCheckboxButton';
import Context from '../context/context';
import { login, registration } from '../http/userAPI';
import { createAddress } from '../http/addressAPI';
import { fetchUserCart } from '../http/cartAPI';

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
    const formattedEmail = ['', ''];
    email.split('@').forEach((p: string, i: number) => {
      formattedEmail[i] = p;
    });
    const [local, domain] = formattedEmail;
    const expectedLength = formattedEmail.length === 2;
    const validEmail = expectedLength && local && domain;
    if (!validEmail) {
      notifications.message(
        'Invalid email format',
        red,
        longNotification,
      );
      return;
    }
    const validPassword = /(?=^\S{6,256}$)^.+$/i.test(password);
    if (!validPassword) {
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
        const fetchedUser = await login(email, password);
        const fetchedCart = await fetchUserCart();
        user.set(fetchedUser);
        cart.set(fetchedCart);
      } else {
        const { newUser, newCart } = await registration(email, password);
        user.set(newUser);
        cart.set(newCart);
        let defaultAddress;
        if (saveDefaultAddress) {
          defaultAddress = await createAddress({
            firstName,
            lastName,
            addressLineOne,
            addressLineTwo,
            city,
            state,
            zip,
            isDefault: true,
            UserId: newUser.id,
          });
          addresses.add(defaultAddress);
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
          label="Email address"
          onChange={setEmail}
          value={email}
          placeholder={forLogin ? '' : 'Required'}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          primaryStyle
        />
        <SmartInput
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
              label="Save a default delivery address (optional)"
              boolean={saveDefaultAddress}
              setBoolean={setSaveDefaultAddress}
              classes="toggle-default-address-form"
            />
            {saveDefaultAddress && (
              <div>
                <Row>
                  <SmartInput
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
                    classes="disabled-2"
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
                  onChange={setLastName}
                  value={lastName}
                  placeholder="Required"
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  primaryStyle
                />
                <SmartInput
                  label="Address line one"
                  onChange={setAddressLineOne}
                  value={addressLineOne}
                  placeholder="Required"
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  primaryStyle
                />
                <SmartInput
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
          <Form.Control type="submit" value="Submit" />
        </Col>
      </Form>
    </Col>
  );
}

export default AuthBox;
