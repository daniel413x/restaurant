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
import { IFoodCategory, IFoodItem } from '../types/types';
import EditedFoodItem from '../components/EditedFoodItem';
import EditedCategory from '../components/EditedCategory';
import List from '../components/List';
import { categoriesPlaceholders } from '../utils/consts';

function EditMenu() {
  const [editedItem, setEditedItem] = useState<IFoodItem>();
  const { categories } = useContext(Context);
  useEffect(() => {
    categories.setCategories(categoriesPlaceholders);
  }, []);
  const selectFoodItemToEdit = (obj: IFoodItem) => {
    setEditedItem(obj);
    window.scrollTo(0, 0);
  };
  return (
    <Container id="edit-menu">
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
          <EditedFoodItem
            foodItem={editedItem}
          />
        </Col>
      ) : (
        <Col>
          <h2>
            Edit menu
          </h2>
          <List
            className="categories-ul"
            items={categories.all}
            renderList={(category: IFoodCategory) => {
              if (category.id === -1 && category.foodItems.length === 0) {
                return null;
              }
              return (
                <li className="category-li">
                  <EditedCategory
                    category={category}
                    selectFoodItemToEdit={selectFoodItemToEdit}
                  />
                </li>
              );
            }}
          />
        </Col>
      )}
    </Container>
  );
}

export default observer(EditMenu);
