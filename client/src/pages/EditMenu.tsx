import React from 'react';
import {
  Container,
  Col,
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SortAndEditCategories from '../components/SortAndEditCategories';

function EditMenu() {
  const { pathname } = useLocation();
  const isDemo = pathname === '/demo/editmenu';
  const baseJSX = (
    <Container id="edit-menu" className={isDemo ? 'demo' : ''}>
      <Col>
        <h2>
          Edit menu
        </h2>
        <SortAndEditCategories />
      </Col>
    </Container>
  );
  const demoJSX = (
    <div id="admin">
      {baseJSX}
    </div>
  );
  return isDemo ? demoJSX : baseJSX;
}

export default EditMenu;
