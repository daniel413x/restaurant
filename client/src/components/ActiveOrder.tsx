import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Context from '../context/context';
import List from './List';
import FoodItemOrder from './FoodItemOrder';
import OrderProgress from './OrderProgress';
import TimestampedAction from './TimestampedAction';
import { IFoodItem, ITimestampedAction } from '../types/types';

function ActiveOrder() {
  /*
  const [loading, setLoading] = useState(true); // block content until orderId matches with the userId
  const { orders } = useContext(Context);
  useEffect(() => {
    if (orders.activeOrder.userId !== )
  }, []);
  */
  const { orders } = useContext(Context);
  const [currentOrb, setCurrentOrb] = useState<number>(0);
  const [dynamicStatusSubheading, setDynamicStatusSubheading] = useState<string>('');
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  useEffect(() => {
    if (!orders.activeOrder.status.actionLog.length) {
      return;
    }
    const { value, actionLog } = orders.activeOrder.status;
    setDynamicStatusSubheading(actionLog[actionLog.length - 1].message);
    setCurrentOrb(value); // status codes range from 0 (incomplete) to 3 (complete)
    let currentMin = 0;
    orders.activeOrder.foodItems.forEach((obj: IFoodItem) => {
      if (obj.time![0] > currentMin) {
        [currentMin] = obj.time!;
        setMin(obj.time![0] + 25 - (4 * value));
      }
    });
    let currentMax = 0;
    orders.activeOrder!.foodItems.forEach((obj: IFoodItem) => {
      if (obj.time![1] > currentMax) {
        [currentMax] = obj.time!;
        setMax(obj.time![1] + 25 - (4 * value));
      }
    });
  }, [orders.activeOrder?.status.value]);
  return (
    <Container id="active-order">
      <Row className="main-row">
        <Col className="items" md={6}>
          <h2>
            Order #
            {orders.activeOrder?.id}
          </h2>
          <List
            items={orders.activeOrder?.foodItems!}
            renderList={(foodItem: IFoodItem) => (
              <FoodItemOrder
                foodItem={foodItem}
                key={foodItem.id}
              />
            )}
          />
        </Col>
        <Col className="status" md={6}>
          <h2>
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
                  {orders.activeOrder?.status!.actionLog.map((action: ITimestampedAction, index) => (
                    <TimestampedAction
                      message={action.message}
                      timestamp={action.timestamp}
                      currentOrb={currentOrb}
                      index={index}
                      key={action.message}
                    />
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

export default ActiveOrder;
