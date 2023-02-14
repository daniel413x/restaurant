import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Col,
  Container,
} from 'react-bootstrap';
import { useParams, NavLink } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FoodItemForm from '../components/FoodItemForm';
import Context from '../context/context';
import { fetchOneFoodItem } from '../http/foodItemInMenuAPI';
import { IFoodItem } from '../types/types';
import {
  ADMIN_ROUTE,
  MENU_ROUTE,
  red,
  shortNotification,
} from '../utils/consts';

function EditedFoodItem() {
  const { notifications } = useContext(Context);
  const { id } = useParams();
  const [editedFoodItem, setEditedFoodItem] = useState<IFoodItem>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const foodItem = await fetchOneFoodItem(id!);
        setEditedFoodItem(foodItem);
        return setLoading(false);
      } catch (error: any) {
        return notifications.message(
          error.response.data.message,
          red,
          shortNotification,
        );
      }
    })();
  }, [id]);
  return loading ? null : (
    <Container id="edited-food-item">
      <Col>
        <h2>
          {editedFoodItem?.name}
        </h2>
        <NavLink
          to={`${ADMIN_ROUTE}/${MENU_ROUTE}`}
          className="btn btn-secondary return-button"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          Return
        </NavLink>
      </Col>
      <FoodItemForm
        foodItem={editedFoodItem}
      />
    </Container>
  );
}

export default observer(EditedFoodItem);
