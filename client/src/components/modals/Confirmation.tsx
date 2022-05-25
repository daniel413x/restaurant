import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { IModalProps } from '../../types/types';

function Confirmation({
  onHide,
  show,
}: IModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="confirmation"
    >
      <Modal.Body>
        <h2>
          Registration successful!
        </h2>
        Please click &quot;OK&quot; to navigate to the account page, where you can continue tracking your order.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confirmation;
