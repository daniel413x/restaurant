import React from 'react';
import { Container } from 'react-bootstrap';
import ActiveOrder from '../components/ActiveOrder';

function GuestOrder() {
  return (
    <Container id="guest-order">
      <h1>
        Order received
      </h1>
      <ActiveOrder />
      {/* <SuggestRegistration /> */}
      <h3>
        While you&apos;re waiting...
        Register an account
      </h3>
    </Container>
  );
}

export default GuestOrder;
