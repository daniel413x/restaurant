import React, {
  useState, useEffect, useContext,
} from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import {
  Container,
} from 'react-bootstrap';
import {
  LOGIN_ROUTE,
  shortNotification,
  green,
  FRONT_PAGE_ROUTE,
  REGISTRATION_ROUTE,
} from '../utils/consts';
import AuthBox from '../components/AuthBox';
import Context from '../context/context';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications } = useContext(Context);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const onSuccess = () => {
    notifications.message(
      showLogin ? 'You logged in successfully' : 'Registration successful',
      green,
      shortNotification,
    );
    navigate(FRONT_PAGE_ROUTE);
  };
  useEffect(() => {
    if (location.pathname === `/${LOGIN_ROUTE}`) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, []);
  return (
    <Container id="auth">
      <h2>
        {showLogin ? 'Login' : 'Registration'}
      </h2>
      <AuthBox
        onSuccess={onSuccess}
        showLogin={showLogin}
      />
      <NavLink to={`/${showLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}`}>
        {showLogin ? 'Register an account' : 'I\'m already registered'}
      </NavLink>
    </Container>
  );
}

export default Auth;
