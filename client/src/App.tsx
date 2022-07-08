import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  indexAuthedRoutes,
  indexPublicRoutes,
  red,
  shortNotification,
} from './utils/consts';
import Context from './context/context';
import AppRouter from './routers/AppRouter';
import Notifications from './components/Notifications';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { autoAuth } from './http/userAPI';
import { fetchUserCart } from './http/cartAPI';
import { fetchUserAddress } from './http/addressesAPI';

function App() {
  const {
    user,
    cart,
    notifications,
    addresses,
  } = useContext(Context);
  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem('token')) {
          const stillAuthed = await autoAuth();
          const userCart = await fetchUserCart();
          const userAddresses = await fetchUserAddress();
          user.set(stillAuthed);
          cart.set(userCart);
          addresses.set(userAddresses);
          for (let a = 0; a < addresses.all.length; a += 1) {
            if (addresses.all[a].isDefault) {
              addresses.setDefault(addresses.all[a]);
              return;
            }
          }
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
