import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { IModalProps } from '../../types/types';
import FoodItemForm from '../FoodItemForm';

interface CreateFoodItemProps extends IModalProps {
  categoryId?: string;
}

function CreateFoodItem({
  onHide,
  show,
  categoryId,
}: CreateFoodItemProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      id="create-food-item"
    >
      <Modal.Header>
        <h2>
          Create food item
        </h2>
      </Modal.Header>
      <Modal.Body>
        <FoodItemForm
          closeModalOnSubmit={onHide}
          creatingForCategoryId={categoryId}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Back</Button>
      </Modal.Footer>
    </Modal>
  );
}

CreateFoodItem.defaultProps = {
  categoryId: false,
};

export default CreateFoodItem;
