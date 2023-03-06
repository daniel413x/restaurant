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
  const noAddresses = userAddresses.length === 0;
  return (
    <Col className={`${noAddresses && 'blocked'}`} lg={6}>
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
          tabIndex={noAddresses ? -1 : 0}
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
        tabIndex={noAddresses ? -1 : 0}
      />
      Last name
      <Form.Control
        id="default-address-lastname"
        value={selectedAddress?.lastName || ''}
        readOnly
        tabIndex={noAddresses ? -1 : 0}
      />
      Address Line One
      <Form.Control
        id="default-address-line-one"
        value={selectedAddress?.addressLineOne || ''}
        readOnly
        tabIndex={noAddresses ? -1 : 0}
      />
      Address Line Two
      <Form.Control
        id="default-address-line-two"
        value={selectedAddress?.addressLineTwo || ''}
        readOnly
        tabIndex={noAddresses ? -1 : 0}
      />
      City/Territory
      <Form.Control
        id="default-address-city"
        value={selectedAddress?.city || ''}
        readOnly
        tabIndex={noAddresses ? -1 : 0}
      />
      State
      <Form.Control
        id="default-address-state"
        value={selectedAddress?.state || ''}
        readOnly
        tabIndex={noAddresses ? -1 : 0}
      />
      Zip
      <Form.Control
        id="default-address-zip"
        value={selectedAddress?.zip || ''}
        readOnly
        tabIndex={noAddresses ? -1 : 0}
      />
      <Col className="button-row">
        <Form onSubmit={submitSetDefaultAddress}>
          <Button
            className={`${selectedAddress?.id === addresses.defaultAddress?.id && 'blocked'}`}
            type="submit"
            id="submit-default-button"
            tabIndex={noAddresses ? -1 : 0}
          >
            Set as default
          </Button>
        </Form>
        <Button
          id="delete-button"
          onClick={() => setShowDeleteModal(true)}
          tabIndex={noAddresses ? -1 : 0}
        >
          Delete
        </Button>
      </Col>
    </Col>
  );
}

export default observer(ChooseDefaultAddress);
