import React, { useContext } from 'react';
import {
  Container,
  Col,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import { ICategory } from '../types/types';
import EditedCategory from '../components/EditedCategory';
import List from '../components/List';
import AddCategory from '../components/AddCategory';

function EditMenu() {
  const { categories } = useContext(Context);
  return (
    <Container id="edit-menu">
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
    </Container>
  );
}

export default observer(EditMenu);
