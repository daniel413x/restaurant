import React, {
  useState, useContext, FormEvent,
} from 'react';
import {
  Col, Button, Form,
} from 'react-bootstrap';
import Context from '../context/context';
import {
  green,
  red, shortNotification,
} from '../utils/consts';
import SmartInput from './SmartInput';
import { createNewAddress } from '../http/addressesAPI';

function AddNewAddress() {
  const {
    notifications,
    user,
    addresses,
  } = useContext(Context);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [addressLineOne, setAddressLineOne] = useState<string>('');
  const [addressLineTwo, setAddressLineTwo] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [pressedSaveAsDefault, setPressedSaveAsDefault] = useState<boolean>(false);
  const requiredFieldsIncomplete = !firstName || !lastName
  || !addressLineOne || !city
  || !zip || !state;
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    if (requiredFieldsIncomplete) {
      return notifications.message(
        'Please complete highlighted fields',
        red,
        shortNotification,
      );
    }
    try {
      const addressForm = {
        firstName,
        lastName,
        addressLineOne,
        addressLineTwo,
        city,
        zip,
        state,
        UserId: user.id,
        isDefault: pressedSaveAsDefault,
      };
      const newAddress = await createNewAddress(addressForm);
      if (pressedSaveAsDefault) {
        addresses.setDefault(newAddress);
      }
      addresses.addAddress(newAddress);
      setFirstName('');
      setLastName('');
      setAddressLineOne('');
      setAddressLineTwo('');
      setCity('');
      setZip('');
      setState('');
      return notifications.message(
        'Address saved successfully',
        green,
        shortNotification,
      );
    } catch (error: any) {
      return notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  return (
    <Col lg={6}>
      <h4>
        Add new address
      </h4>
      First name
      <Form onSubmit={submit}>
        <SmartInput
          onChange={setFirstName}
          value={firstName}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          placeholder="Required"
        />
        Last name
        <SmartInput
          onChange={setLastName}
          value={lastName}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          placeholder="Required"
        />
        Address Line One
        <SmartInput
          onChange={setAddressLineOne}
          value={addressLineOne}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          placeholder="Required"
        />
        Address Line Two
        <SmartInput
          onChange={setAddressLineTwo}
          value={addressLineTwo}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          optional
          placeholder="Optional"
        />
        City/Territory
        <SmartInput
          onChange={setCity}
          value={city}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          placeholder="Required"
        />
        State
        <SmartInput
          onChange={setState}
          value={state}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          placeholder="Required"
        />
        Zip
        <SmartInput
          onChange={setZip}
          value={zip}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          placeholder="Required"
        />
        <Col className="button-row">
          <Button id="add-new-address-save" type="submit" onClick={() => setPressedSaveAsDefault(false)} className={`${requiredFieldsIncomplete && 'disabled-2'}`}>
            Save
          </Button>
          <Button id="add-new-address-save-as-default" onClick={() => setPressedSaveAsDefault(true)} type="submit" className={`${requiredFieldsIncomplete && 'disabled-2'}`}>
            Save as default
          </Button>
        </Col>
      </Form>
    </Col>
  );
}

export default AddNewAddress;
