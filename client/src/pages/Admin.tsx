import React from 'react';
import {
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  adminRoutes,
  ADMIN_ORDERS_ROUTE,
  ADMIN_INDEX_ROUTE,
  MENU_ROUTE,
} from '../utils/consts';
import AppRouter from '../routers/AppRouter';

function Admin() {
  return (
    <Container id="admin">
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          <NavLink className="btn btn-primary" to={ADMIN_INDEX_ROUTE}>
            Index
          </NavLink>
          <NavLink className="btn btn-primary" to={ADMIN_ORDERS_ROUTE}>
            Orders (2)
          </NavLink>
          <NavLink className="btn btn-primary" to={MENU_ROUTE}>
            Menu
          </NavLink>
        </Col>
        <Col className="right-col">
          <AppRouter
            authedRoutes={adminRoutes}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
