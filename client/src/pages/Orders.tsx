import { observer } from 'mobx-react-lite';
import React from 'react';
import ActiveOrder from '../components/ActiveOrder';
import PreviousOrders from '../components/PreviousOrders';

function Orders() {
  return (
    <div id="orders">
      <ActiveOrder />
      <PreviousOrders />
    </div>
  );
}

export default observer(Orders);
