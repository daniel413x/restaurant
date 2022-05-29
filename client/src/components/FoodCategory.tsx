import React, { ReactNode } from 'react';
import {
  Col, Row,
} from 'react-bootstrap';
import { IFoodItem, IFoodCategory } from '../types/types';
import { makeId } from '../utils/functions';

interface FoodCategoryProps {
  renderItem: (item: IFoodItem) => ReactNode;
  category: IFoodCategory;
}

function FoodCategory({
  category, renderItem,
}: FoodCategoryProps) {
  const {
    name,
    foodItems,
  } = category;
  const hrefId = makeId(name);
  return (
    <Col id={hrefId} className="food-category">
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
