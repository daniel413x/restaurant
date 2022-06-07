import React from 'react';
import EditAvatar from '../components/EditAvatar';
import EditEmail from '../components/EditEmail';
import EditPassword from '../components/EditPassword';
import DeliveryAddresses from '../components/DeliveryAddresses';

function AccountDetails() {
  return (
    <div id="account-details">
      <h4 className="section-label">
        Personalize
      </h4>
      <EditAvatar />
      <h4 className="section-label">
        Email &amp; Password
      </h4>
      <EditEmail />
      <EditPassword />
      <h4 className="section-label">
        Addresses &amp; Default Address
      </h4>
      <DeliveryAddresses />
    </div>
  );
}

export default AccountDetails;
