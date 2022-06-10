import React, {
  useState, useEffect, useContext,
} from 'react';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import List from '../components/List';
import FoodCategory from '../components/FoodCategory';
import FoodItem from '../components/FoodItem';
import AddItem from '../components/modals/AddItem';
import { IFoodItem, IFoodCategory } from '../types/types';
import { makeId } from '../utils/functions';
import { categoriesPlaceholders } from '../utils/consts';

interface CategoryAnchorProps {
  categoryName: string;
}

function CategoryAnchor({ categoryName }: CategoryAnchorProps) {
  const id = makeId(categoryName);
  return <a href={`#${id}`}>{categoryName}</a>;
}

function Menu() {
  const { categories } = useContext(Context);
  const [categoryItems, setCategoryItems] = useState<IFoodCategory[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addedItem, setAddedItem] = useState<IFoodItem>();
  const handleModal = (item: IFoodItem) => {
    setAddedItem(item);
    setShowModal(true);
  };
  useEffect(() => {
    categories.setCategories(categoriesPlaceholders);
    setCategoryItems(categoriesPlaceholders);
  }, []);
  return (
    <Container id="menu">
      {addedItem && (
        <AddItem
          show={showModal}
          onHide={() => setShowModal(false)}
          foodItem={addedItem}
        />
      )}
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          {/* filter by ingredients: any ingredient added to the db such that you can make a checkbox filter list */}
          <List
            items={categories.all}
            renderList={(category) => (
              <li
                key={category.id}
              >
                <CategoryAnchor
                  categoryName={category.name}
                />
              </li>
            )}
          />
        </Col>
        <Col className="right-col">
          <List
            items={categoryItems}
            renderList={(category: IFoodCategory) => {
              if (category.id === -1 || category.name === 'Uncategorized') {
                return null;
              }
              return (
                <li
                  key={category.id}
                >
                  <FoodCategory
                    category={category}
                    renderItem={(foodItem: IFoodItem) => (
                      <li
                        className="food-item-li"
                        key={foodItem.id}
                      >
                        <button onClick={() => handleModal(foodItem)} type="button">
                          <FoodItem
                            foodItem={foodItem}
                          />
                        </button>
                      </li>
                    )}
                  />
                </li>
              );
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Menu);
