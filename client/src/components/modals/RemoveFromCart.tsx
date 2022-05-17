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

interface RemoveFromCartProps extends IModalProps {
  onHide: () => void;
  show: boolean;
  itemName?: string;
}

function RemoveFromCart({
  onHide,
  show,
  itemName,
}: RemoveFromCartProps) {
  const { notifications } = useContext(Context);
  const action = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // axios, delete from context, etc
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

RemoveFromCart.defaultProps = {
  itemName: 'deletedItem',
};

export default RemoveFromCart;
