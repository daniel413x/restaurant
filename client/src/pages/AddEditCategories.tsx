/* eslint-disable */

import React, { useContext, useEffect } from 'react';
import Context from '../context/context';
import {
  Container,
  Col,
  Form,
} from 'react-bootstrap';
import { IFoodCategory } from '../types/types';
import EditedCategory from '../components/EditedCategory';
import AddCategory from '../components/AddCategory';
import List from '../components/List';
import { categoriesPlaceholders } from '../utils/consts';
import { observer } from 'mobx-react-lite';

function AddEditCategories() {
  const { categories } = useContext(Context);
  useEffect(() => {
    categories.setCategories(categoriesPlaceholders);
  }, []);
  return (
    <Container id="add-edit-categories">
      <h2>
        Edit categories
      </h2>
      <Col>
        <List
          items={categories.all}
          renderList={(category: IFoodCategory) => (
            <EditedCategory
              category={category}
            />
          )}
        />
        <h2>
          Add category
        </h2>
        <AddCategory />
      </Col>
    </Container>
  );
}

export default observer(AddEditCategories);
