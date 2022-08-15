import React, {
  useState,
  useContext,
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import {
  shortNotification,
  green,
  red,
} from '../../utils/consts';
import {
  IModalProps,
  IFoodItem,
  QueryReqCartFoodItem,
  OrderOrCartFoodItem,
} from '../../types/types';
import FoodItemAuxiliary from '../FoodItemAuxiliary';
import Context from '../../context/context';
import { addFoodItem } from '../../http/foodItemInCartAPI';

interface AddItemProps extends IModalProps {
  foodItem: IFoodItem;
}

function AddItem({
  onHide,
  show,
  foodItem,
}: AddItemProps) {
  const { user, cart, notifications } = useContext(Context);
  const [quantity, setQuantity] = useState<number>(1);
  const [instructions, setInstructions] = useState<string>('');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const CartId = cart.id;
    const baseAddedFoodItem = {
      name: foodItem.name,
      price: foodItem.price,
      discount: foodItem.discount,
      time: foodItem.time,
      ingredients: foodItem.ingredients,
      quantity,
      instructions,
    };
    try {
      if (user.isGuest) {
        const guestAddedItem: OrderOrCartFoodItem = {
          ...baseAddedFoodItem,
          id: new Date().toString(),
        };
        localStorage.setItem('guestCartItems', JSON.stringify([...cart.foodItems, guestAddedItem]));
        cart.addItem(guestAddedItem);
      } else {
        const registeredUserAddedItem: QueryReqCartFoodItem = {
          ...baseAddedFoodItem,
          CartId,
        };
        cart.addItem(await addFoodItem(registeredUserAddedItem));
      }
      notifications.message(
        `Added to cart ${foodItem.name}`,
        green,
        shortNotification,
        foodItem.image,
      );
      setInstructions('');
      setTimeout(() => setQuantity(1), 500);
      onHide();
    } catch (error: any) {
      notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="add-item"
    >
      <Form onSubmit={submit}>
        <Modal.Body>
          <h2>
            Add to cart?
          </h2>
          <FoodItemAuxiliary
            foodItem={foodItem}
            quantity={quantity}
            increment={() => setQuantity(quantity + 1)}
            decrement={() => setQuantity(quantity - 1)}
          />
          Instructions:
          <Form.Control
            id="instructions-field"
            as="textarea"
            value={instructions}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInstructions(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button id="submit-button" type="submit">Add</Button>
          <Button id="back-button" onClick={onHide}>Back</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddItem;
