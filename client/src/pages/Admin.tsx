import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Context from '../context/context';
import { fetchAllCategories } from '../http/categoryAPI';
import {
  adminRoutes,
  ADMIN_ORDERS_ROUTE,
  ADMIN_ROUTE,
  MENU_ROUTE,
} from '../utils/consts';
import AppRouter from '../routers/AppRouter';

function Admin() {
  const { categories } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const allCategories = await fetchAllCategories();
      categories.setCategories(allCategories);
      return setLoading(false);
    })();
  }, []);
  return loading ? null : (
    <Container id="admin">
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          <NavLink className="btn btn-primary" to={ADMIN_ROUTE}>
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
