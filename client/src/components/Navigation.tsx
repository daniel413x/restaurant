import React, { useContext } from 'react';
import {
  Container, Navbar, Nav, Image, NavDropdown, Button,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Logo from '../assets/logo2.png';
import {
  FRONT_PAGE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  MENU_ROUTE,
  CART_ROUTE,
  ACCOUNT_ROUTE,
  ADMIN_ROUTE,
} from '../utils/consts';
import { countItems } from '../utils/functions';
import Context from '../context/context';

function Navigation() {
  const { user, cart } = useContext(Context);
  const cartCount = countItems(cart.foodItems);
  return (
    <Navbar id="navbar" expand="lg">
      <Container>
        <Navbar.Brand href={FRONT_PAGE_ROUTE}>
          <Image src={Logo} alt="logo" title="Home" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to={FRONT_PAGE_ROUTE} title="Home">
              Home
            </NavLink>
            <NavLink className="nav-link" to={MENU_ROUTE} title="Menu">
              Menu
            </NavLink>
            <NavLink className="nav-link" to={CART_ROUTE} title="Cart">
              Cart
              {' '}
              {cartCount ? `(${cartCount})` : null}
            </NavLink>
            {!user.isAuth && (
              <NavLink className="nav-link" to={LOGIN_ROUTE} title="Login">
                Login
              </NavLink>
            )}
            {!user.isAuth && (
            <NavLink className="nav-link" to={REGISTRATION_ROUTE} title="Register">
              Register
            </NavLink>
            )}
            {user.isAuth && (
            <NavDropdown title={user.name}>
              <NavDropdown.Item>
                <NavLink className="nav-link" to={ACCOUNT_ROUTE} title="Account">
                  Account
                </NavLink>
              </NavDropdown.Item>
              {user.isAdmin && (
                <NavDropdown.Item>
                  <NavLink className="nav-link" to={ADMIN_ROUTE} title="Admin">
                    Admin
                  </NavLink>
                </NavDropdown.Item>
              )}
              <NavDropdown.Item className="logout-tab">
                <Button className="nav-link logout-button" title="Logout">
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
            )}
          </Nav>
          <Nav>
            <span className="phone-num" title="1800 789 123">
              (703) 313-5388
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default observer(Navigation);
