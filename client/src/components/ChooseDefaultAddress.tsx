import React, {
  useState, useEffect, useContext,
} from 'react';
import {
  Col, Button, Form, Dropdown,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import { ICostumerAddress } from '../types/types';
import {
  green, shortNotification,
} from '../utils/consts';

function ChooseDefaultAddress() {
  const { user, notifications } = useContext(Context);
  const addresses = user.user.addresses!;
  const [selectedDefaultAddress, setSelectedDefaultAddress] = useState<ICostumerAddress | null>(null);
  useEffect(() => {
    if (user.user.defaultAddress) {
      setSelectedDefaultAddress(user.user.defaultAddress!);
    } else if (addresses.length > 0 && !selectedDefaultAddress) {
      setSelectedDefaultAddress(addresses[0]);
    }
  }, [addresses]);
  const setDefaultAddress = () => {
    user.setDefaultAddress(selectedDefaultAddress);
    notifications.message(
      'Default address saved successfully',
      green,
      shortNotification,
    );
  };
  const deleteAddress = () => {
    const deletedIndex = addresses.findIndex((address: ICostumerAddress) => address.id === selectedDefaultAddress?.id);
    if (deletedIndex > 0) {
      setSelectedDefaultAddress(addresses[deletedIndex - 1]);
    }
    if (addresses.length > 0 && deletedIndex === 0) {
      setSelectedDefaultAddress(addresses[1]);
    }
    if (selectedDefaultAddress) {
      user.removeAddress(selectedDefaultAddress.id);
    }
    if (selectedDefaultAddress?.id === user.user.defaultAddress!.id) {
      user.setDefaultAddress(null);
    }
    if (addresses.length === 0) {
      setSelectedDefaultAddress(null);
    }
    notifications.message(
      'Address deleted',
      green,
      shortNotification,
    );
  };
  return (
    <Col className={`${addresses.length === 0 && 'disabled-2'}`} lg={6}>
      <h4>
        Set default address
      </h4>
      <Dropdown className="dropdown-button">
        <Dropdown.Toggle variant="light">
          {selectedDefaultAddress ? selectedDefaultAddress.addressLineOne : 'Select default address'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {addresses.map(((address: ICostumerAddress) => (
            <Dropdown.Item><Button onClick={() => setSelectedDefaultAddress(address)}>{address.addressLineOne}</Button></Dropdown.Item>
          )))}
        </Dropdown.Menu>
      </Dropdown>
      First name
      <Form.Control
        value={selectedDefaultAddress?.firstName}
        readOnly
      />
      Last name
      <Form.Control
        value={selectedDefaultAddress?.lastName}
        readOnly
      />
      Address Line One
      <Form.Control
        value={selectedDefaultAddress?.addressLineOne}
        readOnly
      />
      Address Line Two
      <Form.Control
        value={selectedDefaultAddress?.addressLineTwo}
        readOnly
      />
      City/Territory
      <Form.Control
        value={selectedDefaultAddress?.city}
        readOnly
      />
      State
      <Form.Control
        value={selectedDefaultAddress?.state}
        readOnly
      />
      Zip
      <Form.Control
        value={selectedDefaultAddress?.zip}
        readOnly
      />
      <Col className="button-row">
        <Button className={`${selectedDefaultAddress?.id === user.user.defaultAddress?.id && 'disabled-2'}`} onClick={setDefaultAddress}>
          Set as default
        </Button>
        <Button onClick={deleteAddress}>
          Delete
        </Button>
      </Col>
    </Col>
  );
}

export default observer(ChooseDefaultAddress);
