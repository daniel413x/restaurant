import React, {
  useState, useContext, FormEvent,
} from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import {
  shortNotification,
  red,
} from '../utils/consts';
import SmartInput from './SmartInput';
import LabeledCheckboxButton from './LabeledCheckboxButton';
import Context from '../context/context';

interface AuthBoxProps {
  onSuccess: () => void;
  showLogin: boolean;
}

function AuthBox({
  onSuccess,
  showLogin,
}: AuthBoxProps) {
  const { notifications } = useContext(Context);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [showSaveDefault, setShowSaveDefault] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [addressLineOne, setAddressLineOne] = useState<string>('');
  const [addressLineTwo, setAddressLineTwo] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
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
    console.log({
      email,
      password,
      firstName,
      middleName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      state,
      zip,
    });
    onSuccess();
  };
  return (
    <Col className="auth-box">
      <Form onSubmit={(e) => submit(e)}>
        <SmartInput
          label={showLogin ? 'Email address/username' : 'Email address'}
          onChange={setEmail}
          value={email}
          placeholder={showLogin ? '' : 'Required'}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          primaryStyle
        />
        <SmartInput
          label="Password"
          onChange={setPassword}
          value={password}
          placeholder={showLogin ? '' : 'Required'}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          primaryStyle
        />
        {showLogin ? <div className="no-shift" /> : (
          <div className="default-address-form">
            <LabeledCheckboxButton
              label="Save a default delivery address (optional)"
              boolean={showSaveDefault}
              setBoolean={setShowSaveDefault}
              classes="toggle-default-address-form"
            />
            {showSaveDefault && (
              <div>
                <Row>
                  <SmartInput
                    label="First name"
                    onChange={setFirstName}
                    value={firstName}
                    placeholder="Optional"
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    optional
                    primaryStyle
                  />
                  <SmartInput
                    label="Middle name"
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
                  placeholder="Optional"
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  optional
                  primaryStyle
                />
                <SmartInput
                  label="Address line one"
                  onChange={setAddressLineOne}
                  value={addressLineOne}
                  placeholder="Optional"
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  optional
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
                    placeholder="Optional"
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    optional
                    primaryStyle
                  />
                  <SmartInput
                    label="State"
                    onChange={setState}
                    value={state}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    optional
                    primaryStyle
                  />
                  <SmartInput
                    label="Zip"
                    onChange={setZip}
                    value={zip}
                    pressedSubmit={pressedSubmit}
                    setPressedSubmit={setPressedSubmit}
                    optional
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
