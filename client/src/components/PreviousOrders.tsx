import React, { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import List from './List';
import PreviousOrder from './PreviousOrder';
import { IOrder } from '../types/types';
import { fetchAllOrders } from '../http/orderAPI';

function PreviousOrders() {
  const { orders } = useContext(Context);
  useEffect(() => {
    (async () => {
      const previousOrders = await fetchAllOrders();
      console.log(previousOrders);
      orders.setOrders(previousOrders);
    })();
  }, []);
  return (
    <Container id="previous-orders">
      <h2>
        Previous orders
      </h2>
      {orders.all.length === 0 && 'Previous orders will appear here.'}
      <List
        className="order-list"
        items={orders.all}
        renderList={(order: IOrder) => (
          <li key={order.id}>
            <PreviousOrder
              order={order}
            />
          </li>
        )}
      />
    </Container>
  );
}

export default observer(PreviousOrders);
