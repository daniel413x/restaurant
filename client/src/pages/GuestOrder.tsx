import React from 'react';
import ActiveOrder from '../components/ActiveOrder';
import SuggestRegistration from '../components/SuggestRegistration';

function GuestOrder() {
  return (
    <div id="guest-order">
      <h1>
        Order received
      </h1>
      <ActiveOrder />
      <h3>
        While you&apos;re waiting...
        Register an account
      </h3>
      <SuggestRegistration />
    </div>
  );
}

export default GuestOrder;
