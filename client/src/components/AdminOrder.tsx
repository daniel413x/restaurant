import React, {
  useContext,
  useState,
  FormEvent,
  useRef,
  useEffect,
} from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  Dropdown,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import Context from '../context/context';
import { OrderOrCartFoodItem, IOrder } from '../types/types';
import List from './List';
import {
  green,
  shortNotification,
} from '../utils/consts';
import FoodItemOrder from './FoodItemOrder';
import { calcItemPrice, orderDate } from '../utils/functions';
import { updateOrderStatus } from '../http/orderAPI';
import useActiveElement from '../hooks/useActiveElement';
import useKeyPress from '../hooks/useKeyPress';

interface AdminOrderProps {
  order: IOrder;
}

function AdminOrder({
  order,
}: AdminOrderProps) {
  const {
    id,
    foodItems,
    status,
    date,
    total,
  } = order;
  const {
    firstName,
    lastName,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    zip,
  } = order.address!;
  const { admin, notifications } = useContext(Context);
  const [expand, setExpand] = useState(true);
  const [newStatus, setNewStatus] = useState<number>(0);
  const orderReceived = status >= 0;
  const orderBeingPrepared = order.status >= 1;
  const orderEnRoute = status >= 2;
  const orderDelivered = status >= 3;
  const formattedDate = orderDate(date);
  const submitUpdateStatus = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateOrderStatus(id, newStatus);
    admin.setOrderStatus(order, newStatus);
    notifications.message(
      'Order status updated',
      green,
      shortNotification,
    );
  };
  const toggleExpand = () => {
    setExpand(!expand);
  };
  const activeElement = useActiveElement();
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const enterPress = useKeyPress('Enter');
  useEffect(() => {
    if (enterPress && activeElement === expandButtonRef.current) {
      toggleExpand();
    }
  }, [enterPress]);
  return (
    <div className="admin-order collapsible-item">
      <div className="title-buttons-row body">
        <Col className="tab-col" md="auto">
          Order
          {' #'}
          {id.slice(0, 3)}
        </Col>
        <Col className="tab-col second-col" md="auto">
          <span>
            {formattedDate}
          </span>
          <span className={`completion-label ${orderDelivered && 'secondary-green'}`}>
            {orderDelivered ? 'Complete' : 'Incomplete'}
          </span>
        </Col>
        <Col className="tab-col" md="auto">
          Total
          {' $'}
          {calcItemPrice(Number(total))}
        </Col>
        <Col className="ellipsis-menu" md="auto">
          <Dropdown autoClose>
            <Dropdown.Toggle>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                ref={expandButtonRef}
              >
                <Button
                  onClick={toggleExpand}
                >
                  {expand ? 'Collapse' : 'Expand'}
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </div>
      {expand && <div className="divider" />}
      {expand && (
        <Row className={`expanded-content ${expand && 'expand'}`}>
          <Col className="food-items-col">
            <Col className="label">
              Items
            </Col>
            <List
              items={foodItems}
              renderList={(foodItem: OrderOrCartFoodItem) => (
                <li key={foodItem.id}>
                  <FoodItemOrder
                    foodItem={foodItem}
                  />
                </li>
              )}
            />
          </Col>
          <Col className="address-status-col">
            <Col className="address">
              <Col className="label">
                Delivery address
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
            <Form className="order-status" onSubmit={submitUpdateStatus}>
              <Col className="label">
                Order status
              </Col>
              <Col>
                {orderReceived && <FontAwesomeIcon icon={faCheck} />}
                <Form.Check
                  label="Order received"
                  name="status"
                  type="radio"
                  className={`${orderReceived && 'blocked'}`}
                />
              </Col>
              <Col>
                {orderBeingPrepared && <FontAwesomeIcon icon={faCheck} />}
                <Form.Check
                  label="Order being prepared"
                  name="status"
                  type="radio"
                  className={`status-two-radio-button ${orderBeingPrepared && 'blocked'}`}
                  onClick={() => setNewStatus(1)}
                />
              </Col>
              <Col>
                {orderEnRoute && <FontAwesomeIcon icon={faCheck} />}
                <Form.Check
                  label="Order en route"
                  name="status"
                  type="radio"
                  className={`status-three-radio-button ${orderEnRoute && 'blocked'}`}
                  onClick={() => setNewStatus(2)}
                />
              </Col>
              <Col>
                {orderDelivered && <FontAwesomeIcon icon={faCheck} />}
                <Form.Check
                  label="Order delivered"
                  name="status"
                  type="radio"
                  className={`status-four-radio-button ${orderDelivered && 'blocked'}`}
                  onClick={() => setNewStatus(3)}
                />
              </Col>
              <Button
                className="submit-change-status-button submit-button btn btn-secondary"
                type="submit"
              >
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default observer(AdminOrder);
