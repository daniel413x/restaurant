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
import { IModalProps, IFoodItemAbbreviated } from '../../types/types';
import FoodItemAbbreviated from '../FoodItemAbbreviated';
import Context from '../../context/context';

interface AddItemProps extends IModalProps {
  onHide: () => void;
  show: boolean;
  foodItem: IFoodItemAbbreviated;
}

function AddItem({
  onHide,
  show,
  foodItem,
}: AddItemProps) {
  const { notifications } = useContext(Context);
  const [input, setInput] = useState<string>('');
  const action = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notifications.message(
      `Added to cart ${foodItem.name}`,
      green,
      shortNotification,
      foodItem.image,
    );
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Form onSubmit={action}>
        <Modal.Body>
          <h2>
            Add to cart?
          </h2>
          <FoodItemAbbreviated
            name={foodItem.name}
            ingredients={foodItem.ingredients}
            price={foodItem.price}
          />
          Instructions:
          <Form.Control
            as="textarea"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
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
