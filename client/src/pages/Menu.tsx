import React, {
  useState, useEffect, useContext,
} from 'react';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import Context from '../context/context';
import useKeyPress from '../hooks/useKeyPress';
import List from '../components/List';
import FoodCategory from '../components/FoodCategory';
import FoodItem from '../components/FoodItem';
import FoodItemLi from '../components/FoodItemLi';
import AddItem from '../components/modals/AddItem';
import { IFoodItem, IFoodCategory } from '../types/types';
import { makeId } from '../utils/functions';
import { categoriesPlaceholders } from '../utils/consts';

interface CategoryAnchorProps {
  categoryName: string;
}

function CategoryAnchor({ categoryName }: CategoryAnchorProps) {
  const id = makeId(categoryName);
  return <li><a href={`#${id}`}>{categoryName}</a></li>;
}

function Menu() {
  const { categories } = useContext(Context);
  const { keyPressed } = useKeyPress('Enter');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addedItem, setAddedItem] = useState<IFoodItem>({});
  const handleModal = (item: IFoodItem) => {
    setAddedItem(item);
    setShowModal(true);
  };
  useEffect(() => {
    categories.setCategories(categoriesPlaceholders);
  }, []);
  return (
    <Container id="menu">
      <AddItem
        show={showModal}
        onHide={() => setShowModal(false)}
        foodItem={addedItem}
      />
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          {/* filter by ingredients: any ingredient added to the db such that you can make a checkbox filter list */}
          <List
            items={categories.all}
            renderList={(category) => (
              <CategoryAnchor
                categoryName={category.name}
              />
            )}
          />
        </Col>
        <Col className="right-col">
          <List
            items={categoriesPlaceholders}
            renderList={(category: IFoodCategory) => (
              <FoodCategory
                name={category.name}
                foodItems={category.foodItems}
                renderItem={(foodItem: IFoodItem) => (
                  <FoodItemLi
                    onClick={() => handleModal(foodItem)}
                    enterPress={keyPressed}
                  >
                    <FoodItem
                      image={foodItem.image}
                      name={foodItem.name}
                      ingredients={foodItem.ingredients}
                      price={foodItem.price}
                      time={foodItem.time}
                      serves={foodItem.serves}
                      discount={foodItem.discount}
                    />
                  </FoodItemLi>
                )}
              />
            )}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Menu;
