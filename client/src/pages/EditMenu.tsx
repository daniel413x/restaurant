import React from 'react';
import {
  Container,
  Col,
} from 'react-bootstrap';
import SortAndEditCategories from '../components/SortAndEditCategories';

function EditMenu() {
  return (
    <Container id="edit-menu">
      <Col>
        <h2>
          Edit menu
        </h2>
        <SortAndEditCategories />
      </Col>
    </Container>
  );
}

export default EditMenu;
