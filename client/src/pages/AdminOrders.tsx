import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Col,
  Button,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import Context from '../context/context';
import { IOrder, IFoodItem } from '../types/types';
import FoodItemForm from '../components/FoodItemForm';
import List from '../components/List';
import { categoriesPlaceholders } from '../utils/consts';
import AdminOrder from '../components/AdminOrder';
import { fetchAllOrders } from '../http/orderAPI';

function AdminOrders() {
  const [editedItem, setEditedItem] = useState<IFoodItem>();
  const { admin, categories } = useContext(Context);
  useEffect(() => {
    (async () => {
      const fetchedOrders = await fetchAllOrders();
      admin.setOrders(fetchedOrders);
    })();
    categories.setCategories(categoriesPlaceholders);
  }, []);
  return (
    <Container id="admin-orders">
      {editedItem ? (
        <Col>
          <h2>
            {editedItem.name}
          </h2>
          <Button
            onClick={() => setEditedItem(undefined)}
            className="btn btn-secondary return-button"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
            Return
          </Button>
          <FoodItemForm
            foodItem={editedItem}
          />
        </Col>
      ) : (
        <Col>
          <h2>
            Orders
          </h2>
          <List
            className="categories-ul"
            items={admin.allOrders}
            renderList={(order: IOrder) => (
              <li key={order.id}>
                <AdminOrder
                  order={order}
                />
              </li>
            )}
          />
        </Col>
      )}
    </Container>
  );
}

export default observer(AdminOrders);
