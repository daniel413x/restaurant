import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
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
import { ICategory, IFoodItem } from '../types/types';
import FoodItemForm from '../components/FoodItemForm';
import EditedCategory from '../components/EditedCategory';
import List from '../components/List';
import AddCategory from '../components/AddCategory';
import { fetchAllCategories } from '../http/categoryAPI';

function EditMenu() {
  const [editedItem, setEditedItem] = useState<IFoodItem>();
  const { categories } = useContext(Context);
  const selectFoodItemToEdit = (obj: IFoodItem) => {
    setEditedItem(obj);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    (async () => {
      const allCategories = await fetchAllCategories();
      categories.setCategories(allCategories);
    })();
  }, []);
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
          <FoodItemForm
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
            renderList={(category: ICategory) => {
              if (category.name === 'Uncategorized' && category.foodItems.length === 0) {
                return null;
              }
              return (
                <li key={category.id}>
                  <EditedCategory
                    category={category}
                    selectFoodItemToEdit={selectFoodItemToEdit}
                  />
                </li>
              );
            }}
          >
            <AddCategory
              key="add-category-li"
            />
          </List>
        </Col>
      )}
    </Container>
  );
}

export default observer(EditMenu);
