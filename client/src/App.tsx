import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
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
import { fetchUserAddress } from './http/addressAPI';
import { indexAuthedRoutes, indexPublicRoutes } from './paths/paths';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const {
    user,
    cart,
    notifications,
    addresses,
  } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const registeredToken = localStorage.getItem('registeredToken');
        if (registeredToken) {
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
          localStorage.removeItem('registeredToken');
        }
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    })();
  }, []);
  return loading ? <LoadingScreen /> : (
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
