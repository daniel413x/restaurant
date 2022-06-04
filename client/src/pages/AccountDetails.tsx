import React, { useContext } from 'react';
import Context from '../context/context';
import UploadImage from '../components/UploadImage';
import EditEmail from '../components/EditEmail';
import EditPassword from '../components/EditPassword';
import DeliveryAddresses from '../components/DeliveryAddresses';
import {
  green, shortNotification,
} from '../utils/consts';

function AccountDetails() {
  const { notifications } = useContext(Context);
  const submit = () => {
    notifications.message(
      'Profile picture saved successfully',
      green,
      shortNotification,
    );
  };
  return (
    <div id="account-details">
      <h4 className="section-label">
        Personalize
      </h4>
      <UploadImage
        onSubmit={submit}
        dimensions={[85, 85]}
      />
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
