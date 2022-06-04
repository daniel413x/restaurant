/* eslint-disable */

import React, {
  useContext,
  useState,
  ChangeEvent,
  useRef,
  useEffect,
} from 'react';
import {
  Row,
  Col,
  Button,
  Image,
  Form,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleDown,
  faBan,
  faPenToSquare,
  faTrashAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Context from '../context/context';
import { IFoodCategory, IFoodItem } from '../types/types';
import List from './List';
import Confirmation from './modals/Confirmation';
import useOnClickOutside from '../hooks/useOnOutsideClick';
import {
  green,
  shortNotification,
} from '../utils/consts';
import { calcItemPrice } from '../utils/functions';

interface FoodItemProps {
  foodItem: IFoodItem;
  selectFoodItemToEdit: (obj: IFoodItem) => void;
  selectFoodItemToDelete: (foodItem: IFoodItem) => void;
}

function FoodItem({
  foodItem,
  selectFoodItemToEdit,
  selectFoodItemToDelete,
}: FoodItemProps) {
  const {
    image,
    name,
    price,
    discount,
  } = foodItem;
  let discountedPrice;
  if (discount) {
    discountedPrice = calcItemPrice(price, discount);
  }
  return (
    <Row className="food-item">
      <Image src={image} />
      <span className="name">
        {name}
      </span>
      <Col className="info">
        <span>
          {`$${price}`}
        </span>
        <span>
          {discount ? `${discount * 100}% discount` : 'No active discount'}
        </span>
        <span>
          &rarr;
          {`$${discountedPrice}`}
        </span>
      </Col>
      <Row className="buttons-row">
        <Col>
          <Button className="btn btn-secondary" onClick={() => selectFoodItemToEdit(foodItem)}>
            Edit
          </Button>
        </Col>
        <Col md="auto" className="icon-buttons">
          <Button
            className="btn btn-secondary"
            onClick={() => selectFoodItemToDelete(foodItem)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </Col>
      </Row>
    </Row>
  );
}

interface CategoryProps {
  category: IFoodCategory;
  selectFoodItemToEdit: (obj: IFoodItem) => void;
}

function EditedCategory({
  category,
  selectFoodItemToEdit,
}: CategoryProps) {
  const {
    name,
    foodItems,
    id,
  } = category;
  const { categories, notifications } = useContext(Context);
  const [expand, setExpand] = useState(false);
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState<boolean>(false);
  const [showDeleteFoodItemModal, setShowDeleteFoodItemModal] = useState<boolean>(false);
  const [deletedFoodItem, setDeletedFoodItem] = useState<IFoodItem>();
  const [newName, setNewName] = useState<string>(name);
  const uncategorizedCategory = id === -1;
  const submitNewName = () => {
    if (newName === category.name) {
      return setActive(false);
    }
    categories.setNewName(id, newName);
    setActive(false);
    notifications.message(
      'Category name updated',
      green,
      shortNotification,
    );
  };
  const submitDeleteCategory = () => {
    categories.deleteCategory(category);
    notifications.message(
      'Category deleted',
      green,
      shortNotification,
    );
  };
  const selectFoodItemToDelete = (foodItem: IFoodItem) => {
    setDeletedFoodItem(foodItem);
    setShowDeleteFoodItemModal(true);
  };
  const submitDeleteFoodItem = (id: number) => {
    categories.deleteFoodItem(id, category.id);
    notifications.message(
      'Item deleted successfully',
      green,
      shortNotification,
    );
  };
  const toggleExpand = () => {
    setExpand(!expand);
  };
  const toggleEditTitle = () => {
    setActive(!active);
    if (expand) {
      setExpand(false);
    }
  };
  useEffect(() => {
    if (active) {
      focusRef.current?.focus();
    } else {
      setActive(false);
      setNewName(name);
    }
  }, [active]);
  useOnClickOutside(outsideClickRef, () => setActive(false));
  return (
    <div className={`category admin-item ${active && 'active'}`} ref={outsideClickRef}>
      <Confirmation
        show={showDeleteCategoryModal}
        onHide={() => setShowDeleteCategoryModal(false)}
        onConfirmFunc={submitDeleteCategory}
        header={`Delete category "${name}"?`}
        body={`Food items under category "${name}" will need to be assigned a new category before they appear in the menu.`}
      />
      {deletedFoodItem && <Confirmation
        show={showDeleteFoodItemModal}
        onHide={() => setShowDeleteFoodItemModal(false)}
        onConfirmFunc={() => submitDeleteFoodItem(deletedFoodItem.id)}
        header={`Delete food item "${deletedFoodItem.name}"?`}
      />}
      <Form className="title-buttons-row">
        <Col className="title" md="auto">
          <Form.Control
            ref={focusRef}
            value={active ? newName : name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
            className={`${!active && !expand && 'disabled-2'}`}
          />
        </Col>
        <Col className="icon-buttons" md="auto">
          {uncategorizedCategory ? (
        <Col className="icon-buttons" md="auto">
            <Button onClick={toggleExpand}>
              <FontAwesomeIcon icon={faChevronCircleDown} />
            </Button>
        </Col>
          ) : (
            <Col className="icon-buttons" md="auto">
          {!active && (
            <Button onClick={toggleExpand}>
              <FontAwesomeIcon icon={faChevronCircleDown} />
            </Button>
          )}
          {active && (
          <Button onClick={() => setActive(false)} title="Cancel">
            <FontAwesomeIcon icon={faBan} />
          </Button>
          )}
          {!active ? (
            <Button onClick={toggleEditTitle} title="Edit">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          ) : (
            <Button onClick={submitNewName} title="Save">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          )}
          <Button className={`${active && 'disabled-2'}`} onClick={() => setShowDeleteCategoryModal(true)} title="Delete">
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
          </Col>)}
        </Col>
      </Form>
      {expand && <div className="divider" />}
      <List
        className={`food-items-list ${expand && 'expand'}`}
        items={foodItems}
        renderList={(foodItem: IFoodItem) => (
          <li>
            <FoodItem
              foodItem={foodItem}
              selectFoodItemToEdit={selectFoodItemToEdit}
              selectFoodItemToDelete={selectFoodItemToDelete}
            />
          </li>
        )}
      />
    </div>
  );
}

export default observer(EditedCategory);
