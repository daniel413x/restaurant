import React, {
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from 'react';
import {
  Row,
  Col,
  Button,
  Image,
  Form,
  Dropdown,
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faTrashAlt,
  faCheck,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import Context from '../context/context';
import { ICategory, IFoodItem } from '../types/types';
import List from './List';
import Confirmation from './modals/Confirmation';
import useOnClickOutside from '../hooks/useOnOutsideClick';
import CreateNewFoodItemButton from './CreateNewFoodItemButton';
import {
  green,
  red,
  shortNotification,
} from '../utils/consts';
import { calcItemPrice } from '../utils/functions';
import { deleteCategory, editCategory } from '../http/categoryAPI';
import { deleteFoodItem } from '../http/foodItemInMenuAPI';

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
    <Col className="food-item">
      <Image src={`${process.env.REACT_APP_API_URL}${image}`} />
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
          {discount ? `$${discountedPrice}` : `$${price}`}
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
    </Col>
  );
}

interface CategoryProps {
  category: ICategory;
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
  const uncategorizedCategory = name === 'Uncategorized';
  const submitNewName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName === category.name) {
      return setActive(false);
    }
    try {
      await editCategory(id, newName);
      categories.setNewName(id, newName);
      setActive(false);
      return notifications.message(
        'Category name updated',
        green,
        shortNotification,
      );
    } catch (error: any) {
      return notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  const submitDeleteCategory = async () => {
    try {
      await deleteCategory(id);
      categories.deleteCategory(category);
      notifications.message(
        'Category deleted',
        green,
        shortNotification,
      );
    } catch (error: any) {
      notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  const selectFoodItemToDelete = (foodItem: IFoodItem) => {
    setDeletedFoodItem(foodItem);
    setShowDeleteFoodItemModal(true);
  };
  const submitDeleteFoodItem = async (deletedId: string) => {
    await deleteFoodItem(deletedId);
    categories.deleteFoodItem(deletedId, category.id);
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
      {deletedFoodItem && (
      <Confirmation
        show={showDeleteFoodItemModal}
        onHide={() => setShowDeleteFoodItemModal(false)}
        onConfirmFunc={() => submitDeleteFoodItem(deletedFoodItem.id)}
        header={`Delete food item "${deletedFoodItem.name}"?`}
        body={`Food item "${deletedFoodItem.name}" will be deleted.`}
      />
      )}
      <Form className="title-buttons-row body" onSubmit={submitNewName}>
        <Col className="tab-col" md="auto">
          <Form.Control
            ref={focusRef}
            value={active ? newName : name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
            className={`${!active && !expand && 'disabled-2'}`}
          />
        </Col>
        {active ? (
          <Col className="icon-buttons" md="auto">
            <Button type="submit" title="Save">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button onClick={() => setActive(false)} title="Cancel">
              <FontAwesomeIcon icon={faBan} />
            </Button>
          </Col>
        ) : (
          <Col className="ellipsis-menu" md="auto">
            <Dropdown autoClose>
              <Dropdown.Toggle>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Button onClick={toggleExpand}>
                    {expand ? 'Collapse' : 'Expand'}
                  </Button>
                </Dropdown.Item>
                {!uncategorizedCategory && (
                <Dropdown.Item>
                  <Button onClick={toggleEditTitle}>
                    Re-title
                  </Button>
                </Dropdown.Item>
                )}
                {!uncategorizedCategory && (
                <Dropdown.Item>
                  <Button onClick={() => setShowDeleteCategoryModal(true)}>
                    Delete
                  </Button>
                </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        )}
      </Form>
      {expand && <div className="divider" />}
      <List
        className={`food-items-list ${expand && 'expand'}`}
        items={foodItems}
        renderList={(foodItem: IFoodItem) => (
          <li key={foodItem.id}>
            <FoodItem
              foodItem={foodItem}
              selectFoodItemToEdit={selectFoodItemToEdit}
              selectFoodItemToDelete={selectFoodItemToDelete}
            />
          </li>
        )}
      >
        <li>
          <CreateNewFoodItemButton
            categoryId={id}
          />
        </li>
      </List>
    </div>
  );
}

export default observer(EditedCategory);
