import React from 'react';
import {
  Container, Row,
} from 'react-bootstrap';
import AddNewAddress from './AddNewAddress';
import ChooseDefaultAddress from './ChooseDefaultAddress';

function DeliveryAddresses() {
  return (
    <Container id="delivery-addresses">
      <Row>
        <ChooseDefaultAddress />
        <AddNewAddress />
      </Row>
    </Container>
  );
}

export default DeliveryAddresses;
