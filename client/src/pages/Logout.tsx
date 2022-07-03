import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/context';
import {
  FRONT_PAGE_ROUTE,
  green,
  shortNotification,
  GUEST,
} from '../utils/consts';

function Logout() {
  const { user, notifications } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.role !== GUEST) {
      notifications.message(
        'You have logged out',
        green,
        shortNotification,
      );
      user.unsetUser();
    }
    navigate(FRONT_PAGE_ROUTE);
  }, []);
  return (
    <div id="logout" />
  );
}

export default Logout;
