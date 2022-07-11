import React, { FormEvent } from 'react';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import { IModalProps } from '../../types/types';

interface ConfirmationProps extends IModalProps {
  header?: string;
  body?: string;
  onConfirmFunc?: (args?: any[]) => void;
}

function Confirmation({
  onHide,
  show,
  header,
  body,
  onConfirmFunc,
}: ConfirmationProps) {
  const onOk = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <Form onSubmit={onOk}>
          <Button type="submit">
            OK
          </Button>
        </Form>
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
