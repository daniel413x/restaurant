import React, {
  useState, useEffect, useContext,
} from 'react';
import {
  Container,
  Col, Row,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import List from '../components/List';
import FoodCategory from '../components/FoodCategory';
import FoodItem from '../components/FoodItem';
import AddItem from '../components/modals/AddItem';
import { IFoodItem, ICategory } from '../types/types';
import { makeId } from '../utils/functions';
import { fetchAndSortCategories } from '../http/categoryAPI';
import { red } from '../utils/consts';

interface CategoryAnchorProps {
  categoryName: string;
}

function CategoryAnchor({ categoryName }: CategoryAnchorProps) {
  const id = makeId(categoryName);
  return <a className="side-col-menu" href={`#${id}`}>{categoryName}</a>;
}

function Menu() {
  const { categories, notifications } = useContext(Context);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addedItem, setAddedItem] = useState<IFoodItem>();
  const handleModal = (item: IFoodItem) => {
    setAddedItem(item);
    setShowModal(true);
  };
  useEffect(() => {
    (async () => {
      try {
        await fetchAndSortCategories(categories, true);
      } catch (error: any) {
        notifications.message(
          `${error.response.data.message}`,
          red,
        );
      }
    })();
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
            items={categories.sortedPublic}
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
            items={categories.sortedPublic}
            renderList={(category: ICategory) => {
              if (category.name === 'Uncategorized') {
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
                        <button
                          onClick={() => handleModal(foodItem)}
                          type="button"
                          id={`${makeId(foodItem.name)}-button-overlay`}
                        >
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
