import React from 'react';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import {
  NavLink,
} from 'react-router-dom';
import {
  ACCOUNT_DETAILS_ROUTE,
  ORDERS_ROUTE,
} from '../utils/consts';
import AppRouter from '../routers/AppRouter';
import { accountRoutes } from '../paths/paths';

function Account() {
  return (
    <Container id="account">
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          <NavLink className="btn btn-primary" to={ORDERS_ROUTE}>
            Your orders
          </NavLink>
          <NavLink className="btn btn-primary" to={ACCOUNT_DETAILS_ROUTE}>
            Account details
          </NavLink>
        </Col>
        <Col className="right-col">
          <AppRouter
            authedRoutes={accountRoutes}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
