import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { IModalProps } from '../../types/types';

interface ConfirmationProps extends IModalProps {
  header?: string;
  body?: string;
  onConfirmFunc?: () => void;
}

function Confirmation({
  onHide,
  show,
  header,
  body,
  onConfirmFunc,
}: ConfirmationProps) {
  const onOk = () => {
    if (onConfirmFunc) {
      onConfirmFunc();
    }
    onHide();
  };
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
          {header}
        </h2>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onOk}>
          OK
        </Button>
        {onConfirmFunc && (
          <Button onClick={onHide}>
            Cancel
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

Confirmation.defaultProps = {
  header: '',
  body: '',
  onConfirmFunc: false,
};

export default Confirmation;
