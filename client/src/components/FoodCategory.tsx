import React, { ReactNode } from 'react';
import {
  Col, Row,
} from 'react-bootstrap';
import { IFoodItem, IFoodCategory } from '../types/types';
import { makeId } from '../utils/functions';

interface FoodCategoryProps extends IFoodCategory {
  renderItem: (item: IFoodItem) => ReactNode;
}

function FoodCategory({
  name, foodItems, renderItem,
}: FoodCategoryProps) {
  const id = makeId(name);
  return (
    <Col id={id} className="food-category">
      <div className="label">
        {name}
      </div>
      <Row>
        <ul>
          {foodItems.map(renderItem)}
        </ul>
      </Row>
    </Col>
  );
}

export default FoodCategory;
