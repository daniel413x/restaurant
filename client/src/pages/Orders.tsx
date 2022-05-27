import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import ActiveOrder from '../components/ActiveOrder';
import PreviousOrders from '../components/PreviousOrders';
import Context from '../context/context';

function Orders() {
  const { orders } = useContext(Context);
  const [activeOrder, setActiveOrder] = useState(false);
  useEffect(() => {
    if (orders.activeOrder.id !== -1) {
      setActiveOrder(true);
    }
  }, [orders.activeOrder]);
  return (
    <div id="orders">
      {activeOrder && (
        <h1>
          You placed an order
        </h1>
      )}
      <ActiveOrder />
      <PreviousOrders />
    </div>
  );
}

export default observer(Orders);
