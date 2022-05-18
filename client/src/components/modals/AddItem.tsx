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
} from '../../utils/consts';
import { IModalProps, IFoodItem } from '../../types/types';
import FoodItemAuxiliary from '../FoodItemAuxiliary';
import Context from '../../context/context';

interface AddItemProps extends IModalProps {
  foodItem: IFoodItem;
}

function AddItem({
  onHide,
  show,
  foodItem,
}: AddItemProps) {
  const { cart, notifications } = useContext(Context);
  const [quantity, setQuantity] = useState<number>(1);
  const [instructions, setInstructions] = useState<string>('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cart.addItem(foodItem, quantity, instructions);
    notifications.message(
      `Added to cart ${foodItem.name}`,
      green,
      shortNotification,
      foodItem.image,
    );
    setInstructions('');
    setTimeout(() => setQuantity(1), 500);
    onHide();
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
            as="textarea"
            value={instructions}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInstructions(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Add</Button>
          <Button onClick={onHide}>Back</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddItem;
