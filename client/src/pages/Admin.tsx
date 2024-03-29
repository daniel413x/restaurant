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
import { fetchAndSortCategories } from '../http/categoryAPI';
import {
  ORDERS_ROUTE,
  ADMIN_ROUTE,
  MENU_ROUTE,
  red,
  shortNotification,
} from '../utils/consts';
import AppRouter from '../routers/AppRouter';
import { adminRoutes } from '../paths/paths';

function Admin() {
  const { categories, notifications } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        await fetchAndSortCategories(categories);
        setLoading(false);
      } catch (error: any) {
        notifications.message(
          error.response.data.message,
          red,
          shortNotification,
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return loading ? null : (
    <Container id="admin">
      <Row className="col-wrapper">
        <Col className="left-col" md="auto">
          <NavLink className="btn btn-primary" to={ADMIN_ROUTE}>
            Index
          </NavLink>
          <NavLink className="btn btn-primary" to={ORDERS_ROUTE}>
            Orders
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
