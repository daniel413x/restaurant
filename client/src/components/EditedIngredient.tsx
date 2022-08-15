import React from 'react';
import {
  Col,
  Row,
  Button,
} from 'react-bootstrap';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface EditedIngredientProps {
  ingredient: string;
  deleteIngredient: (name: string) => void;
}

function EditedIngredient({
  ingredient,
  deleteIngredient,
}: EditedIngredientProps) {
  return (
    <Row className="edited-ingredient" id={`ingredient-${ingredient}`}>
      <Col className="name" md="auto">
        {ingredient}
      </Col>
      <Col className="spacer" />
      <Col className="icon-buttons" md="auto">
        <Button
          id={`delete-ingredient-${ingredient}`}
          className="btn btn-secondary"
          onClick={() => deleteIngredient(ingredient)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </Col>
    </Row>
  );
}

export default EditedIngredient;
