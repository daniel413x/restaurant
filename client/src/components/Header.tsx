import React from 'react';
import {
  Container, Col, Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketShopping,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { MENU_ROUTE } from '../utils/consts';

function Header() {
  return (
    <header id="header">
      <Container>
        <Col>
          <h2>
            Sed tempus
            <br />
            d urna et pharetra.
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum amet leo.
          </p>
          <NavLink className="btn btn-primary" to={MENU_ROUTE}>
            Order Now
            <FontAwesomeIcon icon={faBasketShopping} />
          </NavLink>
          <Button>
            Learn More
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Container>
    </header>
  );
}

export default Header;
