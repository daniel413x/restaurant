import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  indexAuthedRoutes,
  indexPublicRoutes,
  red,
  shortNotification,
  testActiveOrder,
} from './utils/consts';
import Context from './context/context';
import AppRouter from './routers/AppRouter';
import Notifications from './components/Notifications';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { autoAuth } from './http/userAPI';
import { fetchOneCart } from './http/cartAPI';

function App() {
  const {
    user,
    orders,
    cart,
    notifications,
  } = useContext(Context);
  useEffect(() => {
    orders.setActiveOrder(testActiveOrder);
    (async () => {
      try {
        if (localStorage.getItem('token')) {
          const stillAuthed = await autoAuth();
          const userCart = await fetchOneCart();
          user.setUser(stillAuthed);
          cart.setCart(userCart);
        }
      } catch (error: any) {
        notifications.message(
          error.response.data.message,
          red,
          shortNotification,
        );
        if (error.response.status === 401) {
          localStorage.removeItem('token');
        }
      }
    })();
  }, []);
  return (
    <Router>
      <Notifications />
      <Navigation />
      <div id="main-routes-content">
        <AppRouter
          publicRoutes={indexPublicRoutes}
          authedRoutes={indexAuthedRoutes}
        />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
