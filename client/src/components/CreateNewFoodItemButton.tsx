import React, {
  useState,
} from 'react';
import {
  Row,
  Col,
  Button,
  Image,
} from 'react-bootstrap';
import CreateFoodItem from './modals/CreateFoodItem';
import createNewFoodItem from '../assets/create-new-food-item.png';

interface CreateNewFoodItemButtonProps {
  categoryId: string; // necessary evil to pre-select category in modal dropdown
}

function CreateNewFoodItemButton({ categoryId }: CreateNewFoodItemButtonProps) {
  const [showCreateFoodItemModal, setShowCreateFoodItemModal] = useState<boolean>(false);
  return (
    <Col className="add-food-item-button food-item">
      <CreateFoodItem
        show={showCreateFoodItemModal}
        categoryId={categoryId}
        onHide={() => setShowCreateFoodItemModal(false)}
      />
      <Button className="button-wrapper" onClick={() => setShowCreateFoodItemModal(true)} />
      <Image className="img-outline" src={createNewFoodItem} />
      <Col className="middle-col">
        <span className="name">
          New Food Item
        </span>
      </Col>
      <Row className="buttons-row">
        <Col>
          <Button className="edit-button-outline btn btn-secondary" tabIndex={-1} />
        </Col>
        <Col className="icon-buttons" md="auto">
          <Button className="delete-button-outline btn btn-secondary" tabIndex={-1} />
        </Col>
      </Row>
    </Col>
  );
}

export default CreateNewFoodItemButton;
