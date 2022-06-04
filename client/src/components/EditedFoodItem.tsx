import React, {
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  Col,
  Row,
  Button,
  Form,
  Dropdown,
} from 'react-bootstrap';
import Context from '../context/context';
import { IFoodItem } from '../types/types';
import {
  green,
  red,
  shortNotification,
} from '../utils/consts';
import Confirmation from './modals/Confirmation';
import UploadImage from './UploadImage';
import { calcItemPrice } from '../utils/functions';
import List from './List';
import EditedIngredient from './EditedIngredient';

interface EditedFoodItemProps {
  foodItem: IFoodItem,
}

function EditedFoodItem({
  foodItem,
}: EditedFoodItemProps) {
  const { categories, notifications } = useContext(Context);
  const {
    id,
  } = foodItem;
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [category, setCategory] = useState<{ name: string, id: number }>(foodItem.category);
  const [name, setName] = useState<string>(foodItem.name);
  const [discount, setDiscount] = useState<number>(foodItem.discount);
  const [price, setPrice] = useState<number>(foodItem.price);
  const previousPrice = foodItem.price;
  const userChangedPrice = Number(calcItemPrice(price, discount)) !== Number(calcItemPrice(previousPrice, foodItem.discount));
  // const difference = Number(calcItemPrice(price, discount)) - Number(calcItemPrice(previousPrice, discount));
  const [image, setImage] = useState<string>(foodItem.image);
  const [ingredients, setIngredients] = useState<string[]>(foodItem.ingredients);
  const [newIngredients, setNewIngredients] = useState<string>('');
  const [serves, setServes] = useState<number>(foodItem.serves);
  const [time, setTime] = useState<number[]>(foodItem.time);
  const submitDelete = () => {
    notifications.message(
      'Category deleted',
      red,
      shortNotification,
    );
  };
  const addIngredient = () => {
    const newIngredientsArr = newIngredients.split('').filter((c) => c !== ' ').join('').split(',');
    setIngredients([...ingredients, ...newIngredientsArr]);
  };
  // const showPercent = (number: number) => number * 100;
  const deleteIngredient = (ingredient: string) => setIngredients(ingredients?.filter((ingredientName) => ingredient !== ingredientName));
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFoodItem = {
      name,
      discount,
      price,
      image,
      ingredients,
      serves,
      time,
      category,
      id,
    };
    const previousCategoryId = foodItem.category.id;
    if (category.id !== previousCategoryId) {
      categories.updateFoodItem(updatedFoodItem, previousCategoryId);
    } else {
      categories.updateFoodItem(updatedFoodItem);
    }
    notifications.message(
      'Food item updated successfully',
      green,
      shortNotification,
    );
  };
  return (
    <Col className="edited-food-item">
      <Confirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmFunc={submitDelete}
        header={`Delete category "${name}"?`}
        body={`Food items under category "${name}" will need to be assigned a new category before they appear in the menu.`}
      />
      <Form onSubmit={submit}>
        <Row>
          <Col md="auto">
            <Col>
              <Col className="label left-col-label">
                Image
              </Col>
              <Col>
                <UploadImage
                  dimensions={[650, 480]}
                  existingImage={image}
                  onChangeSetStrOutside={(str: string) => setImage(str)}
                />
              </Col>
            </Col>
          </Col>
          <Col className="info-col">
            <Col className="category-menu">
              <Col className="label">
                Category
              </Col>
              <Dropdown>
                <Dropdown.Toggle>
                  {category?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.all.map((categoryItem) => (
                    <Dropdown.Item onClick={() => setCategory({
                      name: categoryItem.name,
                      id: categoryItem.id,
                    })}
                    >
                      {categoryItem.name}
                      {categoryItem.name === 'Uncategorized' && '/hidden'}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Col className="label">
                Name
              </Col>
              <Form.Control
                value={name}
                name="name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
            </Col>
            <Col className="price-control">
              <Row>
                <Col>
                  <Col className="label">
                    Price
                  </Col>
                  <Form.Control
                    value={price}
                    type="number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                  />
                </Col>
                <Col>
                  <Col className="label">
                    Discount
                  </Col>
                  <Form.Control
                    value={discount}
                    type="number"
                    max="1"
                    step="0.05"
                    min="0"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDiscount(Number(e.target.value))}
                  />
                </Col>
              </Row>
              <Col className="calculated-price">
                {userChangedPrice && (
                <span className="previous-price">
                  {`$${previousPrice}`}
                </span>
                )}
                {userChangedPrice && '→'}
                <span>
                  {`$${calcItemPrice(price, discount)}`}
                </span>
              </Col>
            </Col>
            <Col className="ingredients">
              <Col className="label">
                Ingredients
              </Col>
              {ingredients && (
              <List
                items={ingredients}
                renderList={(ingredient) => (
                  <li>
                    <EditedIngredient
                      ingredient={ingredient}
                      deleteIngredient={deleteIngredient}
                    />
                  </li>
                )}
              />
              )}
              <Row className="add-ingredient-row">
                <Col>
                  <Form.Control
                    value={newIngredients}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewIngredients(e.target.value)}
                    placeholder="ingr.1, ingr.2, ..."
                  />
                </Col>
                <Col md="auto">
                  <Button
                    className="btn btn-secondary"
                    onClick={addIngredient}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Col>
            <Row className="serves-time-row">
              <Col>
                <Col className="label">
                  Serves
                </Col>
                <Form.Control
                  value={serves}
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setServes(Number(e.target.value))}
                />
              </Col>
              <Col>
                <Col className="label">
                  Time (min, max)
                </Col>
                <Row>
                  <Col className="min-col">
                    <Form.Control
                      className="min"
                      min="0"
                      max={time[1]}
                      value={time[0]}
                      type="number"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setTime([Number(e.target.value), time[1]])}
                    />
                  </Col>
                  <Col className="max-col">
                    <Form.Control
                      className="max"
                      min={time[0]}
                      value={time[1]}
                      type="number"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setTime([time[0], Number(e.target.value)])}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Col>
              <Button className="save-button btn btn-secondary" type="submit">
                Save
              </Button>
            </Col>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}

export default EditedFoodItem;
