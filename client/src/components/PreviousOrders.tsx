import React, { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {
  testPreviousOrders,
} from '../utils/consts';
import Context from '../context/context';
import List from './List';
import PreviousOrder from './PreviousOrder';
import { IOrder } from '../types/types';

function PreviousOrders() {
  const { orders } = useContext(Context);
  useEffect(() => {
    orders.setOrders(testPreviousOrders);
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
          <PreviousOrder
            order={order}
            key={order.id}
          />
        )}
      />
    </Container>
  );
}

export default observer(PreviousOrders);
