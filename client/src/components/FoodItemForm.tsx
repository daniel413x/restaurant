import React, {
  useContext,
  useState,
  useEffect,
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
import { observer } from 'mobx-react-lite';
import Context from '../context/context';
import {
  ICategory,
  IFoodItem,
} from '../types/types';
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
import SmartInput from './SmartInput';
import { createFoodItem, editFoodItem, fetchOneFoodItem } from '../http/foodItemInMenuAPI';

interface FoodItemFormProps {
  foodItem?: IFoodItem,
  creatingForCategoryId?: string;
  closeModalOnSubmit?: () => void;
}

function FoodItemForm({
  foodItem,
  creatingForCategoryId,
  closeModalOnSubmit,
}: FoodItemFormProps) {
  const { categories, notifications } = useContext(Context);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [category, setCategory] = useState<Omit<ICategory, 'foodItems' | 'public'>>();
  const [name, setName] = useState<string>(foodItem?.name || '');
  const [discount, setDiscount] = useState<number>(Number(foodItem?.discount) || 0);
  const [price, setPrice] = useState<number>(Number(foodItem?.price) || 3);
  const previousPrice = foodItem?.price || 0;
  const userChangedPrice = !foodItem ? null : Number(calcItemPrice(price, discount)) !== Number(calcItemPrice(previousPrice, foodItem?.discount));
  const showPreviousPrice = userChangedPrice && foodItem;
  // const difference = Number(calcItemPrice(price, discount)) - Number(calcItemPrice(previousPrice, discount));
  const [image, setImage] = useState<File | string>(foodItem?.image || '');
  const [ingredients, setIngredients] = useState<string[]>(foodItem?.ingredients || []);
  const [newIngredients, setNewIngredients] = useState<string>('');
  const [serves, setServes] = useState<number>(foodItem?.serves || 1);
  const [time, setTime] = useState<[number, number]>(foodItem?.time || [10, 15]);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const submitDelete = () => {
    notifications.message(
      'Category deleted',
      red,
      shortNotification,
    );
  };
  const addIngredient = () => {
    const newIngredientsArr = newIngredients.split(/,\s+|\s+,|,/).filter(Boolean);
    newIngredientsArr.forEach((c) => c.split('').filter(Boolean).join(''));
    for (let newIngredient = 0; newIngredient < newIngredientsArr.length; newIngredient += 1) {
      for (let previousIngredient = 0; previousIngredient < ingredients.length; previousIngredient += 1) {
        if (ingredients[previousIngredient] === newIngredientsArr[newIngredient]) {
          return notifications.message(
            'Ingredient already exists; check input',
            red,
            shortNotification,
          );
        }
      }
    }
    setNewIngredients('');
    return setIngredients([...ingredients, ...newIngredientsArr.filter((c) => !/[^\S]+\s+[^\S]+/.test(c))]);
  };
  // const showPercent = (number: number) => number * 100;
  const deleteIngredient = (ingredient: string) => setIngredients(ingredients?.filter((ingredientName) => ingredient !== ingredientName));
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    if (!name || !image) {
      notifications.message(
        'Please complete highlighted fields',
        red,
        shortNotification,
      );
      return;
    }
    const foodItemForm = new FormData();
    foodItemForm.append('name', name);
    foodItemForm.append('CategoryId', category!.id);
    foodItemForm.append('discount', JSON.stringify(discount));
    foodItemForm.append('price', JSON.stringify(price));
    foodItemForm.append('imgImage', image);
    foodItemForm.append('ingredients', JSON.stringify(ingredients));
    foodItemForm.append('serves', JSON.stringify(serves));
    foodItemForm.append('time', JSON.stringify(time));
    try {
      if (foodItem) {
        // PUT
        await editFoodItem(foodItem.id, foodItemForm);
        const updatedFoodItem = await fetchOneFoodItem(foodItem.id);
        const previousCategoryId = foodItem.CategoryId;
        if (category!.id !== previousCategoryId) {
          categories.updateFoodItem(updatedFoodItem, previousCategoryId);
        } else {
          categories.updateFoodItem(updatedFoodItem);
        }
        notifications.message(
          'Food item updated successfully',
          green,
          shortNotification,
        );
      } else {
        // POST
        const newFoodItem = await createFoodItem(foodItemForm);
        categories.addFoodItem(newFoodItem);
        notifications.message(
          'Food item created successfully',
          green,
          shortNotification,
        );
      }
      if (closeModalOnSubmit) {
        closeModalOnSubmit();
      }
    } catch (error: any) {
      notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  useEffect(() => {
    const presetCategory = categories.all.find((cat) => {
      if (foodItem) {
        return cat.id === foodItem.CategoryId;
      }
      if (creatingForCategoryId) {
        return cat.id === creatingForCategoryId;
      }
      return cat.name === 'Uncategorized';
    });
    setCategory(presetCategory);
  }, [foodItem]);
  return (
    <Col className="food-item-form">
      <Confirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmFunc={submitDelete}
        header={`Delete category "${name}"?`}
        body={`Food items under category "${name}" will need to be assigned a new category before they appear in the menu.`}
      />
      <Form onSubmit={submit}>
        <Row className="col-wrapper">
          <Col className="image-col" md="auto">
            <Col>
              <Col className="label image-col-label">
                Image
              </Col>
              <Col>
                <UploadImage
                  pressedSubmit={pressedSubmit}
                  setPressedSubmit={setPressedSubmit}
                  dimensions={[650, 480]}
                  existingImage={foodItem?.image ? `${process.env.REACT_APP_API_URL}${foodItem.image}` : ''}
                  onChangeSetOutsideFormValue={setImage}
                  outsideFormValue={image}
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
                <Dropdown.Toggle
                  id="select-category-dropdown"
                >
                  {category?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.all.map((categoryItem) => (
                    <Dropdown.Item
                      key={categoryItem.id}
                    >
                      <Button
                        onClick={() => setCategory({
                          name: categoryItem.name,
                          id: categoryItem.id,
                        })}
                      >
                        {categoryItem.name}
                        {categoryItem.name === 'Uncategorized' && '/hidden'}
                      </Button>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Col className="label">
                Name
              </Col>
              <SmartInput
                id="name-field"
                pressedSubmit={pressedSubmit}
                setPressedSubmit={setPressedSubmit}
                value={name}
                onChange={setName}
              />
            </Col>
            <Col className="price-control">
              <Row>
                <Col>
                  <Col className="label">
                    Price
                  </Col>
                  <Form.Control
                    id="price-field"
                    value={price}
                    type="number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
                    min={0}
                  />
                </Col>
                <Col>
                  <Col className="label">
                    Discount
                  </Col>
                  <Form.Control
                    id="discount-field"
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
                {showPreviousPrice && (
                <span className="previous-price">
                  {`$${previousPrice}`}
                </span>
                )}
                {showPreviousPrice && (
                <span>
                  →
                </span>
                )}
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
                id="ingredients-ul"
                items={ingredients}
                renderList={(ingredient) => (
                  <li key={ingredient}>
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
                    id="ingredient-field"
                    value={newIngredients}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewIngredients(e.target.value)}
                    placeholder="ingr.1, ingr.2, ..."
                  />
                </Col>
                <Col md="auto">
                  <Button
                    id="new-ingredient-button"
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
                  id="serves-field"
                  value={serves}
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setServes(Number(e.target.value))}
                  min={1}
                />
              </Col>
              <Col>
                <Col className="label">
                  Time (min, max)
                </Col>
                <Row>
                  <Col className="min-col">
                    <Form.Control
                      id="min-field"
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
                      id="max-field"
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
              <Button
                className="save-button btn btn-secondary"
                id="submit-button"
                type="submit"
              />
              {/* use pseudo selector for label */}
            </Col>
          </Col>
        </Row>
      </Form>
    </Col>
  );
}

FoodItemForm.defaultProps = {
  foodItem: false,
  creatingForCategoryId: false,
  closeModalOnSubmit: false,
};

export default observer(FoodItemForm);
