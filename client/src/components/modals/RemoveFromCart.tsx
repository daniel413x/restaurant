import React, {
  useContext,
  FormEvent,
} from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { IModalProps } from '../../types/types';
import {
  shortNotification,
  green,
} from '../../utils/consts';
import Context from '../../context/context';
import { removeFoodItem } from '../../http/cartAPI';

interface RemoveFromCartProps extends IModalProps {
  itemName: string | undefined;
  itemId: string | undefined;
}

function RemoveFromCart({
  onHide,
  show,
  itemName,
  itemId,
}: RemoveFromCartProps) {
  const { notifications, cart } = useContext(Context);
  const action = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await removeFoodItem(itemId!);
    cart.changeItemQuantity(itemId!, 0);
    notifications.message(
      'Item removed from cart',
      green,
      shortNotification,
    );
    onHide();
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="remove-item"
    >
      <Form onSubmit={action}>
        <Modal.Body>
          <h2>
            Remove from cart?
          </h2>
          {itemName}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Confirm</Button>
          <Button onClick={onHide}>Back</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RemoveFromCart;
