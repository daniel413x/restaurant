import React, {
  useState, useEffect, useContext, FormEvent,
} from 'react';
import {
  Col, Button, Form, Dropdown,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import { IAddress } from '../types/types';
import {
  green,
  red,
  shortNotification,
} from '../utils/consts';
import { deleteAddress, editAddress } from '../http/addressAPI';
import Confirmation from './modals/Confirmation';

function ChooseDefaultAddress() {
  const { notifications, addresses } = useContext(Context);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const userAddresses = addresses.all!;
  const submitSetDefaultAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editAddress(selectedAddress!.id, { isDefault: true });
      addresses.setDefault(selectedAddress);
      return notifications.message(
        'Default address saved successfully',
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
  const submitDeleteAddress = async () => {
    try {
      await deleteAddress(selectedAddress!.id);
      const deletedIndex = userAddresses.findIndex((address: IAddress) => address.id === selectedAddress?.id);
      if (deletedIndex > 0) {
        setSelectedAddress(userAddresses[deletedIndex - 1]);
      }
      if (userAddresses.length > 0 && deletedIndex === 0) {
        setSelectedAddress(userAddresses[1]);
      }
      if (selectedAddress) {
        addresses.deleteAddress(selectedAddress.id);
      }
      if (selectedAddress?.id === addresses.defaultAddress?.id) {
        addresses.setDefault(undefined);
      }
      if (userAddresses.length === 0) {
        setSelectedAddress(undefined);
      }
      notifications.message(
        'Address deleted',
        green,
        shortNotification,
      );
    } catch (error: any) {
      notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  useEffect(() => {
    if (addresses.defaultAddress) {
      setSelectedAddress(addresses.defaultAddress);
    } else if (userAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(userAddresses[0]);
    }
  }, [userAddresses]);
  return (
    <Col className={`${userAddresses.length === 0 && 'blocked'}`} lg={6}>
      <Confirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmFunc={submitDeleteAddress}
        header="Delete address?"
      />
      <h4>
        Set default address
      </h4>
      <Dropdown
        className="dropdown-button"
      >
        <Dropdown.Toggle
          variant="light"
          id="select-default-dropdown"
        >
          {selectedAddress ? selectedAddress.addressLineOne : 'Select default address'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {userAddresses.map(((address: IAddress) => (
            <Dropdown.Item key={address.id}><Button onClick={() => setSelectedAddress(address)}>{address.addressLineOne}</Button></Dropdown.Item>
          )))}
        </Dropdown.Menu>
      </Dropdown>
      First name
      <Form.Control
        value={selectedAddress?.firstName || ''}
        id="default-address-firstname"
        readOnly
      />
      Last name
      <Form.Control
        id="default-address-lastname"
        value={selectedAddress?.lastName || ''}
        readOnly
      />
      Address Line One
      <Form.Control
        id="default-address-line-one"
        value={selectedAddress?.addressLineOne || ''}
        readOnly
      />
      Address Line Two
      <Form.Control
        id="default-address-line-two"
        value={selectedAddress?.addressLineTwo || ''}
        readOnly
      />
      City/Territory
      <Form.Control
        id="default-address-city"
        value={selectedAddress?.city || ''}
        readOnly
      />
      State
      <Form.Control
        id="default-address-state"
        value={selectedAddress?.state || ''}
        readOnly
      />
      Zip
      <Form.Control
        id="default-address-zip"
        value={selectedAddress?.zip || ''}
        readOnly
      />
      <Col className="button-row">
        <Form onSubmit={submitSetDefaultAddress}>
          <Button
            className={`${selectedAddress?.id === addresses.defaultAddress?.id && 'blocked'}`}
            type="submit"
            id="submit-default-button"
          >
            Set as default
          </Button>
        </Form>
        <Button id="delete-button" onClick={() => setShowDeleteModal(true)}>
          Delete
        </Button>
      </Col>
    </Col>
  );
}

export default observer(ChooseDefaultAddress);
