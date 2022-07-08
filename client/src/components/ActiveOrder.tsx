import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import List from './List';
import FoodItemOrder from './FoodItemOrder';
import OrderProgress from './OrderProgress';
import TimestampedAction from './TimestampedAction';
import { OrderOrCartFoodItem } from '../types/types';
import { fetchActiveOrder } from '../http/orderAPI';
import { actionTimestamp } from '../utils/functions';

function ActiveOrder() {
  const { orders } = useContext(Context);
  const [currentOrb, setCurrentOrb] = useState<number>(0);
  const [dynamicStatusSubheading, setDynamicStatusSubheading] = useState<string>('');
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const {
    firstName,
    lastName,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    zip,
  } = orders.activeOrder?.address;
  useEffect(() => {
    if (!orders.activeOrder.actionLog.length) {
      return;
    }
    const { status, actionLog } = orders.activeOrder;
    setDynamicStatusSubheading(actionLog[actionLog.length - 1][1]);
    setCurrentOrb(status); // status codes range from 0 (incomplete) to 3 (complete)
    setMin(orders.activeOrder.time[0] + 25 - (4 * status));
    setMax(orders.activeOrder.time[1] + 25 - (4 * status));
  }, [orders.activeOrder?.status]);
  useEffect(() => {
    (async () => {
      const activeOrder = await fetchActiveOrder();
      orders.setActiveOrder(activeOrder);
    })();
  }, []);
  return (
    <Container id="active-order">
      <Row className="main-row">
        <Col className="items-delivery-address-col" md={6}>
          <h2>
            Order #
            {orders.activeOrder?.id.split('').slice(0, 8).join('')}
          </h2>
          <List
            className="items-ul"
            items={orders.activeOrder?.foodItems!}
            renderList={(foodItem: OrderOrCartFoodItem) => (
              <li key={foodItem.id}>
                <FoodItemOrder
                  foodItem={foodItem}
                />
              </li>
            )}
          />
          <Col className="delivery-address">
            <Col className="label">
              Deliver to:
            </Col>
            <Col>
              {firstName}
              {' '}
              {lastName}
            </Col>
            <Col>
              {addressLineOne}
              {' '}
              {addressLineTwo}
            </Col>
            <Col>
              {city}
              {', '}
              {state}
              {' '}
              {zip}
            </Col>
          </Col>
        </Col>
        <Col className="status" md={6}>
          <h2 className="header">
            The rest is on us!
          </h2>
          <span className="label">
            Order status
          </span>
          <span className="dynamic-status-subheading">
            {dynamicStatusSubheading}
          </span>
          <OrderProgress currentOrb={currentOrb} />
          <Row className="info-row">
            <Col className="order-log" md={6}>
              <div className="inner-content">
                <span className="label">
                  Order tracker
                </span>
                <ul>
                  {orders.activeOrder?.actionLog.map((action: [string, string], index: number) => (
                    <li key={action[1]}>
                      <TimestampedAction
                        message={action[1]}
                        timestamp={actionTimestamp(action[0])}
                        currentOrb={currentOrb}
                        index={index}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col className="estimated-time" md={6}>
              <div className="inner-content">
                <span className="label">
                  Estimated time
                </span>
                <span className={`figure ${currentOrb === 3 && 'disabled-2'}`}>
                  {`${min} - ${max} minutes`}
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ActiveOrder);
